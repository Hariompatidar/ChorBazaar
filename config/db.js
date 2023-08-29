import mongoose from 'mongoose';
const connectDB = async () => {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then( console.log("Database connect successfully"))
.catch((error)=>{
    console.log("DB connection problem");
    console.log(error);
    process.exit(1);
})
};

export default connectDB;
