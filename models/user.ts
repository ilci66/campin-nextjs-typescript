import { Schema, model, connect } from 'mongoose';

interface User {
    name: string;
    email: string;
    password: string;
}

const schema = new Schema<User>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
  });
  

const UserModel = model<User>('User', schema);

export default UserModel;