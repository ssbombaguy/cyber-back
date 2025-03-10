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
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({error: 'Internal server error'});
      }
    }
    run().catch(console.dir);
    res.json({status:"server is running"})
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});