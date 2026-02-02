import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from './routes/index.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
routes(app);
app.get("/", (req, res) => {
    res.send("Food Ordering Backend is running 🚀");
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
