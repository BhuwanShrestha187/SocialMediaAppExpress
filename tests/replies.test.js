/*

    Th

*/  const request = require('supertest'); //We need to import the request from the supertest. 
const app = require('../app'); //We need to import the app from the app.js file. 

// This ist the sameple test datea for the posts.
const testPost = {
    userId: "testuser123",
    username: "testuser",
    description: "Test post for replies"
};

//And thjis is the sample test data for the replies for the posts created above. 
const testReply = {
    userId: "replyuser123",
    username: "replyuser",
    content: "This is a test reply"
};

//This is the sample test data for the updated replies for the posts created above. 
const updatedReply = {
    content: "This is an updated reply"
};

let postId;
let replyId;

// At first before testing the replies, make a  new post. 
beforeAll(async () => {
    const response = await request(app)
        .post('/api/posts')
        .send(testPost);

    postId = response.body.postID;
});

//delete the post after the tests are done. 
afterAll(async () => {
    await request(app)
        .delete(`/api/posts/${postId}`);
});

// create a reply 
describe('POST /api/replies/:postID', () => {
    it('should create a new reply', async () => {
        const response = await request(app)
            .post(`/api/replies/${postId}`)
            .send(testReply);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('replyID');
        replyId = response.body.replyID;
    });

    it('should return 404 for non-existent post', async () => {
        const response = await request(app)
            .post('/api/replies/999999')
            .send(testReply);

        expect(response.statusCode).toBe(404);
    });
});

//get all replies for a post 
describe('GET /api/replies/:postID', () => {
    it('should return all replies for a post', async () => {
        const response = await request(app)
            .get(`/api/replies/${postId}`);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
    });
});

//update a reply 
describe('PUT /api/replies/:postID/:replyID', () => {
    it('should update a reply', async () => {
        const response = await request(app)
            .put(`/api/replies/${postId}/${replyId}`)
            .send(updatedReply);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Reply updated successfully');
    });

    it('should return 404 for non-existent reply', async () => {
        const response = await request(app)
            .put(`/api/replies/${postId}/999999`)
            .send(updatedReply);

        expect(response.statusCode).toBe(404);
    });
});

//delete a reply 
describe('DELETE /api/replies/:postID/:replyID', () => {
    it('should delete a reply', async () => {
        const response = await request(app)
            .delete(`/api/replies/${postId}/${replyId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Reply deleted successfully');
    });
}); 