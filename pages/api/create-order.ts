import { NextApiRequest, NextApiResponse } from 'next';
import paypal from '@paypal/checkout-server-sdk';
import Products from '../../models/Products';

const Environment = paypal.core.SandboxEnvironment;
// const Environment = process.env.NODE_ENV === 'production' ? paypal.core.LiveEnvironment : paypal.core.SandboxEnvironment;

// the client will take an environment whch is either paypal.core.LiveEnvironment or paypal.core.SandboxEnvironment
const paypalClient = new paypal.core.PayPalHttpClient(
	new Environment(
		process.env.PAYPAL_CLIENT_ID,
		process.env.PAYPAL_CLIENT_SECRET
	)
);

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// get the items from the request
	const bodyItems = req.body.items;

	// find the items in the database so we can use the price
	const items = await Products.find({
		_id: {
			$in: bodyItems.map((item: any) => item.id),
		},
	}).select('name price');

	// create the paypal order
	const request = new paypal.orders.OrdersCreateRequest();

	// sum up the total of the items value considering the quantities too
	const total = items.reduce((sum, item) => {
		// we find the line item and get the quantity by searching
		// using the id of each item in the array resulted from db query
		const quantity = bodyItems.find(
			(i: any) => i.id === item._id.toString()
		).quantity;
		return sum + item.price * quantity;
	}, 0);

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
					},
				},
				items: items.map((items) => {
					const quantity = bodyItems.find(
						(i: any) => i.id === items._id.toString()
					).quantity;

					return {
						name: items.name,
						unit_amount: {
							currency_code: 'EUR',
							value: items.price,
						},
						quantity,
					};
				}),
			},
		],
	});

	// create the order

	try {
		// we will receive an id for the order from paypal that will be pased to capture function.
		const order = await paypalClient.execute(request);
		res.status(200).json(order.result.id);
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
}
