/*

This file will handle the tests for the posts routes. For now just working withthe post testing. 


*/

const request = require('supertest');
const app = require('../app');

// Some sample test data to check if the post is working or not. 
const testPost = {
    userId: "testuser123",
    username: "testuser",
    description: "This is a test post"
};

//This is for the upadeted posts. 
const updatedPost = {
    description: "This is an updated post"
};

let postId; //postId to determine the actual postID. 

// This is for the creawtion of the new posts. describe is generally used to group all the tests related to a specific feature.  
// And "it" is used to define a single test. 
describe('POST /api/posts', () => {
    it('should create a new post', async () => {
        const response = await request(app)
            .post('/api/posts')
            .send(testPost);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('postID');
        postId = response.body.postID;
    });
});

//Now testing the get allposts is correct or not.
describe('GET /api/posts', () => {
    it('should return all posts', async () => {
        const response = await request(app)
            .get('/api/posts');

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
    });
});

//Now testing the get a single post is correct or not.
describe('GET /api/posts/:postID', () => {
    it('should return a single post', async () => {
        const response = await request(app)
            .get(`/api/posts/${postId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('postID', postId);
    });

    it('should return 404 for non-existent post', async () => {
        const response = await request(app)
            .get('/api/posts/999999');

        expect(response.statusCode).toBe(404);
    });
});

//Now testing the update a post is correct or not.
describe('PUT /api/posts/:postID', () => {
    it('should update a post', async () => {
        const response = await request(app)
            .put(`/api/posts/${postId}`)
            .send(updatedPost);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Post updated successfully');
    });
});

//Now testing the delete a post is correct or not.
describe('DELETE /api/posts/:postID', () => {
    it('should delete a post', async () => {
        const response = await request(app)
            .delete(`/api/posts/${postId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Post and all associated replies and likes deleted successfully');
    });
}); 