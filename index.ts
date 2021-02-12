import express from "express";
import database from "./database-service";
import { userRoute } from "./User/user-controller";

const app = express();

app.use(express.json());
app.use("/api", userRoute());

database().then(() => {
  console.log("Mongo Connected");
  app.listen(3000, () => {
    console.log("Chalu");
  });
});
