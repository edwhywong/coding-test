import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import photoRouter from "./routes/photos";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use("/", photoRouter);

app.listen(4000, () => {
  console.log("server started on port 4000");
});

export default app;
