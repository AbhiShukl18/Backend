let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
   ];
   // Define a PUT route
   app.put('/api/users/:id', (req, res) => {
    // Extract the user ID from the request parameters
    const userId = parseInt(req.params.id);
    // Find the user by ID
    const user = users.find((user) => user.id === userId);
    // If the user doesn't exist, return a 404 Not Found response
    if (!user) {
    return res.status(404).json({ message: 'User not found' });
    }
    // Update the user's name and email based on the request body
    user.name = req.body.name;
    user.email = req.body.email;
    // Send a response indicating success
    res.json({ message: 'User updated successfully', user });
   });
   