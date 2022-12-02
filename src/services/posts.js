import connection from "../db.js";


export async function createPostservice(post){
    try{

        const text = post.text;
        const link = post.link;
        const linkTitle = post.linkTitle;
        const linkDescription = post.linkDescription;
        const linkImage = post.linkImage;
        const userId = post.userId;
        console.log(post)

        const postRes = await connection.query(`INSERT INTO 
                    posts(text, link, linkTitle, linkDescription, linkImage, user_id)
                    VALUES($1, $2, $3, $4, $5, $6) RETURNING id`,[text, link, linkTitle, linkDescription, linkImage, userId]);
        return postRes.rows[0].id;
    }catch(err){
        console.log(err);
        return 0;
    }
}

export async function getPostService(){
    try{
        const posts = await connection.query("SELECT * FROM posts");
        return posts.rows;
    }catch(err){
        console.log(err);
        return [];
    }
}


// edit post only text

export async function editPostService(post){
    try{
        const text = post.text;
        const id = post.id;
        const postRes = await connection.query(`UPDATE posts SET text = $1 WHERE id = $2 RETURNING id`,[text, id]);
        return postRes.rows[0].id;
    }catch(err){
        console.log(err);
        return 0;
    }
}

// delete post

export async function deletePostService(id){
    try{
        const postRes = await connection.query(`DELETE FROM posts WHERE id = $1 RETURNING id`,[id]);
        return postRes.rows[0].id;
    }catch(err){
        console.log(err);
        return 0;
    }
}

// get post by id

export async function getPostByIdService(id){
    try{
        const post = await connection.query(`SELECT * FROM posts WHERE id = $1`,[id]);
        return post.rows[0];
    }catch(err){
        console.log(err);
        return [];
    }
}