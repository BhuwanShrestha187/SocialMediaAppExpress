/*
    * This file will handle likes for posts
*/

//Import express and router 
const express = require('express');
const router = express.Router();

//Import the database 
const db = require('../db');

//1. POST route to like a post
router.post('/:postID', async (req, res) => { //it posts the likes to the specidif postID that we get from the request. 
     const postID = req.params.postID;
     const { userId, username } = req.body;

     if (!userId || !username) { //if usernameand iserID is not provided then we cannot post the likes. 
          return res.status(400).json({ error: 'userId and username are required to like a post' });
     }

     // Check if post exists before liking it. 
     const post = await new Promise((resolve, reject) => {
          db.get('SELECT * FROM posts WHERE postID = ?', [postID], (err, row) => {
               if (err) reject(err);
               else resolve(row);
          });
     });

     if (!post) {
          return res.status(404).json({ error: 'Post not found' });
     }

     // if the user alrady liked the post then dont allow to like
     const existingLike = await new Promise((resolve, reject) => {
          db.get('SELECT * FROM likes WHERE postID = ? AND userId = ?', [postID, userId], (err, row) => {
               if (err) reject(err);
               else resolve(row);
          });
     });

     if (existingLike) { //as mentioned above if the user alrady liked the post then dont allow to like
          return res.status(400).json({ error: 'User has already liked this post' });
     }

     // If the user has not liked the post, add the new like
     const newLike = await new Promise((resolve, reject) => {
          db.run('INSERT INTO likes (postID, userId, username) VALUES (?, ?, ?)',
               [postID, userId, username],
               function (err) {
                    if (err) reject(err);
                    else resolve({
                         likeID: this.lastID,
                         postID,
                         userId,
                         username
                    });
               }
          );
     });

     return res.status(201).json(newLike);
});

//2. GET route to get all likes for a post
router.get('/:postID', async (req, res) => {
     const postID = req.params.postID;

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

     // Get all the likes for the post
     const likes = await new Promise((resolve, reject) => {
          db.all('SELECT * FROM likes WHERE postID = ?', [postID], (err, rows) => {
               if (err) reject(err);
               else resolve(rows);
          });
     });

     return res.status(200).json(likes);
});

//3. delete route to unlike a post
router.delete('/:postID', async (req, res) => {
     const postID = req.params.postID;
     const { userId } = req.body;

     if (!userId) {
          return res.status(400).json({ error: 'userId is required to unlike a post' });
     }

     else {
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

          else {
               // Check if like exists
               const like = await new Promise((resolve, reject) => {
                    db.get('SELECT * FROM likes WHERE postID = ? AND userId = ?', [postID, userId], (err, row) => {
                         if (err) reject(err);
                         else resolve(row);
                    });
               });


               if (!like) {
                    return res.status(404).json({ error: 'Like not found' });
               }

               else {
                    // Remove the like
                    await new Promise((resolve, reject) => {
                         db.run('DELETE FROM likes WHERE postID = ? AND userId = ?', [postID, userId], function (err) {
                              if (err) reject(err);
                              else resolve(this.changes);
                         });
                    });
               }
          }

          return res.status(200).json({ message: 'Post unliked successfully' });
     }
});

// Export the router
module.exports = router;








