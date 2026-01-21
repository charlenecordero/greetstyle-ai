const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require('cors'); // Makes sure GitHub can talk to Hugging Face
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors()); // VERY IMPORTANT

app.get('/', (req, res) => res.send('Server Running!'));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/transform', async (req, res) => {
    const { message, style } = req.body;
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `Rewrite this: "${message}" in a ${style} style. No extra chat, just the rewritten text.`;
        const result = await model.generateContent(prompt);
        res.json({ transformedText: result.response.text() });
    } catch (e) {
        res.status(500).json({ error: "AI Error" });
    }
});

const PORT = 7860; // Hugging Face default
app.listen(PORT, '0.0.0.0', () => console.log('Live!'));
