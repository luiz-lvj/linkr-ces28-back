import connection from "../db.js";


export async function getUserByEmail(userEmail){
    const email = userEmail;
    console.log(email)
    try{
        const user = await connection.query(`SELECT * FROM users WHERE email='${email}'`);
        if(user.rows.length == 0){
            return null;
        }
        return user.rows[0];
    }catch(err){
        console.log(err);
        return null;
    }
}

export async function getUserById(userId){
    const id = parseInt(userId);
    try{
        const user = await connection.query(`SELECT * FROM users WHERE id=$1`, [id]);
        if(user.rows.length == 0){
            return null;
        }
        return user.rows[0];
    }catch(err){
        console.log(err);
        return null;
    }
}