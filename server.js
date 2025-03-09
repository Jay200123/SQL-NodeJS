import express from "express";
import { envConfig } from "./src/config/index.js";
import { users } from "./src/routes/index.js";
envConfig();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the server",
  });
});

app.use("/api/v1", users);

app.all("*", (req, res) => {
  res.status(404).json({
    message: "Route Not Found :(",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
