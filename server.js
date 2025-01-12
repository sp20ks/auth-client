const express = require('express');
const app = express();
const cors = require('cors');

const users = [{ id: 1, username: 'testuser', password: 'password', email: 'test@example.com' }];

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    req.time = new Date(Date.now()).toString();
    console.log(req.method, req.hostname, req.path, req.time, req.body);
    next();
});

app.post('/register', (req, res) => {
    const { username, password, email } = req.body;
    if (users.some(user => user.username === username)) {
        return res.status(409).json({ error: 'User already exists' });
    }
    const newUser = { id: users.length + 1, username, password, email };
    users.push(newUser);
    res.status(201).json(newUser);
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ error: 'Invalid user  credentials' });
    }
    res.json({ refresh_token: 'test-refresh-token', message: 'Login successful' });
});

app.post('/logout', (req, res) => {
    const { refresh_token } = req.body;
    if (!refresh_token) {
        return res.status(400).json({ error: 'No token provided' });
    }
    res.json({ message: 'Logout successful' });
});

app.get('/test', (req, res) => {
    res.send({ express: 'Test server is running' });
});


const port = process.env.PORT || 8081;
app.listen(port, () => {
    console.log(`Test server is running on http://localhost:${port}`);
});
