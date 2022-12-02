import { v4 as uuidv4 } from 'uuid';
import connection from "../db.js";


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