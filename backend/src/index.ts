import express from "express";
import apiRouter from "./routes";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRouter);

app.listen(port, () => {
  console.log("서버 구동중");
});
