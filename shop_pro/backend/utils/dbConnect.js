const mongoose =require('mongoose');
const MONGOURI = 'mongodb+srv://Cris123:Jiebaobei1@devconnector.rpgjs.mongodb.net/crisShopping?retryWrites=true&w=majority'

const dbConnect = async function(){
    try{
        if(mongoose.connection.readyState > 1) return 

        const connect = await mongoose.connect(process.env.MONGOURI || MONGOURI,{
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

module.exports = {
    dbConnect
}