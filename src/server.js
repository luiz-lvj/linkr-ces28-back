import "./setup.js";
import "./db.js";

import express from "express";
import cors from "cors";
import { signUpController } from "./controllers/signUp.js";
import { signInController } from "./controllers/signIn.js";
import { createPostController } from "./controllers/posts.js";

const app = express();
app.use(cors());
app.use(express.json());

const port = +process.env.PORT || 4000;

app.post("/sign-up", async (req, res) => await signUpController(req, res));
app.post("/sign-in", async (req, res) => await signInController(req, res));

app.post("/posts", async (req, res) => await createPostController(req, res));


app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
});