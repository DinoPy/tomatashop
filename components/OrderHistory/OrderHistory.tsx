import React from 'react';
import styles from './OrderHistory.module.css';
import { OrdersInterface } from '../../models/Orders';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const OrderHistory = ({ orders }: { orders: OrdersInterface[] }) => {
	const { data: session, status } = useSession();

	if (status === 'loading') {
		return <div>Loading...</div>;
	}

	if (status === 'unauthenticated') return <div>Unauthenticated</div>;

	return (
		<div className={styles.orderHistoryContainer}>
			{orders.length > 0 ? (
				<>
					<h1>Orders</h1>
					{orders?.map((order: any) => (
						<div key={order._id} className={styles.orderHistoryItemContainer}>
							<div className={styles.orderContentSeparator}>
								<Link href={`/orders/${order._id}`}>
									<h2 className={styles.orderNo}>
										<a>Order # {order.orderNo}</a>
									</h2>
								</Link>
								<p>
									{' '}
									{order.orderNo > 5 &&
										new Date(order.createdAt).toLocaleDateString()}
								</p>
							</div>
							<div>
								<p>
									Quantity{' '}
									{order.items.reduce(
										(total: number, itm: { quantity: number }) => {
											return total + itm.quantity;
										},
										0
									)}
								</p>

								<p>
									Total €{' '}
									{order.items
										.reduce(
											(
												total: number,
												item: { purchaseTimePrice: number; quantity: number }
											) => {
												return total + item.purchaseTimePrice * item.quantity;
											},
											0
										)
										.toFixed(2)}
								</p>
							</div>
						</div>
					))}
				</>
			) : (
				<h1 className={styles.noOrdersText}> No orders yet </h1>
			)}
		</div>
	);
};

export default OrderHistory;
