import connection from "../db.js";


export async function createPostservice(post){
    try{

        const text = post.text;
        const link = post.link;
        const linkTitle = post.linkTitle;
        const linkDescription = post.linkDescription;
        const linkImage = post.linkImage;
        const userId = post.userId;

        const post = await connection.query(`INSERT INTO 
                    posts(text, link, linkTitle, linkDescription, linkImage, user_id)
                    VALUES($1, $2, $3, $4, $5, $6) RETURNING id`,[text, link, linkTitle, linkDescription, linkImage, userId]);
        return post.rows[0].id;
    }catch(err){
        console.log(err);
        return 0;
    }
}