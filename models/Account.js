import  { model, models, Schema } from "mongoose";

const AccountSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, unique: true, required: true },
    name: String,
    email: String,
    phone: { type: String, required: false }, // Make phone field optional
    city: String,
    postalCode: String,
    streetAddress: String,
    country: String,
});
export const Account = models?.Account || model('Account', AccountSchema);