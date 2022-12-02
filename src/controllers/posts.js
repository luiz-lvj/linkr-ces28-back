import { getLikesFromPost } from "../services/likes.js";
import { createPostservice } from "../services/posts.js";
import { getUserByToken } from "../services/token.js";


export async function createPostController(req, res){
    try{
        const text = req.body.text;
        const link = req.body.link;
        const auth = req.headers.authorization;
        const token = String(auth).split(" ")[1];
        console.log(token)
        
        const user = await getUserByToken(token);
        console.log(user);
        if(user == null){
            return res.sendStatus(404).json({"mnessage":"usuario não encontrado"});
        }
        const bodyPost = {
            text: text,
            link: link,
            linkTitle: "título do link",
            linkDescription: "Descrição do link",
            linkImage: "Imagem do link",
            userId: user.id
        }
        const postId = await createPostservice(bodyPost);
        if(postId == 0){
            console.log("Não salvou o post!");
            return res.sendStatus(500);
        }
        const likes = await getLikesFromPost(postId);
        const ans = {
            id: postId,
            text: text,
            link: link,
            linkTitle: "título do link",
            linkDescription: "Descrição do link",
            linkImage: "Imagem do link",
            user: {
                id: user.id,
                username: user.username,
                avatar: user.avatar
            },
            likes: likes
        }
        return res.send(ans);

    } catch(err){
        console.log(err);
        return res.sendStatus(500);
    }
}