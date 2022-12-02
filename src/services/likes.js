import connection from "../db.js";


export async function getLikesFromPost(postId){
    const id = parseInt(postId)
    try{

        const likes = await connection.query("SELECT * FROM likes WHERE post_id=$1",[id]);
        return likes.rows;
    } catch(err){
        console.log(err);
        return [];
    }

}