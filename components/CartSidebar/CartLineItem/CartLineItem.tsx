import React from 'react';
import axios from 'axios';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { CartProps } from '../../layout';
import { useCartCtx } from '../../../utils/cartCtx';
import { useSession } from 'next-auth/react';
import styles from '../CartSidebar.module.css';

const CartItem = ({ cartItem }: { cartItem: CartProps['cart'][0] }) => {
	const [lineItemQuantity, setLineItemQuantity] = React.useState<number>(
		cartItem.quantity
	);
	const { cart, setCart } = useCartCtx();
	const { data: session } = useSession();

	const handleClick = async (id: string) => {
		const response = await axios.post(
			`/api/addtocartfav/cart/remove/${session?.user?._id}/${id}`
		);
		if (response.status === 200) {
			setCart(response.data);
		}
	};

	React.useEffect(() => {
		const updateQuantity = async () => {
			const response = await axios.post(
				`/api/addtocartfav/cart/add/${session?.user?._id}/${cartItem._id._id}`,
				{ quantity: lineItemQuantity }
			);
			if (response.status === 200) {
				setCart(response.data);
			}
		};
		updateQuantity();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lineItemQuantity]);

	return (
		<div key={cartItem._id._id} className={styles.itemContainer}>
			<h3 className={styles.itemName}> {cartItem._id.title}</h3>
			<div className={styles.inputPriceContainer}>
				<label>
					Qty:
					<input
						className={styles.input}
						value={lineItemQuantity}
						type='number'
						onChange={(e) => setLineItemQuantity(parseInt(e.target.value))}
					/>
				</label>
				<p> {cartItem._id.price.toFixed(2)}</p>
				<p> {(cartItem._id.price * cartItem.quantity).toFixed(2)} </p>
			</div>
			<DeleteOutlineIcon
				sx={{
					position: 'absolute',
					bottom: 0,
					right: 0,
					cursor: 'pointer',
				}}
				fontSize='small'
				color='inherit'
				onClick={(e) => {
					handleClick(cartItem._id._id);
				}}
			/>
		</div>
	);
};

export default CartItem;
