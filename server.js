const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('AI Server Direct-Link Active!'));

app.post('/api/transform', async (req, res) => {
    const { message, style } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    try {
        // We call the STABLE v1 endpoint directly to avoid the 404 error
        const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: `Rewrite this greeting in a ${style} style: "${message}". Reply with ONLY the rewritten text.` }]
                }]
            })
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        // Extract text from the Google JSON structure
        const transformedText = data.candidates[0].content.parts[0].text;
        
        console.log("Success:", transformedText);
        res.json({ transformedText: transformedText });

    } catch (e) {
        console.error("Gemini Direct Error:", e.message);
        res.status(500).json({ error: e.message });
    }
});

const PORT = 7860;
app.listen(PORT, '0.0.0.0', () => console.log(`Server live on port ${PORT}`));
