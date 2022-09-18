import paypal from '@paypal/checkout-server-sdk';
import { NextApiRequest, NextApiResponse } from 'next';
import Users from '../../models/Users';
import Orders from '../../models/Orders';
import dbConnect from '../../lib/dbConnect';
import Products from '../../models/Products';

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
	const { userId, orderId } = req.body;
	const { method } = req;

	switch (method) {
		case 'POST': {
			try {
				await dbConnect();
				await Products.estimatedDocumentCount();
			} catch (e) {
				console.error(e);
				return res.status(500).json({ message: 'Internal Server Error' });
			}

			const verifyOrder = new paypal.orders.OrdersGetRequest(orderId);
			const order = await paypalClient.execute(verifyOrder);
			// console.log(order);

			if (
				order.result.intent === 'CAPTURE' &&
				order.result.status === 'COMPLETED'
			) {
				// save the contents of the cart in user/ orders so we have an order history
				// also save the ID of the order so we can refference it.
				const user = await Users.findOne({ _id: userId }).populate('cart._id');

				// the ORDER we try to save should go to ORDERS collection and we only get an id to add to the user's orders array.
				const newOrder = await Orders.create({
					userId: userId,
					orderId: orderId,
					orderNo: (await Orders.estimatedDocumentCount()) + 1,
					items: user.cart.map((item: any) => ({
						_id: item._id._id,
						name: item._id.title,
						quantity: item.quantity,
						purchaseTimePrice: item._id.price,
					})),
				});

				user.orders.push(newOrder._id);
				user.cart = [];
				await user.save();

				return res.status(200).json({ success: true });
			} else {
				return res.status(400).json({ message: 'Order not completed' });
			}
		}
		default: {
			return res.status(400).json({ message: 'Wrong request method' });
		}
	}
}
