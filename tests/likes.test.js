/*

This file will handle the tests for the likes routes. For now just working withthe post testing. 



*/

const request = require('supertest'); //impoert supertest
const app = require('../app'); //import the app

//post to test the likes in it
const testPost = {
    userId: "testingLike_posts",
    username: "testuser",
    description: "This is teh test post created for testing the likes functionality"
};

//and now a sample test like data for post created which is above. 
const testLike = {
    userId: "testing_like_user123",
    username: "testing_like_username"
};

let postId;

// then create a post to test the likes on it. 
beforeAll(async () => {
    const response = await request(app)
        .post('/api/posts')
        .send(testPost); //testPost we created above. 

    postId = response.body.postID;
});

//Delete the post after the tsts are done 
afterAll(async () => {
    await request(app)
        .delete(`/api/posts/${postId}`);
});

// This is for the creation of the new likes. 
describe('POST /api/likes/:postID', () => {
    it('should like a post', async () => {
        const response = await request(app)
            .post(`/api/likes/${postId}`)
            .send(testLike);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('likeID');
    });

    it('should prevent duplicate likes', async () => {
        const response = await request(app)
            .post(`/api/likes/${postId}`)
            .send(testLike);

        expect(response.statusCode).toBe(400);
    });

    it('should return 404 for non-existent post', async () => {
        const response = await request(app)
            .post('/api/likes/999999')
            .send(testLike);

        expect(response.statusCode).toBe(404);
    });
});

//This is for the getting all the likes for the post created above. 
describe('GET /api/likes/:postID', () => {
    it('should return all likes for a post', async () => {
        const response = await request(app)
            .get(`/api/likes/${postId}`);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
    });
});

//This is for the deleting the likes for the post created above. 
describe('DELETE /api/likes/:postID', () => {
    it('should unlike a post', async () => {
        const response = await request(app)
            .delete(`/api/likes/${postId}`)
            .send({ userId: testLike.userId });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Post unliked successfully');
    });

    it('should return 404 for non-existent like', async () => {
        const response = await request(app)
            .delete(`/api/likes/${postId}`)
            .send({ userId: "nonexistentuser" });

        expect(response.statusCode).toBe(404);
    });
}); 