// App Logic for Senior Care App - Premium Edition

// Direct Qwen API Configuration (Frontend Only Version)
const QWEN_API_KEY = "gpustack_e7791d35e7c8d791_fb0832533b53330aeb6a21cb81bb3845";
const QWEN_BASE_URL = "http://39.106.153.140:13088/v1/chat/completions";
const QWEN_MODEL = "Qwen2.5-14B-Instruct";

// DOM Elements
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const loadingOverlay = document.getElementById('loading-overlay');
const nfcModal = document.getElementById('nfc-modal');
const callOverlay = document.getElementById('call-overlay');
const voiceBtn = document.getElementById('voice-btn');
const voiceText = document.getElementById('voice-text');

// --- Navigation Logic ---

function switchTab(tabName) {
    // Hide all views
    document.getElementById('view-home').classList.add('hidden');
    document.getElementById('view-health').classList.add('hidden');
    document.getElementById('view-community').classList.add('hidden');
    
    // Show selected view
    document.getElementById(`view-${tabName}`).classList.remove('hidden');
    
    // Update Nav Icons
    document.querySelectorAll('.nav-item').forEach(el => {
        el.classList.remove('text-teal-600', 'active');
        el.classList.add('text-slate-400');
    });
    
    // Highlight active tab
    const activeBtn = document.querySelector(`button[onclick="switchTab('${tabName}')"]`);
    if(activeBtn) {
        activeBtn.classList.add('text-teal-600', 'active');
        activeBtn.classList.remove('text-slate-400');
    }
}

// --- Simulation Features ---

function simulateNFC() {
    nfcModal.classList.remove('hidden');
    nfcModal.classList.add('flex');
    setTimeout(() => {
        console.log("Tangible Token Activated");
    }, 1500);
}

function closeModal() {
    nfcModal.classList.add('hidden');
    nfcModal.classList.remove('flex');
}

function simulateCall(name, avatarUrl) {
    document.getElementById('call-name').innerText = name;
    document.getElementById('call-avatar-img').src = avatarUrl;
    callOverlay.classList.remove('hidden');
    callOverlay.classList.add('flex');
}

function simulateVideoCall(name, avatarUrl) {
    simulateCall(name, avatarUrl);
    // Add extra video-specific logic if needed
}

function endCall() {
    callOverlay.classList.add('hidden');
    callOverlay.classList.remove('flex');
}

function simulateVoiceInput() {
    voiceBtn.classList.add('bg-red-50', 'text-red-600', 'border-red-200');
    voiceText.innerText = "Listening...";
    
    setTimeout(() => {
        voiceBtn.classList.remove('bg-red-50', 'text-red-600', 'border-red-200');
        voiceText.innerText = "Processing...";
        
        setTimeout(() => {
            userInput.value = "Grandma, I need $5000 for surgery immediately. Transfer to this account...";
            voiceText.innerText = "Hold to Speak (Simulate)";
            sendMessage(); // Auto-send for demo flow
        }, 1000);
    }, 1500);
}

// --- AI Chat Logic ---

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // Remove empty state placeholder
    const emptyState = document.getElementById('chat-empty');
    if(emptyState) emptyState.remove();

    // 1. Add User Message
    appendMessage('user', message);
    userInput.value = '';

    // 2. Show Loading
    loadingOverlay.classList.remove('hidden');
    loadingOverlay.classList.add('flex');

    const systemPrompt = `
    You are SilverGuard. Analyze the message.
    If SCAM: Warn clearly. Generate 3 sassy/smart replies.
    If SAFE: Reply warmly.
    Return JSON: { "is_scam": boolean, "assistant_response": string, "action_suggestion": string, "reply_suggestions": string[] }
    `;

    try {
        const response = await fetch(QWEN_BASE_URL, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${QWEN_API_KEY}`
            },
            body: JSON.stringify({
                model: QWEN_MODEL,
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: message }
                ],
                temperature: 0.7,
                max_tokens: 500
            })
        });

        if (!response.ok) throw new Error(`API Error: ${response.status}`);
        const apiData = await response.json();
        const aiResult = apiData.choices[0].message.content;
        
        let data;
        try {
            const cleanJson = aiResult.replace(/```json/g, '').replace(/```/g, '').trim();
            data = JSON.parse(cleanJson);
        } catch (e) {
            console.error("JSON Parse Error", e);
            data = {
                is_scam: true, 
                assistant_response: "SilverGuard thinks this is suspicious!",
                action_suggestion: "Block contact.",
                reply_suggestions: ["Is this a scam?", "Reporting to police."]
            };
        }

        loadingOverlay.classList.add('hidden');
        loadingOverlay.classList.remove('flex');

        let isAlert = data.is_scam;
        let responseHTML = `
            <div class="font-bold mb-2 flex items-center gap-2 ${isAlert ? 'text-red-600' : 'text-teal-600'}">
                ${isAlert ? '<i class="fa-solid fa-triangle-exclamation"></i> Risk Alert' : '<i class="fa-solid fa-check-circle"></i> Safe'}
            </div>
            <div class="mb-3 leading-relaxed text-slate-600">${data.assistant_response}</div>
            <div class="text-sm bg-slate-50 p-3 rounded-xl border border-slate-100 text-slate-500">
                <i class="fa-regular fa-lightbulb text-yellow-500 mr-1"></i> ${data.action_suggestion}
            </div>
        `;

        if (data.reply_suggestions && data.reply_suggestions.length > 0) {
            responseHTML += `
                <div class="mt-4 pt-3 border-t border-dashed border-slate-200">
                    <div class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Smart Replies</div>
                    <div class="space-y-2">
                        ${data.reply_suggestions.map(reply => `
                            <button onclick="window.copyToClipboard('${reply.replace(/'/g, "\\'")}')" class="w-full text-left text-sm bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-100 p-3 rounded-xl transition-all active:scale-[0.98] flex items-start gap-3 group">
                                <i class="fa-regular fa-copy mt-1 opacity-40 group-hover:opacity-100 transition-opacity"></i>
                                <span class="font-medium">${reply}</span>
                            </button>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        appendMessage('ai', responseHTML, isAlert);

    } catch (error) {
        console.error(error);
        loadingOverlay.classList.add('hidden');
        loadingOverlay.classList.remove('flex');
        appendMessage('ai', "Connection Error. Please check console.");
    }
}

window.copyToClipboard = function(text) {
    navigator.clipboard.writeText(text).then(() => {
        const toast = document.createElement('div');
        toast.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-800 text-white px-6 py-3 rounded-full shadow-2xl animate-fade-in-up z-50 flex items-center gap-2 font-bold';
        toast.innerHTML = '<i class="fa-solid fa-check text-green-400"></i> Copied!';
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
    });
}

function appendMessage(sender, htmlContent, isAlert = false) {
    const bubble = document.createElement('div');
    if (sender === 'user') {
        bubble.className = "chat-bubble-user self-end ml-auto p-4 mb-4 max-w-[85%] text-white font-medium shadow-md animate-fade-in-up";
        bubble.style.background = "linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)"; // Teal gradient
        bubble.innerText = htmlContent; 
    } else {
        bubble.className = `chat-bubble-ai self-start mr-auto p-5 mb-4 max-w-[90%] shadow-sm border animate-fade-in-up ${isAlert ? 'border-red-100 bg-red-50/50' : 'border-slate-100 bg-white'}`;
        bubble.innerHTML = htmlContent;
    }
    chatBox.appendChild(bubble);
    chatBox.scrollTop = chatBox.scrollHeight;
}

userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') sendMessage();
});
