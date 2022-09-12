import { model, Schema, models } from 'mongoose';

export interface UserInterface {
	googleOauthId: string;
	name: string;
	email: string;
	images: string[];
	orders: Schema.Types.ObjectId[];
	favorites: Schema.Types.ObjectId[];
	cart: Schema.Types.ObjectId[];
}

const UserSchema = new Schema<UserInterface>(
	{
		googleOauthId: { type: String, required: true },
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		images: { type: [String], required: true },
		orders: { type: [Schema.Types.ObjectId], ref: 'Orders' },
		favorites: { type: [Schema.Types.ObjectId], ref: 'Products' },
		cart: { type: [Schema.Types.ObjectId], ref: 'Products' },
	},
	{ timestamps: true }
);

export default models.Users || model<UserInterface>('Users', UserSchema);
