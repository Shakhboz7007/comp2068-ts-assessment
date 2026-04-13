import express, { Request, Response } from "express";
import { MongoClient, Collection, ObjectId } from "mongodb";
import dotenv from "dotenv";

interface Movie {
  _id?: ObjectId;
  title: string;
  director: string;
  year: number;
  rating: number;
}

dotenv.config();

const app = express();
const port = 5000;

app.use(express.json());

let moviesCollection: Collection<Movie>;

async function connectToDatabase(): Promise<Collection<Movie>> {
  const connectionString = process.env.DB_CONN_STRING!;
  const dbName = process.env.DB_NAME!;
  const collectionName = process.env.COLLECTION_NAME!;

  const client = new MongoClient(connectionString);
  await client.connect();

  const db = client.db(dbName);
  const collection = db.collection<Movie>(collectionName);

  console.log("Connected to database");

  return collection;
}

app.get("/api/movies", async (req: Request, res: Response) => {
  const movies = await moviesCollection.find().toArray();
  res.json(movies);
});

app.post("/api/movies", async (req: Request, res: Response) => {
  const result = await moviesCollection.insertOne(req.body);
  res.json(result);
});

connectToDatabase().then((collection) => {
  moviesCollection = collection;

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});