/*
    This file will contain the routes for the posts. In my design, the mainc content of the post will be: 
    - postID
    - postName 
    - description
    - timestamp 

    Router in express is used to create routes and then wee need to export the router so that we can use it in the app.js file. 
    This ensures that the routes can be defined in a separate file and then imported into the app.js file. 

    1. AT first I used the array to store the post information which was quite easy to implement.  
    2. Now I am using the database to store the post information.  
    3. Used async and await to handle the asynchronous operations.  
*/

//Import express and router 
const express = require('express');
const router = express.Router();  //We need router basically to create routes and then we need to export the router  
const db = require('../db'); //Importing the database connection   


//Since we are using the database to store the posts, we need to change the routes and implement async await.   
router.post('/', async (req, res) => {
    const { userId, username, description } = req.body; //Remove postName requirement

    //Check if the required fields are sent in the request of not 
    if (!userId || !username || !description) {
        return res.status(400).json({ error: 'userID, username and description must be provided!!!!' });
    }

    else {
        //Insert the post into the database. 
        const timestamp = new Date().toISOString();  //Extract the current timestamp  
        const query = 'INSERT INTO posts (userId, username, description) VALUES (?, ?, ?)'; //Remove postName from the query

        //Fow async and await, we need to use Promise as it lets us handle the asynchronous operations.   
        const newPost = await new Promise((resolve, reject) => {
            db.run(query, [userId, username, description], function (err) {
                if (err) {
                    reject(err); //Means tell the promnise that operation failed!! 
                }
                else {
                    resolve({
                        postID: this.lastID, //the new ID of the post. lastID means the last ID of the post that was inserted. 
                        userId,
                        username,
                        description
                    }); //This tells the promise that the operation was successful and the new post was created. 
                }
            });
        });

        //Now send back the new post back to the client so he doesnot get confused that the post was created ir not. 
        return res.status(201).json(newPost);
    }
});

//Get route to get all the posts 
router.get('/', async (req, res) => {
    //Retriuve allthe posts from the database
    const posts = await new Promise((resolve, reject) => {
        db.all('SELECT * FROM posts', (err, rows) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(rows);
            }
        })
    });
    if (!posts) {
        return res.status(404).json({ error: 'No posts found' });
    }
    res.json(posts);
});

//==============================================================
// 2. Now working on the delete route for the posts.   
//==============================================================

router.delete('/:postID', async (req, res) => {
    const postID = req.params.postID;

    const post = await new Promise((resolve, reject) => {
        db.get('SELECT * FROM posts WHERE postID = ?', [postID], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        })
    })

    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }

    try {
        // First delete all replies for this post
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM replies WHERE postID = ?', [postID], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        // Then delete the post itself
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM posts WHERE postID = ?', [postID], function (err) {
                if (err) reject(err);
                else resolve(this.changes);
            })
        })

        return res.status(200).json({ message: 'Post and all associated replies deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

//==============================================================
// 3. Now working on the update route for the posts.   
//==============================================================

router.put('/:postID', async (req, res) => {
    const postID = req.params.postID;
    const { description } = req.body;

    if (!description) {
        return res.status(400).json({ error: 'Description is required to update the post' });
    }

    // Check if post exists
    const post = await new Promise((resolve, reject) => {
        db.get('SELECT * FROM posts WHERE postID = ?', [postID], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });

    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }

    // Update the post
    await new Promise((resolve, reject) => {
        db.run('UPDATE posts SET description = ? WHERE postID = ?', [description, postID], function (err) {
            if (err) reject(err);
            else resolve(this.changes);
        });
    });

    return res.status(200).json({ message: 'Post updated successfully' });
});

//==============================================================
// 4. Now working on update route for the posts.        
//==============================================================

router.put('/:postID', async (req, res) => {
    const postID = req.params.postID;
    const { description } = req.body;

    if (!description) {
        return res.status(400).json({ error: 'Description is required to update the post' });
    }

    const post = await new Promise((resolve, reject) => {
        db.get('SELECT * FROM posts WHERE postID = ?', [postID], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        })
    })

    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }

    await new Promise((resolve, reject) => {
        db.run('UPDATE posts SET description = ? WHERE postID = ?', [description, postID], function (err) {
            if (err) reject(err);
            else resolve(this.changes);
        })
    })

    return res.status(200).json({ message: 'Post updated successfully' });
});

//==============================================================
// 5. Now working on the get route for the posts.   
//==============================================================

router.get('/:postID', async (req, res) => {
    const postID = req.params.postID;

    const post = await new Promise((resolve, reject) => {
        db.get('SELECT * FROM posts WHERE postID = ?', [postID], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        })
    })

    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }

    return res.status(200).json(post);
});
//Export the router so that it can be used in the app.js file 
module.exports = router;

