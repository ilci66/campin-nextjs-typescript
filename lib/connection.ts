import { MongoNotConnectedError } from 'mongodb';
import mongoose from 'mongoose';

const uri: string = process.env.MONGODB_URI !;

if(!uri){console.log("there's no uri string")}

export const connectToDatabase = async () => {

    let connection:boolean = false;
    
    if(!connection){
        const opt: object = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false,
            //the fix for the deprecation warning
            // useCreateIndex: true
        }
    
        await mongoose.connect(uri, opt).then(() =>{
            connection = true;
            console.log("connected to database")
        });
        console.log("is it connected ? ==> ", connection) 
        return connection
    }else { 
        ("connected is true") 
        return connection
    }
}

