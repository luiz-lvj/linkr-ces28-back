import { getLikesFromPost } from "../services/likes.js";
import { createPostservice, getPostService } from "../services/posts.js";
import { getUserById } from "../services/signIn.js";
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

export async function getPostsController(req, res){
    try{

        const auth = req.headers.authorization;
        const token = String(auth).split(" ")[1];
        console.log(token)
        
        const user = await getUserByToken(token);
        console.log(user);
        if(user == null){
            return res.sendStatus(404).json({"mnessage":"usuario não encontrado"});
        }
        const posts = await getPostService();

        const postsEdited = await Promise.all(posts.map(async post => {
            const userId = post.user_id;
            const user = await getUserById(userId);
            const likes = await getLikesFromPost(post.id);
            const ans = {
                id: post.id,
                text: post.text,
                link: post.link,
                linkTitle: post.linkTitle,
                linkDescription: post.linkDescription,
                linkImage: post.linkImage,
                user: {
                    id: user.id,
                    username: user.username,
                    avatar: user.avatar
                },
                likes: likes
            }
            return ans;
        }));

        return res.send(postsEdited)


    }catch(err){
        console.log(err);
        return res.sendStatus(500);
    }
}