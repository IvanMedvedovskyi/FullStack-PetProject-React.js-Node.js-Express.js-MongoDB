import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors';
import fileUpload from "express-fileupload";

import authRouter from './routes/auth.js'
import postsRouter from './routes/posts.js'
import commentsRouter from './routes/comment.js'

const app = express();
dotenv.config();

//Constants
const PORT = process.env.PORT || 3001;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

//Middleware
app.use(cors())
app.use(fileUpload())
app.use(express.json())
app.use(express.static("uploads"))

app.use('/api/auth', authRouter)
app.use('/api/posts', postsRouter)
app.use('/api/comments', commentsRouter)

async function start() {
  try {
    await mongoose.connect(
      process.env.MONGO_URL
    );

    app.listen(PORT, () => console.log(`Server war started at port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}

start();
