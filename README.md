# Social Media API

A RESTful API for a social media application that allows posts, replies to posts, and likes on posts. Built with Node.js, Express, and SQLite.

## Features

- Create, read, update, and delete posts
- Create, read, update, and delete replies to posts
- Like and unlike posts
- Get all likes for a post

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

- **GET /api/posts** - Get all posts
- **GET /api/posts/:postID** - Get a specific post
- **POST /api/posts** - Create a new post
  - Request body: `{ userId, username, description }`
- **PUT /api/posts/:postID** - Update a post
  - Request body: `{ description }`
- **DELETE /api/posts/:postID** - Delete a post and all its replies and likes

### Replies

- **GET /api/replies/:postID** - Get all replies for a post
- **POST /api/replies/:postID** - Add a reply to a post
  - Request body: `{ userId, username, content }`
- **PUT /api/replies/:postID/:replyID** - Update a reply
  - Request body: `{ content }`
- **DELETE /api/replies/:postID/:replyID** - Delete a reply

### Likes

- **GET /api/likes/:postID** - Get all likes for a post
- **POST /api/likes/:postID** - Like a post
  - Request body: `{ userId, username }`
- **DELETE /api/likes/:postID** - Unlike a post
  - Request body: `{ userId }`

## Running Tests

To run the automated tests:

```
npm test
```

This will run all tests in the `tests` directory.

## Database Schema

The application uses SQLite with three tables:

- **posts**: postID, userId, username, description, createdAt
- **replies**: replyID, postID, userId, username, content, createdAt
- **likes**: likeID, postID, userId, username, createdAt

## License

This project is licensed under the ISC License.
