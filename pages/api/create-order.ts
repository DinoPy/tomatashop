import { NextApiRequest, NextApiResponse } from 'next';
import paypal from '@paypal/checkout-server-sdk';
import Products from '../../models/Products';
import Users from '../../models/Users';
import dbConnect from '../../lib/dbConnect';

enum Category {
	DIGITAL_GOODS = 'DIGITAL_GOODS',
	PHYSICAL_GOODS = 'PHYSICAL_GOODS',
	DONATION = 'DONATION',
}

//

const Environment = paypal.core.SandboxEnvironment;
// const Environment = process.env.NODE_ENV === 'production' ? paypal.core.LiveEnvironment : paypal.core.SandboxEnvironment;

// the client will take an environment whch is either paypal.core.LiveEnvironment or paypal.core.SandboxEnvironment
const paypalClient = new paypal.core.PayPalHttpClient(
	new Environment(
		process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
		process.env.PAYPAL_CLIENT_SECRET!
	)
);

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// get the items from the request
	const { userId } = req.body;

	try {
		await dbConnect();
		await Products.estimatedDocumentCount();
	} catch (e) {
		console.error(e);
		return res.status(500).json({ message: 'Internal Server Error' });
	}

	// find the items in the database so we can use the price
	// const items = await Products.find({
	// 	_id: {
	// 		$in: bodyItems.map((item: any) => item.id),
	// 	},
	// }).select('title price');

	// we are going to use the cart that was saved in the database for the checkout
	const items = await Users.findOne({ _id: userId })
		.select('cart')
		.populate('cart._id');

	// create the paypal order
	const request = new paypal.orders.OrdersCreateRequest();

	// sum up the total of the items value considering the quantities too
	const total = items.cart
		.reduce(
			(sum: number, item: { _id: { price: number }; quantity: number }) => {
				// we find the line item and get the quantity by searching
				// using the id of each item in the array resulted from db query
				// ---------------- only required for the method where we send the items from the frontend-----------------

				// const quantity = bodyItems.find(
				// 	(i: any) => i.id === item._id.toString()
				// ).quantity;

				// ---------------- only required for the method where we get the items from the db-----------------
				return sum + item._id.price * item.quantity;
			},
			0
		)
		.toFixed(2);

	// set the preffer to representation so the pop up works properly
	request.prefer('return=representation');

	// set the order details
	request.requestBody({
		// we want to capture the payment information for the user
		intent: 'CAPTURE',

		// how much everything costs

		purchase_units: [
			{
				amount: {
					currency_code: 'EUR',
					value: total,
					breakdown: {
						item_total: {
							currency_code: 'EUR',
							value: total,
						},
						discount: {
							currency_code: 'EUR',
							value: '0',
						},
						handling: {
							currency_code: 'EUR',
							value: '0',
						},
						shipping: {
							currency_code: 'EUR',
							value: '0',
						},
						shipping_discount: {
							currency_code: 'EUR',
							value: '0',
						},
						tax_total: {
							currency_code: 'EUR',
							value: '0',
						},
						insurance: {
							currency_code: 'EUR',
							value: '0',
						},
					},
				},

				// example_items:{
				//                 "name": "T-Shirt",
				//                 "description": "Green XL",
				//                 "sku": "sku01",
				//                 "unit_amount": {
				//                     "currency_code": "USD",
				//                     "value": "90.00"
				//                 },
				//                 "tax": {
				//                     "currency_code": "USD",
				//                     "value": "10.00"
				//                 },
				//                 "quantity": "1",
				//                 "category": "PHYSICAL_GOODS"
				//             },

				items: items.cart.map((item: any) => {
					// ---------------- only required for the method where we send the items from the frontend-----------------
					// const quantity = bodyItems.find(
					// 	(i: any) => i.id === items._id.toString()
					// ).quantity;

					//

					const returnItem = {
						name: item._id.title,
						sku: 'sku01',
						category: Category.DIGITAL_GOODS,
						// change later into a valid description
						description: item._id.title,

						unit_amount: {
							currency_code: 'EUR',
							value: item._id.price,
						},
						quantity: item.quantity,
					};

					return returnItem;
				}),
			},
		],
	});

	// create the order

	try {
		// we will receive an id for the order from paypal that will be pased to capture function.
		const order = await paypalClient.execute(request);
		// console.log(order);
		res.status(200).json({ id: order.result.id });
	} catch (e) {
		console.error(e);
		if (e instanceof Error) res.status(500).json({ error: e.message });
	}
}
