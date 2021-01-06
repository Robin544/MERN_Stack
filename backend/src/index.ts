// tslint:disable-next-line
import dotenv from "dotenv";
import express from "express";
import path from "path";
import router from "./routes/router";
import body from "body-parser";
import cors from "cors";
import "./models/db";

// initialize configuration
dotenv.config();

const app = express();
const port = 4000; // default port to listen

app.use(cors());
app.use(body.json()); // to support JSON-encoded bodies
app.use(body.urlencoded({ extended: false })); // to support URL-encoded bodies

app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization"
  );

  // Pass to next layer of middleware
  next();
});

// Configure Express to use EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// define a route handler for the default home page
app.use("/", router);

app.all("*", (req, res) => {
  res.status(404).json({ message: "API Not Found" });
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
