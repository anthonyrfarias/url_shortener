import express from "express";
import urlController from "../controllers/urlController"
const route = express();


route.get("/list", urlController.list);
route.post("/shorten", urlController.shorten_url);


export default route;