# Social Media API Bhwuan Shrestha

## Installation

1. Clone the repository:

```
git clone https://github.com/yourusername/social-media-app.git
cd social-media-app
```

2. Install dependencies:

```
npm install
```

3. Start the server:

```
npm start
```

The server will run on http://localhost:3000.

## API Routes

### Posts

### Manual Testing with Postman

#### Testing Workflow Example:

1. Create a post and note the returned `postID`
2. Get all posts to verify your post was added
3. Update your post using the `postID`
4. Add a reply to your post using the `postID` and note the returned `replyID`
5. Get all replies for the post
6. Update your reply using the `postID` and `replyID`
7. Like the post using the `postID`
8. Get all likes for the post
9. Unlike the post
10. Delete the reply
11. Delete the post

- **GET /api/posts** - Get all posts
- **GET /api/posts/:postID** - Get a specific post
- **POST /api/posts** - Create a new post
  - Request body: `{ userId, username, description }`
  - Example:
    ```json
    {
      "userId": "user123",
      "username": "johndoe",
      "description": "This is my first post!"
    }
    ```
- **PUT /api/posts/:postID** - Update a post
  - Request body: `{ description }`
  - Example:
    ```json
    {
      "description": "This is my updated post content!"
    }
    ```
- **DELETE /api/posts/:postID** - Delete a post and all its replies and likes

### Replies

- **GET /api/replies/:postID** - Get all replies for a post
- **POST /api/replies/:postID** - Add a reply to a post
  - Request body: `{ userId, username, content }`
  - Example:
    ```json
    {
      "userId": "user456",
      "username": "janedoe",
      "content": "Great post! I totally agree."
    }
    ```
- **PUT /api/replies/:postID/:replyID** - Update a reply
  - Request body: `{ content }`
  - Example:
    ```json
    {
      "content": "I've changed my mind about this."
    }
    ```
- **DELETE /api/replies/:postID/:replyID** - Delete a reply

### Likes

- **GET /api/likes/:postID** - Get all likes for a post
- **POST /api/likes/:postID** - Like a post
  - Request body: `{ userId, username }`
  - Example:
    ```json
    {
      "userId": "user789",
      "username": "sarahsmith"
    }
    ```
- **DELETE /api/likes/:postID** - Unlike a post
  - Request body: `{ userId }`
  - Example:
    ```json
    {
      "userId": "user789"
    }
    ```

### Automated Tests

To run all tests:

```
npm test
```

The tests cover:

- Posts: Creating, reading, updating, and deleting posts
- Replies: Adding, reading, updating, and deleting replies to posts
- Likes: Liking, retrieving likes, and unliking posts
