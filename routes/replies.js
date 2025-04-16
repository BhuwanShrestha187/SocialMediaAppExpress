/*
    * This file will handle the replies for the posts. 

*/

//Import express and router 
const express = require('express');
const router = express.Router();

//Import the database 
const db = require('../db');

// It just takes the postID from the url and then use it to insert the reply into the database.  
router.post('/:postID', async (req, res) => { //it  fetch the postId from the url and then use it to insert the reply into the database.  
    const postID = req.params.postID;
    const { userId, username, content } = req.body;

    if (!userId || !username || !content) {
        return res.status(400).json({ error: 'For a successful reply, userId, username and content must be provided!!' });
    }

    //Now lets check if there is the post with the given postID or not.  
    const post = await new Promise((resolve, reject) => {
        db.get('SELECT * FROM posts WHERE postID = ?', [postID], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        })
    })

    if (!post) {
        return res.status(404).json({ error: ' We are very but we didnt find any Post related to the given postID!!' });
    }

    else {
        //We have the post and now we can insert the reply in the database. 
        const timestamp = new Date().toISOString();
        const query = 'INSERT INTO replies (postID, userId, username, content) VALUES (?, ?, ?, ?)';

        const newReply = await new Promise((resolve, reject) => {
            db.run(query, [postID, userId, username, content], function (err) {
                if (err) reject(err);
                else resolve({
                    replyID: this.lastID,
                    postID,
                    userId,
                    username,
                    content,
                    timestamp
                });
            });
        });

        return res.status(201).json(newReply);
    }
});

//Now since we stored the replies in the database, we need to fetch the replies from the database.  
router.get('/:postID', async (req, res) => {
    const postID = req.params.postID;

    const replies = await new Promise((resolve, reject) => {
        db.all('SELECT * FROM replies WHERE postID = ?', [postID], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        })
    })

    return res.status(200).json(replies);
});

//Export the router
module.exports = router;







