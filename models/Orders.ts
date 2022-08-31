import { Schema, model, models } from 'mongoose';

export interface OrdersInterface {
	user: Schema.Types.ObjectId;
	items: string[];
}

const OrdersSchema = new Schema<OrdersInterface>({
	user: { type: Schema.Types.ObjectId, ref: 'Users' },
	items: [{ type: Schema.Types.ObjectId, ref: 'Products' }],
});

export default models.Orders || model<OrdersInterface>('Orders', OrdersSchema);
