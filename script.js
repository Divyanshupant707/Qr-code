// QR Code Functions (unchanged)
function generateQRCode() {
    const input = document.getElementById('qr-input').value;
    const qrCodeElement = document.getElementById('qr-code');
    const downloadBtn = document.getElementById('download-btn');

    if (input.trim() === "") {
        alert("Please enter some text or URL.");
        return;
    }

    qrCodeElement.innerHTML = "";
    new QRCode(qrCodeElement, {
        text: input,
        width: 256,
        height: 256,
    });

    downloadBtn.disabled = false;
}

function downloadQRCode() {
    const qrCodeElement = document.getElementById('qr-code');
    const canvas = qrCodeElement.querySelector('canvas');

    if (canvas) {
        const borderSize = 20;
        const borderedCanvas = document.createElement('canvas');
        const ctx = borderedCanvas.getContext('2d');

        borderedCanvas.width = canvas.width + borderSize * 2;
        borderedCanvas.height = canvas.height + borderSize * 2;

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, borderedCanvas.width, borderedCanvas.height);
        ctx.drawImage(canvas, borderSize, borderSize);

        const link = document.createElement('a');
        link.href = borderedCanvas.toDataURL('image/png');
        link.download = 'qrcode_with_border.png';
        link.click();
    } else {
        alert("No QR code generated yet.");
    }
}

// Chatbot Functions
const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotBody = document.getElementById('chatbot-body');
const chatbotToggle = document.getElementById('chatbot-toggle');

// Toggle chatbot visibility
chatbotToggle.addEventListener('click', () => {
    if (chatbotBody.style.display === 'none') {
        chatbotBody.style.display = 'flex';
        chatbotToggle.textContent = '-';
    } else {
        chatbotBody.style.display = 'none';
        chatbotToggle.textContent = '+';
    }
});

// Chatbot responses
const chatbotResponses = {
    "hello": "Hello! How can I assist you today?",
    "how to use": "Enter a text or URL in the input field and click 'Generate QR Code' to create a QR code. You can then download it.",
    "download": "Click the 'Download QR Code' button to download the generated QR code as a PNG image.",
    "bye": "Goodbye! Have a great day!",
    "default": "I'm sorry, I didn't understand that. Can you please rephrase?"
};

// Handle user input
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const userMessage = chatbotInput.value.trim().toLowerCase();
        if (userMessage) {
            // Display user message
            const userDiv = document.createElement('div');
            userDiv.className = 'user';
            userDiv.textContent = userMessage;
            chatbotMessages.appendChild(userDiv);

            // Get bot response
            const botResponse = chatbotResponses[userMessage] || chatbotResponses['default'];
            const botDiv = document.createElement('div');
            botDiv.className = 'bot';
            botDiv.textContent = botResponse;
            chatbotMessages.appendChild(botDiv);

            // Clear input
            chatbotInput.value = '';

            // Scroll to bottom
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }
    }
});