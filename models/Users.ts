import mongoose from 'mongoose';

export interface UserInterface {
	googleOauthId?: string;
	name: string;
	password?: string;
	email: string;
	images: string[];
	orders: mongoose.Schema.Types.ObjectId[];
	favorites: mongoose.Schema.Types.ObjectId[];
	cart: { id: mongoose.Schema.Types.ObjectId; quantity: number }[];
	rated: string[];
	access: 'ADMIN' | 'REGULAR';
}

const UserSchema = new mongoose.Schema<UserInterface>(
	{
		googleOauthId: { type: String },
		name: { type: String, required: true },
		password: { type: String },
		email: { type: String, required: true, unique: true },
		images: { type: [String], required: true },
		orders: { type: [mongoose.Schema.Types.ObjectId], ref: 'Orders' },
		favorites: { type: [mongoose.Schema.Types.ObjectId], ref: 'Products' },
		cart: [
			{
				_id: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Products',
				},
				quantity: { type: Number, required: true, default: 1 },
			},
		],
		rated: { type: [String], required: true },
		access: { type: String, required: true, default: 'REGULAR' },
	},
	{ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

export default mongoose.models.Users ||
	mongoose.model<UserInterface>('Users', UserSchema);
