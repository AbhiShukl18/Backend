import express from "express";
const app = express();
// Simulated data - to be replaced with your actual data storage
let users = [
 { id: 1, name: 'John Doe', email: 'john@example.com' },
 { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];
// Define a DELETE route
app.delete('/api/users/:id', (req, res) => {
 // Extract the user ID from the request parameters
 const userId = parseInt(req.params.id);
 // Find the index of the user by ID
 const userIndex = users.findIndex((user) => user.id === userId);
 // If the user doesn't exist, return a 404 Not Found response
 if (userIndex === -1) {
 return res.status(404).json({ message: 'User not found' });
 }
 // Remove the user from the array
 users.splice(userIndex, 1);
 // Send a response indicating success
 res.json({ message: 'User deleted successfully' });
});
// Start the server
app.listen(8000, () => {
 console.log('Server is running on port 8000');
});