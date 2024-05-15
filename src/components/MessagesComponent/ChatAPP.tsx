import React, { useState } from 'react';

interface Message {
    text: string;
    sender: 'user' | 'bot';
    timestamp: string;
}

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            text: "Hi there! How can I help you today?",
            sender: 'bot',
            timestamp: new Date().toISOString(),
        }
    ]);
    const [inputText, setInputText] = useState<string>('');

    const handleMessageSend = () => {
        if (inputText.trim() !== '') {
            const newMessage: Message = {
                text: inputText,
                sender: 'user',
                timestamp: new Date().toISOString(),
            };
            setMessages([...messages, newMessage]);
            setInputText('');
            // In a real application, you would handle the bot's response here
            // For now, let's simulate a simple bot response after a delay
            setTimeout(() => {
                const botResponse: Message = {
                    text: `You said: ${inputText}. That's interesting!`,
                    sender: 'bot',
                    timestamp: new Date().toISOString(),
                };
                setMessages([...messages, botResponse]);
            }, 1000);
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-messages">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.sender}`}>
                        <span className="message-text">{message.text}</span>
                        <span className="message-timestamp">{message.timestamp}</span>
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                />
                <button onClick={handleMessageSend}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
