/**
 * GreetStyle AI - Backend Server
 * Purpose: Handles AI text style transformations
 */

const express = require('express');
const OpenAI = require('openai');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
// We set a 10mb limit to handle the compressed image data sent in the request
app.use(express.json({ limit: '10mb' }));
app.use(cors());

// Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

/**
 * AI Transform Endpoint
 * This takes the original message and rewrites it based on the selected theme.
 */
app.post('/api/transform', async (req, res) => {
    const { message, style } = req.body;

    if (!message || !style) {
        return res.status(400).json({ error: "Message and style are required." });
    }

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: `You are a creative writing assistant. 
                    Rewrite the user's message in a ${style} style. 
                    - If style is 'short', make it very concise.
                    - If style is 'long', expand it with beautiful details.
                    - For 'pirate', 'gangsta', 'western', etc., use heavy characteristic slang.
                    - Keep the core meaning and names the same.`
                },
                { role: "user", content: message }
            ],
            temperature: 0.8, // Slightly higher for more creative "themed" responses
        });

        res.json({ transformedText: response.choices[0].message.content });
    } catch (error) {
        console.error("OpenAI Error:", error);
        res.status(500).json({ error: "The AI is currently resting. Please try again." });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`
    ✅ GreetStyle AI Server is Running!
    ----------------------------------
    Local URL: http://localhost:${PORT}
    Endpoint:  POST /api/transform
    ----------------------------------
    Press Ctrl+C to stop the server.
    `);
});