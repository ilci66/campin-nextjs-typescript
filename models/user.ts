import { Schema, model, connect } from 'mongoose';

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
  

try {
  module.exports = model<User>('User');
}catch(error){
  module.exports = model<User>('User', userSchema); 
}