import express from "express";
const app = express();
app.get('/posts/:postId', (req, res) => {
 const postId = req.params.postId;
 // Process the postId value
 res.send(`Fetching post with ID ${postId}`);
});
app.listen(3000, () => {
 console.log('Server is running on port 3000');
});