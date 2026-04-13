import express, { Request, Response, NextFunction } from "express";
import { MongoClient, Collection, ObjectId } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

interface Movie {
  _id?: ObjectId;
  title: string;
  director: string;
  year: number;
  rating: number;
}

const app = express();
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
const port = 5000;

app.use(express.json());

let moviesCollection: Collection<Movie>;

async function connectToDatabase(): Promise<Collection<Movie>> {
  const connectionString = process.env.DB_CONN_STRING;
  const dbName = process.env.DB_NAME;
  const collectionName = process.env.COLLECTION_NAME;

  if (!connectionString || !dbName || !collectionName) {
    throw new Error("Missing environment variables");
  }

  const client = new MongoClient(connectionString);
  await client.connect();

  const db = client.db(dbName);
  const collection = db.collection<Movie>(collectionName);

  console.log("Connected to database");
  return collection;
}

app.get("/api/movies", async (req: Request, res: Response) => {
  try {
    const movies = await moviesCollection.find({}).toArray();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching movies" });
  }
});

app.get("/api/movies/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    if (!ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const movie = await moviesCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: "Error fetching movie" });
  }
});

app.post("/api/movies", async (req: Request, res: Response) => {
  try {
    const movieData: Movie = req.body;

    const result = await moviesCollection.insertOne(movieData);

    res.status(201).json({
      acknowledged: result.acknowledged,
      insertedId: result.insertedId,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating movie" });
  }
});

app.put("/api/movies/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    if (!ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const result = await moviesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: req.body }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({ message: "Movie updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating movie" });
  }
});

app.delete("/api/movies/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    if (!ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const result = await moviesCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting movie" });
  }
});

connectToDatabase()
  .then((collection) => {
    moviesCollection = collection;

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
  app.get("/api/health", (req: Request, res: Response) => {
    res.status(200).json({
        status: "OK",
        message: "API is running successfully"
    });
});
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome to the Movie API"
    });
});