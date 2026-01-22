const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('AI Server 2.5 Flash-Lite Active!'));

app.post('/api/transform', async (req, res) => {
    const { message, style } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    try {
        const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ 
                        text: `You are a creative rewrite bot. Rewrite this greeting: "${message}" 
                        
                        Theme Instructions:
                        - If "minion": Use Minion-speak (Bello, Banana, Tulaliloo, Poopaye).
                        - If "gen z": Use brainrot slang (No cap, fr fr, skibidi, rizz, fanum tax, ohio).
                        - For others: Be extremely expressive.
                        
                        Return ONLY the rewritten text.` 
                    }]
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
