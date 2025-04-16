/*
    * This file will handle likes for posts
*/

//Import express and router 
const express = require('express');
const router = express.Router();

//Import the database 
const db = require('../db');

// POST route to like a post
router.post('/:postID', async (req, res) => {
     const postID = req.params.postID;
     const { userId, username } = req.body;

     if (!userId || !username) {
          return res.status(400).json({ error: 'userId and username are required to like a post' });
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

     // Check if user already liked this post
     const existingLike = await new Promise((resolve, reject) => {
          db.get('SELECT * FROM likes WHERE postID = ? AND userId = ?', [postID, userId], (err, row) => {
               if (err) reject(err);
               else resolve(row);
          });
     });

     if (existingLike) {
          return res.status(400).json({ error: 'User has already liked this post' });
     }

     // Add new like
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

// GET route to get all likes for a post
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

     // Get all likes for the post
     const likes = await new Promise((resolve, reject) => {
          db.all('SELECT * FROM likes WHERE postID = ?', [postID], (err, rows) => {
               if (err) reject(err);
               else resolve(rows);
          });
     });

     return res.status(200).json(likes);
});

// DELETE route to unlike a post
router.delete('/:postID', async (req, res) => {
     const postID = req.params.postID;
     const { userId } = req.body;

     if (!userId) {
          return res.status(400).json({ error: 'userId is required to unlike a post' });
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

     // Remove the like
     await new Promise((resolve, reject) => {
          db.run('DELETE FROM likes WHERE postID = ? AND userId = ?', [postID, userId], function (err) {
               if (err) reject(err);
               else resolve(this.changes);
          });
     });

     return res.status(200).json({ message: 'Post unliked successfully' });
});

// Export the router
module.exports = router;








