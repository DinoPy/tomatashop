import React from 'react';
import { useRouter } from 'next/router';
import { OrdersInterface } from '../../models/Orders';
import styles from './OrderPage.module.css';
import Link from 'next/link';

const OrderPage: React.FC<{ order: OrdersInterface }> = ({ order }) => {
	return (
		<div className={styles.orderPageContainer}>
			<div className={styles.orderNoDateContainer}>
				<h2 className={styles.orderNo}>Order No: {order.orderNo}</h2>
				<p>
					{order.orderNo > 5 && new Date(order.createdAt).toLocaleDateString()}
				</p>
			</div>
			<ul className={styles.orderItemsContainer}>
				{order.items.map((item, index) => (
					<li key={index} className={styles.lineItem}>
						<div className={styles.summaryContainer}>
							<Link href={`/product/${item._id}`}>
								<a>
									<h2>{item.name}</h2>
								</a>
							</Link>

							<p>x {item.quantity}</p>
						</div>
						<div className={styles.summaryContainer}>
							<p> €{item.purchaseTimePrice}/ea</p>
							<h3>
								Sum €{(item.quantity * item.purchaseTimePrice).toFixed(2)}
							</h3>
						</div>
					</li>
				))}
			</ul>

			<h2>
				{' '}
				Total €{' '}
				{order.items
					.reduce((total, itm) => {
						return total + itm.quantity * itm.purchaseTimePrice;
					}, 0)
					.toFixed(2)}
			</h2>
		</div>
	);
};

export default OrderPage;
