const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.get('/', (req, res) => res.send('AI Server Active'));

app.post('/api/transform', async (req, res) => {
    const { message, style } = req.body;
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `Rewrite this greeting: "${message}" in a ${style} style. Keep names the same. Reply with ONLY the rewritten text.`;
        
        const result = await model.generateContent(prompt);
        const text = result.response.text();

        // We send the result using the key 'transformedText'
        res.json({ transformedText: text }); 
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "AI Error" });
    }
});

const PORT = process.env.PORT || 7860;
app.listen(PORT, '0.0.0.0', () => console.log(`Running on ${PORT}`));
