import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import { passwordRouter } from './routes/password.routes.js';
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
const PORT = process.env.PORT || 5000;
console.log('PORT: ', PORT);

app.get('/', (req, res) => {
    res.send('Hello Worldkkkkkkk!');
});

//routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/password", passwordRouter);



//database connection
mongoose.connect(process.env.MONGODB_URI, {})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB', err);
    });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT}/`);
});












