import express from "express";
import cors from "cors";
import {connectToDatabase} from "./services/database.js";
import bodyParser from "body-parser";
import {ObjectId} from "mongodb";


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
    async function run() {
    try {
        const database = await connectToDatabase();
        const navbar = await database.collection('menus')
        const cursor = navbar.find();
        const results = await cursor.toArray();
        res.json(results)
        console.log(results)

    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({error: 'Internal server error'});
      }
    }
    run().catch(console.dir);
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});