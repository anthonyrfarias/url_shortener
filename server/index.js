import express from "express";
import "@babel/polyfill";
import routes from "./routes";
import mongoose from "mongoose";
import path from "path";
import urlController from "./controllers/urlController"
var cors = require('cors');
const user = encodeURIComponent('admin');
const password = 'da39a3ee5';
const dbUrl = `mongodb://${user}:${password}@159.65.69.242:27017/bluecoding-app?authSource=admin`
mongoose.Promise = global.Promise;
mongoose.connect(dbUrl,{useCreateIndex:true, useNewUrlParser: true})
    .then(mongoose => console.log(""))
    .catch(err => console.log(err));

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", routes);
app.use(ignoreFavicon);
app.get("/",(req, res, next)=>{
    res.send("Welcome to our api.");
});

app.get("/:short_url", urlController.find_url)

app.listen(3000, ()=>{
    console.log("App running...");
});


function ignoreFavicon(req, res, next) {
    if (req.originalUrl === '/favicon.ico') {
      res.status(204).json({nope: true});
    } else {
      next();
    }
}