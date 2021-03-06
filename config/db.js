const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connectMongo = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log(`MongoDB connected: ${connectMongo.connection.host}`);
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

module.exports = connectDB;
