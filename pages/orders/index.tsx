import React from 'react';
import Layout from '../../components/layout';
import { GetServerSideProps } from 'next';
import dbConnect from '../../lib/dbConnect';
import Users from '../../models/Users';
import OrdersModel from '../../models/Orders';
import { getSession } from 'next-auth/react';

const Orders = ({ orders }: any) => {
	return (
		<Layout>
			{
				// everything here is just a placeholder
			}
			<h1>Orders</h1>
			{orders?.map((order: any) => (
				<div key={order._id}> {order.orderId}</div>
			))}
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
