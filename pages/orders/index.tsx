import React from 'react';
import Layout from '../../components/layout';
import { GetServerSideProps } from 'next';
import dbConnect from '../../lib/dbConnect';
import Users from '../../models/Users';
import OrdersModel from '../../models/Orders';
import { getSession } from 'next-auth/react';
import OrderHistory from '../../components/OrderHistory/OrderHistory';

const Orders = ({ orders }: any) => {
	return (
		<Layout>
			<OrderHistory orders={orders} />
		</Layout>
	);
};

export default Orders;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context);

	try {
		await dbConnect();
		await OrdersModel.estimatedDocumentCount();
		const userOrders = await Users.findOne({ _id: session?.user._id }).populate(
			'orders'
		);

		return {
			props: {
				orders: JSON.parse(JSON.stringify(userOrders.orders)),
			},
		};
	} catch (e) {
		console.log(e);
		return {
			props: {
				results: [],
			},
		};
	}
};
