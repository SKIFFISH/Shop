import mongoose from 'mongoose';

export default dbConnect = async () => {
    try{
        if(mongoose.connection.readyState > 1) return 

        const connect = await mongoose.connect(process.env.MONGOURI,{
            useCreateIndex:true,
            useFindAndModify:true,
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });

        console.log(`Mongo DB connect on ${connect.connection.host}` )
    } catch(error){
        console.error(error.message);
    }
}