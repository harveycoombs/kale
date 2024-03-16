/*
    Kale ~ https://kale.harveycoombs.com/
    Copyright (c) 2024 Harvey Coombs
*/
const express = require("express");
const cookieParser = require("cookie-parser");
const multer = require("multer");

const { Routes } = require("./routes.js");
const { JWT } = require("./jwt.js");

const app = express();
const upload = multer({ dest: "./public/content/temp/" });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.all("/api*", upload.array("files"), Routes.API);
app.get("/", Routes.index);

app.listen(3004, () => {
    console.log(`Kale\nhttps://kale.harveycoombs.com/\nONLINE`);

    app.use("/css", express.static("./public/css"));
    app.use("/js", express.static("./public/js"));
    app.use("/assets", express.static("./public/assets"));
    app.use("/content", express.static("./public/content"));
});