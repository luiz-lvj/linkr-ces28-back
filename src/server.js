import "./setup.js";
import "./db.js";

import express from "express";
import cors from "cors";
import { signUpController } from "./controllers/signUp.js";
import { signInController } from "./controllers/signIn.js";
import { getUserInfoController } from "./controllers/users.js";
import { createPostController, deletePostController, editPostController, getPostsController, getPostsLikedController } from "./controllers/posts.js";

const app = express();
app.use(cors());
app.use(express.json());

const port = +process.env.PORT || 4000;

app.post("/sign-up", async (req, res) => await signUpController(req, res));
app.post("/sign-in", async (req, res) => await signInController(req, res));

app.post("/posts", async (req, res) => await createPostController(req, res));
app.get("/posts", async (req, res) => await getPostsController(req, res));
app.get("/likes", async (req, res) => await getPostsLikedController(req, res));

app.put("/posts/:postId", async (req, res) => await editPostController(req, res));
app.delete("/posts/:postId", async (req, res) => await deletePostController(req, res));

app.get("/users/:userId", async (req, res) => await getUserInfoController(req, res));


app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
});