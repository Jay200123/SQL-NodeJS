import express from "express";
import { envConfig } from "./src/config/index.js";
import { users } from "./src/routes/index.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

envConfig();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("./public"));

app.use("/api/v1", users);

app.all("*", (req, res) => {
  res.sendFile(__dirname + "/public/notFound.html");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
