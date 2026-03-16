const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve frontend files

// Custom Qwen API Configuration
const API_URL = process.env.QWEN_BASE_URL;
const API_KEY = process.env.QWEN_API_KEY;
const MODEL_NAME = process.env.QWEN_MODEL || 'Qwen2.5-14B-Instruct';

if (!API_URL || !API_KEY) {
    console.warn("WARNING: QWEN_API_KEY or BASE_URL is missing in .env file!");
}

/**
 * API Endpoint: Detect Scam & Provide Smart Replies
 */
app.post('/api/detect', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        console.log("Analyzing message with Custom LLM:", message);

        // PLAYFUL PROMPT ENGINEERING: AI Mouthpiece / Smart Reply (English Version)
        const systemPrompt = `
        You are a smart assistant for seniors named "SilverGuard".
        
        【Task】
        Analyze the message provided by the user.
        
        If it is a SCAM or SUSPICIOUS:
        1. Warn the user clearly.
        2. Generate 3 "Smart Reply Suggestions" (sassy, humorous, or legalistic) that the senior can copy and send back to the scammer.
           - Style A: Legal/Formal (Intimidating the scammer).
           - Style B: Playing Dumb (Wasting the scammer's time).
           - Style C: Sarcastic/Humorous.
        
        If it is SAFE/NORMAL:
        1. Reply warmly and confirm it's safe.
        2. Leave reply_suggestions empty.

        Please strictly return the following JSON format (Pure JSON, no markdown):
        {
            "is_scam": boolean,
            "risk_level": "high" | "medium" | "low",
            "assistant_response": "A warm, easy-to-understand analysis of the message.",
            "action_suggestion": "A short, actionable tip for the senior (e.g., 'Block this number immediately').",
            "reply_suggestions": [
                "Smart Reply 1 (e.g., 'I have forwarded this to the police.')", 
                "Smart Reply 2 (e.g., 'Oh really? I'm going to the bank now, wait for me!')", 
                "Smart Reply 3"
            ] // Return [] if is_scam is false
        }
        `;

        const response = await axios.post(
            API_URL,
            {
                model: MODEL_NAME, 
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: message }
                ],
                temperature: 0.7,
                max_tokens: 500
            },
            {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const aiResult = response.data.choices[0].message.content;
        console.log("AI Response:", aiResult);

        let parsedResult;
        try {
            const cleanJson = aiResult.replace(/```json/g, '').replace(/```/g, '').trim();
            parsedResult = JSON.parse(cleanJson);
        } catch (e) {
            console.error("JSON Parse Error", e);
            parsedResult = {
                is_scam: true, 
                risk_level: "medium",
                assistant_response: "SilverGuard thinks this message looks suspicious. Better to be safe than sorry!",
                action_suggestion: "Block this contact immediately.",
                reply_suggestions: [
                    "Is this a scam? My grandson said it is!",
                    "I have reported this number to the police.",
                    "Stop wasting your time, I have no money."
                ]
            };
        }

        res.json(parsedResult);

    } catch (error) {
        console.error("API Error:", error.response ? error.response.data : error.message);
        res.status(500).json({ 
            error: 'AI Assistant is offline', 
            details: error.message 
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
