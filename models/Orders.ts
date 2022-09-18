import { Schema, model, models } from 'mongoose';

export interface OrdersInterface {
	userId: Schema.Types.ObjectId;
	orderId: string;
	orderNo: number;
	items: {
		_id: Schema.Types.ObjectId;
		name: string;
		quantity: number;
		purchaseTimePrice: number;
	}[];
	createdAt: Date;
	updatedAt: Date;
}

const OrdersSchema = new Schema<OrdersInterface>(
	{
		userId: { type: Schema.Types.ObjectId, ref: 'Users' },
		orderId: { type: String, required: true },
		orderNo: { type: Number, default: 0, increment: true },
		items: [
			{
				_id: { type: Schema.Types.ObjectId, ref: 'Products' },
				name: { type: String, required: true },
				quantity: { type: Number, required: true },
				purchaseTimePrice: { type: Number, required: true },
			},
		],
	},
	{ timestamps: true }
);

export default models.Orders || model<OrdersInterface>('Orders', OrdersSchema);
