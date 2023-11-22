const apiKey = '***';
const apiUrl = 'https://api.openai.com/v1/chat/completions';

document.getElementById('message-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const userInput = document.getElementById('message-input').value;
    if (userInput.trim() === '') return;

    displayUserMessage(userInput);
    document.getElementById('message-input').value = '';

    sendMessageToChatGPT(userInput);
}

async function sendMessageToChatGPT(userMessage) {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            max_tokens: 150,
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'user', content: userMessage }
            ]
        })
    });

    const data = await response.json();
    const chatGPTContent = data.choices[0].message.content;

    displayChatGPTResponse(chatGPTContent);
}

function displayUserMessage(message) {
    const chatDiv = document.getElementById('chat');
    chatDiv.innerHTML += `<div class="user-message">${message}</div>`;
    chatDiv.scrollTop = chatDiv.scrollHeight;
}

function displayChatGPTResponse(response) {
    const chatDiv = document.getElementById('chat');
    chatDiv.innerHTML += `<div class="chatgpt-message">${response}</div>`;
    chatDiv.scrollTop = chatDiv.scrollHeight;
}
