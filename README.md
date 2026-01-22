# ✨ GreetStyle AI

**GreetStyle AI** is a magical greeting card generator that lets you send personalized messages which can be transformed into various fun and creative reading styles using AI.

Send a birthday wish that reads like a pirate decree, or a Valentine's note written in Gen Z slang. The possibilities are endless!

---

## 🚀 Features

*   **Magic Link Generation**: Create a unique URL for your greeting to share with anyone.
*   **AI-Powered Rewrites**: Instantly transform standard messages into unique personas using Google's Gemini AI.
*   **Reading Styles**:
    *   🍌 **Minion**: Bello!
    *   💀 **Gen Z**: No cap, fr fr.
    *   🦄 **Fantasy**: Greetings, traveler.
    *   🧘 **Yoga**: Namaste, peaceful vibes.
    *   📜 **Poetry**: Rhymes and verses.
    *   👽 **Yoda**: Powerful you have become.
    *   🏴‍☠️ **Pirate**: Ahoy, matey!
    *   👑 **Royalty**: Hear ye, hear ye!
    *   🕶️ **Gangsta**: Cool street slang.
*   **Live Preview**: See your message transform in real-time.
*   **Visual Effects**: Confetti celebrations for special moments.

---

## 🛠️ Tech Stack

*   **Frontend**: HTML5, Vanilla JavaScript, TailwindCSS (via CDN).
*   **Backend**: Node.js, Express.js.
*   **AI Model**: Google Gemini 2.5 Flash-Lite.
*   **Utilities**: `lz-string` (URL compression), `canvas-confetti`.

---

## ⚙️ Setup & Installation

### Prerequisites
*   [Node.js](https://nodejs.org/) installed on your machine.
*   A Google Gemini API Key.

### 1. Clone the Repository
```bash
git clone https://github.com/charlenecordero/greetstyle-ai.git
cd greetstyle-ai
```

### 2. Install Dependencies
```bash
npm install express cors dotenv
```

### 3. Configure Environment
Create a `.env` file in the root directory and add your Gemini API key:
```env
GEMINI_API_KEY=your_actual_api_key_here
```

### 4. Start the Server
```bash
node server.js
```
The server will start on `http://localhost:7860`.

### 5. Launch the App
Open `index.html` in your browser. 
> **Note**: For the AI styling features to work, ensure the backend (`server.js`) is running and accessible.

---

## 📖 Usage

### Sending a Greeting
1.  Enter your **Name**.
2.  Choose a quick template (Birthday/Valentine) or type your own **Title** and **Message**.
3.  Click **"Generate Magic Link"**.
4.  Copy the generated link and share it with your friend!

### Receiving a Greeting
1.  Open the shared link.
2.  View the original message.
3.  Click on any of the **Style Buttons** (e.g., Minion, Fantasy) to rewrite the message in that persona instantly!

---

💡 **Created by Charlene Cordero**
