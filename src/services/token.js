import { v4 as uuidv4 } from 'uuid';
import connection from "../db.js";
import { getUserById } from './signIn.js';


export async function createUuid(userId){
    const token = uuidv4();
    const id = parseInt(userId);
    console.log(id);
    try{
        const session = await connection.query("INSERT INTO sessions VALUES ($1, $2) RETURNING token", [id, token]);
        const tokenUuid = session.rows[0].token;
        return tokenUuid;
    } catch(err){
        console.log("Erro no token!")
        console.log(err);
        return 0;
    }
}

export async function getUserByToken(token){
    try{
        const session = await connection.query("SELECT * FROM sessions WHERE token=$1", [token]);
        if(session.rows.length == 0){
            console.log("User não logado!");
            return null;
        }

        const userId = session.rows[0].user_id;
        const user = await getUserById(userId);
        return user;
    }catch(err){
        console.log(err);
        return null;
    }
}