import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.MONGODB_URI!
const dbName = 'amazon-clone';

// Create a global or module-level MongoDB client instance and a connection status flag
const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let isConnected = false;

export const connectDB = async() => {
  if (!isConnected) {
    try {
      await client.connect();
      console.log('Connected successfully to DB');
      isConnected = true;
    } catch (error) {
      console.error("Error connecting to the MongoDB server:", error);
    }
  }

  return client.db(dbName);
}

// export const collectionData = async (name) => {
//   const data = await connectDB()
//   const collection = data.collection(name)
//   return await collection.find().toArray()
// }