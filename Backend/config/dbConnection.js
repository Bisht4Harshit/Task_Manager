const mongoose = require("mongoose");

const connectDb = async () => {
   try {

    const mongoUri = process.env.CONNECTION_STRING || process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error("MongoDB connection string is missing");
    }

    const connect = await mongoose.connect(mongoUri);
    console.log("Database connected", connect.connection.host, connect.connection.name);
    
   } catch (err) {
    console.log(err);
    process.exit(1);
    
   }  
};

module.exports = connectDb;
