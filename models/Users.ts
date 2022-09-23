import { model, Schema, models } from 'mongoose';

export interface UserInterface {
	googleOauthId?: string;
	name: string;
	password?: string;
	email: string;
	images: string[];
	orders: Schema.Types.ObjectId[];
	favorites: Schema.Types.ObjectId[];
	cart: { id: Schema.Types.ObjectId; quantity: number }[];
	rated: string[];
}

const UserSchema = new Schema<UserInterface>(
	{
		googleOauthId: { type: String },
		name: { type: String, required: true },
		password: { type: String },
		email: { type: String, required: true, unique: true },
		images: { type: [String], required: true },
		orders: { type: [Schema.Types.ObjectId], ref: 'Orders' },
		favorites: { type: [Schema.Types.ObjectId], ref: 'Products' },
		cart: [
			{
				_id: {
					type: Schema.Types.ObjectId,
					ref: 'Products',
				},
				quantity: { type: Number, required: true, default: 1 },
			},
		],
		rated: { type: [String], required: true },
	},
	{ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

export default models.Users || model<UserInterface>('Users', UserSchema);
