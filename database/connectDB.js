import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async (MONGO_DB_URI) => {
  try {
    await mongoose.connect(MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export default connectDB;
