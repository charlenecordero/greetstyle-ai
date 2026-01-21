const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Health Check
app.get('/', (req, res) => res.send('AI Server is Active!'));

// Initialize Gemini - Updated for better compatibility
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/transform', async (req, res) => {
    const { message, style } = req.body;
    try {
        // We use 'gemini-1.5-flash' - if this fails, the SDK handles the versioning
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const prompt = `Rewrite this message in a ${style} style: "${message}". Reply with ONLY the rewritten text.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        console.log("Success! Styled text:", text);
        res.json({ transformedText: text });
    } catch (e) {
        console.error("Gemini Error:", e.message);
        // This sends the actual error back to your browser so we can see it
        res.status(500).json({ error: e.message });
    }
});

const PORT = 7860;
app.listen(PORT, '0.0.0.0', () => console.log(`Server live on port ${PORT}`));
