import React from 'react';
import { NextPage } from 'next';
import Orders, { OrdersInterface } from '../../../models/Orders';
import OrderPage from '../../../components/orderPage/OrderPage';
import Layout from '../../../components/layout';

const OrderHistoryItem: NextPage<{ order: OrdersInterface }> = ({ order }) => {
	return (
		<Layout>
			{' '}
			<OrderPage order={order} />{' '}
		</Layout>
	);
};

export default OrderHistoryItem;

export const getServerSideProps = async (context: any) => {
	const { orderId } = context.params;
	try {
		const order = await Orders.findOne({ _id: orderId });

		return {
			props: {
				order: JSON.parse(JSON.stringify(order)),
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
