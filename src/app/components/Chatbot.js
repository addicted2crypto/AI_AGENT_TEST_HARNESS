"use client"

import { useState } from 'react';
import axios from 'axios';


const Chatbot = () => {
    const [conversation, setConversation] = useState([]);
    const [userMessage, setUserMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [chatlog, setChatlog] = useState([]);
    const [currentModel, setCurrentModel] = useState('llama2');
    const [currentTool, setCurrentTool] = ('tool1');


    const handleSendMessage = async (e) => {
        
           e.preventDefault();
            // if(isSending) return;

            // setIsSending(true);
            //  const reqBody = {message: userMessage}
        try {
            // setConversation([...conversation, {type: 'user', message: userMessage}]);
            const requestBody = {
                "model": "llama2",
                "messages": [{ "role": "user", "content": userMessage }],
                "stream": false
              };
      
            const response = await fetch('http://localhost:11434/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),

                    
            });
            // if (!response.ok) {
            //     throw new Error(`Error: ${response.status}`);
            // }

               
            const data = await response.json();

            // const botResponse = data;

            setConversation((prevConversation) => [...prevConversation, 
                {type: 'user', message: userMessage},
                {type: 'bot', message: data.message.content}]);
                return response.json();
            // setUserMessage('');
        } catch (error) {
            console.error(error);
        } finally {
            setIsSending(false);
        }
    };


    const handleModelChange = (e) => {
        setCurrentModel(e.target.value);
    };
    const handleToolChange = (e) => {
        setCurrentTool(e.target.value);
    };

    return (
        <div className='max-w-md mx auto p-4'>
            <h1 className='text-2xl font-bold mb-4'>
                Chatbot
            </h1>
            <form onSubmit={(e) => handleSendMessage(e)}>
                <input
                    type='text'
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    placeholder='Type your message here...'
                    className='w-full p-2 border border-gray-300 rounded-md mb-4' />
                <button
                    
                    disabled ={!userMessage}
                    type='submit'
                    className='bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md'>
                    Send
                </button>
            </form>
            
            <div>
                {conversation.map((message, index) => (
                    <div key={index}>
                <p style={{
                    color: message.type === 'user' ? 'blue' : 'green'}}>
                    {message.type === 'user' ? 'You:': 'Bot:'}
                    {message.message}
                    </p>
                    </div>
                    
              ))}
              </div>
            
            <div className='mt-4'>
                <label className='block text-sm font-medium mb-2'>
                    Model:

                </label>
                <select value={currentModel} onChange={handleModelChange}className='text-gray-900'>
                    <option value="llama2" >
                        Llama2
                    </option>
                    <option value="other-models here">
                        Other Model

                    </option>
                </select>

            </div>
            <div className='mt-4'>
                <label className='block text-sm font-medium mb-2'>
                    Tool:

                </label>
                <select value={currentTool} onChange={handleToolChange} className='text-gray-900'>
                    <option value="tool1">
                        Tool 1 media post?

                    </option>
                    <option value="tool2">
                        Tool 2 web ai agent ?
                    </option>
                </select>
                <ul className='mt-4'>
                    {conversation.map((message, index) => (
                        <li key={index} className='mb-2'>
                            <p className='text-lg'>
                                {message.message}

                            </p>
                        </li>
                    ))}

                </ul>

            </div>
        </div>
    );
}

export default Chatbot;