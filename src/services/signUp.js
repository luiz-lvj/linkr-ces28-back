import bcrypt from "bcrypt";
import connection from "../db.js";

export async function signUpService(userObj) {
    try{
        const email = userObj.email;
        const password = bcrypt.hashSync(userObj.password, 10);
        const username = userObj.username;
        const avatar = userObj.pictureUrl;

        const user = await connection.query(`INSERT INTO users(email, password, username, avatar) VALUES($1, $2, $3, $4) RETURNING id`,[email, password, username, avatar])
        return user.rows[0].id;
    } catch(err){
        console.error("Erro no service!")
        console.log(err);
        return 0;
    }

}