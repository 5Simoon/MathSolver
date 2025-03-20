const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // serve static HTML files

// Hugging Face API route
app.post('/api/verify-huggingface', async (req, res) => {
    const { query } = req.body;
    const API_TOKEN = process.env.HUGGING_FACE_API_TOKEN; // Store your token in GitHub Secrets

    const headers = {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
    };

    const data = { inputs: query };

    try {
        const response = await axios.post(
            'https://api-inference.huggingface.co/models/your-model-id', // Use your Hugging Face model ID
            data,
            { headers }
        );
        res.json({ result: response.data });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error verifying with AI');
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
