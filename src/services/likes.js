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

// create likes

export async function createLikeService(like){
    try{
        const postId = like.postId;
        const userId = like.userId;
        const likeRes = await connection.query(`INSERT INTO likes (post_id, user_id) VALUES ($1, $2) RETURNING *`,[postId, userId]);
        return likeRes.rows[0];
    }catch(err){
        console.log(err);
        return 0;
    }
}
