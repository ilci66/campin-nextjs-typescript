import { Schema, model, connect } from 'mongoose';
import mongoose from 'mongoose'

interface User {
    name: string;
    email: string;
    password: string;
}

const userSchema = new Schema<User>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
  });
  

// const UserModel = model<User>('User', userSchema);

// export default UserModel;

//tryting to fix the overwrite error I keep getting
 
// module.exports = model<User>('User', schema);

// const UserModel = mongoose.models.UserModel || model<User>('User', userSchema);
// console.log(UserModel)

// module.exports = mongoose.models.UserModel || model<User>('User', userSchema);

let UserModel
try {
  UserModel = model<User>('users')
} catch (error) {
  UserModel = model<User>('users', userSchema)
}
export default UserModel