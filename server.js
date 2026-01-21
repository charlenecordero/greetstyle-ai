const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('AI Server 2.5 Active!'));

app.post('/api/transform', async (req, res) => {
    const { message, style } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    try {
        // UPDATED: Using the stable v1 endpoint with Gemini 2.5 Flash
        const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: `Rewrite this message in an extreme ${style} style: "${message}". Reply with ONLY the rewritten text.` }]
                }]
            })
        });

        const data = await response.json();
        if (data.error) throw new Error(data.error.message);

        const transformedText = data.candidates[0].content.parts[0].text;
        res.json({ transformedText: transformedText });

    } catch (e) {
        console.error("Gemini Error:", e.message);
        res.status(500).json({ error: e.message });
    }
});

const PORT = 7860;
app.listen(PORT, '0.0.0.0', () => console.log(`Server live on ${PORT}`));
