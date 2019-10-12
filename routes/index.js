import express from "express";
import urlRoute from "./urlRoute";
const route = express();

route.use("/url", urlRoute);

export default route;