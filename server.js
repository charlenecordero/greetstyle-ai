const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors()); // Critical for GitHub to talk to Hugging Face

// Root health check
app.get('/', (req, res) => res.send('GreetStyle AI Server is Active!'));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/transform', async (req, res) => {
    const { message, style } = req.body;
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        // Stronger prompt for better style changes
        const prompt = `You are a professional creative writer. Rewrite the following greeting message in an EXTREME and highly creative "${style}" style. Use vocabulary, slang, and a tone that matches "${style}" perfectly. 
        
        Original Message: "${message}" 
        
        Return ONLY the rewritten greeting. Do not say "Here is your rewrite".`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ transformedText: text });
    } catch (e) {
        console.error("Gemini Error:", e);
        res.status(500).json({ error: "AI Transformation Failed" });
    }
});

const PORT = process.env.PORT || 7860;
app.listen(PORT, '0.0.0.0', () => console.log(`Server listening on port ${PORT}`));
