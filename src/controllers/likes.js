import { createLikeService } from "../services/likes.js";

export async function createLikeController(req, res){
    try{
        const postId = req.params.postId;
        const auth = req.headers.authorization;
        const token = String(auth).split(" ")[1];
        console.log(token)
        
        const user = await getUserByToken(token);
        console.log(user);
        if(user == null){
            return res.sendStatus(404).json({"message":"usuario não encontrado"});
        }

        const like = await createLikeService(postId, user.id);
        if(like == 0){
            console.log("Não salvou o like!");
            return res.sendStatus(500);
        }
        return res.sendStatus(200);

    } catch(err){
        console.log(err);
        return res.sendStatus(500);
    }
}