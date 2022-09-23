import { UserInterface } from './Users';
import mongoose from 'mongoose';

export interface ReviewInterface {
	_id: mongoose.Schema.Types.ObjectId;
	userId: mongoose.Schema.Types.ObjectId | UserInterface;
	productId: mongoose.Schema.Types.ObjectId;
	title: string;
	comment: string;
	rating: number;
	createdAt: Date;
}

const ReviewSchema = new mongoose.Schema<ReviewInterface>(
	{
		userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
		productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Products' },
		title: { type: String, required: true },
		comment: { type: String, required: true },
		rating: { type: Number, required: true },
	},
	{
		timestamps: true,
	}
);

export default mongoose.models.Reviews ||
	mongoose.model<ReviewInterface>('Reviews', ReviewSchema);
