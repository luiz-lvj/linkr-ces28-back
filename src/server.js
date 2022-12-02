import "./setup.js";
import "./db.js";

import express from "express";
import cors from "cors";
import { signUpController } from "./controllers/signUp.js";

const app = express();
app.use(cors());
app.use(express.json());

const port = +process.env.PORT || 4000;

app.post("/sign-up", async (req, res) => await signUpController(req, res));


app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
});