const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const multer = require("multer");
const path = require("path");
// const mongoose = require('mongoose');
const port = 5000;
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const catRoute = require('./routes/categories');
const commentSchemaRoute = require('./routes/comments');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const upload = multer({ storage: storage });
app.post("/backend/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
});

app.use("/backend/auth", authRoute);
app.use("/backend/users", userRoute);
app.use("/backend/posts", postRoute);
app.use("/backend/categories", catRoute);
app.use("/backend/comments", commentSchemaRoute);
dotenv.config();
const mongoose = require("mongoose");
const uri = process.env.Mongo_URL;

connect = async () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: true
    };
    try {
        await mongoose.connect(uri, connectionParams);
        console.log("connected to database successfully");
    } catch (error) {
        console.log("could not connect to database.", error);
    }
};

connect();

// app.listen(port,()=>console.log(`Server started on port ${port}`));
app.listen(port, () => {
    console.log(`Server started on port ${port}`), console.log(`register post : localhost:${port}/backend/auth`);
});

