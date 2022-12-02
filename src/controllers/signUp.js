import { signUpService } from "../services/signUp.js";
import { createUuid } from "../services/token.js";


export async function signUpController(req, res) {
    try{
        const postUserId = await signUpService(req.body);
        const postUser = {
            "id": postUserId,
            "email": req.body.email,
            "username": req.body.username,
            "avatar": req.body.pictureUrl
        }
        if(postUserId != 0){
            const token = await createUuid(postUserId);
            if(token != 0){
                const ans = {
                    "token": token,
                    "user": postUser
                }
                return res.send(ans);
            }
            else{
                console.log("Não gerou uuid!");
                return res.sendStatus(500);
            }
        }
        else{
            console.log("Não salvou usuário no banco!");
            return res.sendStatus(500);
        }
    }catch(err){
        console.log(err);
        return res.sendStatus(500);
    }
}