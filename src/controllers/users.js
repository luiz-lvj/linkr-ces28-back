import { getUserById } from "../services/signIn.js";
import { getUserByToken } from "../services/token.js";


export async function getUserInfoController(req, res){
    try{
        const auth = req.headers.authorization;
        const token = String(auth).split(" ")[1];
        console.log(token)
        
        const user = await getUserByToken(token);
        console.log(user);
        if(user == null){
            return res.sendStatus(404).json({"message":"usuario não encontrado"});
        }
        const userId = req.params.userId;

        const userAns = await getUserById(userId);
        const ans = {
            id: userAns.id, 
            username: userAns.username,
            avatar: userAns.avatar
        }
        return res.send(ans);

    }catch(err){
        console.log(err);
        return res.sendStatus(500);
    }
}