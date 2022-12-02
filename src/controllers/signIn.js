import bcrypt from "bcrypt";
import { getUserByEmail } from "../services/signIn.js";
import { createUuid } from "../services/token.js";



export async function signInController(req, res){
    try{
        console.log(req.body.email)
        const email = req.body.email;
        const password = req.body.password;
        const user = await getUserByEmail(email);
        if(user == null){
            return res.sendStatus(404);
        }
        if(bcrypt.compareSync(password, user.password)){
            const token = await createUuid(user.id);
            if(token != 0){
                const ans = {
                    "token": token,
                    "user": {
                        "id": user.id,
                        "email": user.email,
                        "username": user.username,
                        "avatar": user.avatar
                    }
                }
                return res.send(ans);
            }
            console.log("Não gerou uuid!")
            return res.sendStatus(500);
        }
        return res.sendStatus(403);
        
    } catch(err){
        console.log(err)
        return res.sendStatus(500);

    }
}