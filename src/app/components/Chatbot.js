"use client"

import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';
import axios from 'axios';
import { middleware } from '../_middleware';
import chatHandler from '../api/chat';
const _cfAccessClientSecret = process.env._cfAccessClientSecret;
 const _clientId = process.env._clientId;
const Chatbot = () => {
    const [conversation, setConversation] = useState([]);
    const [userMessage, setUserMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [isBotResponding, setIsBotResponding] = useState(false);
    const [currentModel, setCurrentModel] = useState('llama2');
    const [currentPrompt, setCurrentPrompt] = useState('You are a world-class AI system, capable of complex reasoning and reflection. Reason through the query inside <thinking> tags, and then provide your final response inside <output> tags. If you detect that you made a mistake in your reasoning at any point, correct yourself inside <reflection> tags');
    const [currentTool, setCurrentTool] = ('tool1');


    // const getAccessToken = async() => {
    //     const response = await axios.post('https://ai.ainetguard.com', {
    //         grant_type: 'client_creditials', client_id: _clientId, client_secret: _cfAccessClientSecret,
    //     });
    //     return response.data.result.access_token;
    // };

    const handleSendMessage = async (e) => {

        e.preventDefault();
        setConversation((prevConversation) => [
            ...prevConversation,
            { type: 'user', message: userMessage },
          ]);
        
          setIsSending(true);
          setIsBotResponding(true);

        try {
            // const access_token = await getAccessToken();
            const chatResponse = chatHandler;
            const requestBody = {
                // "system" : "You are a world-class AI system, capable of complex reasoning and reflection. Reason through the query inside <thinking> tags, and then provide your final response inside <output> tags. If you detect that you made a mistake in your reasoning at any point, correct yourself inside <reflection> tags",
                "model": "llama2",
                "messages": [{"role": "assistant", "content": ""}, { "role": "user", "content": userMessage }],
                "stream": false
            };
            
            const response = await fetch('http://localhost:11434/api/chat', {
               
            method: 'POST', 
            //  middleware ,
                
                    headers: { 'Content-Type': 'application/json' },
                    // 'Authorization'  : `Bearer ${access_token}`
                   
                    body: JSON.stringify(requestBody),
                    // chatHandler,
                
                });
            
                
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }


            const data = await response.json();

            // const botResponse = data;

            setConversation((prevConversation) => [...prevConversation,
            // { type: 'user', message: userMessage },
            { type: 'bot', message: data.message.content }]);
           
            setUserMessage('');
           
            // return response.json();
            setIsBotResponding(false);
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
    const handlePromptChange = (e) => {
        setCurrentPrompt(e.target.value);
    }
    return (
        <div className='max-w-4xl mx-auto p-4'>

            <header className='top-2 pb-[8rem] flex flex-col md:flex-row justify-around'>
                <div className='mt-4 w-1/3 '>

                    <label className='block text-sm font-medium mb-2'>
                        Prompt:
                    </label>
                    <select value={currentPrompt} onChange={handlePromptChange} className='text-gray-900 mb-2'>
                        <option value="Reflection">
                            Reflection
                        </option>
                        <option value="add other prompts here">
                            Other Prompts
                        </option>
                    </select>
                </div>
                <div className='mt-4 w-1/3'>
                    <label className='block text-sm font-medium mb-2'>
                        Model:

                    </label>
                    <select value={currentModel} onChange={handleModelChange} className='text-gray-900'>
                        <option value="llama2" >
                            Llama2
                        </option>
                        <option value="other-models here">
                            Other Model

                        </option>
                    </select>

                </div>
                <div className='mt-4 w-1/3'>
                    <label className='block text-sm font-medium mb-2'>
                        Tool:

                    </label>
                    <select value={currentTool} onChange={handleToolChange} className='text-gray-900'>
                        <option value="tool1">
                            Tool 1 media post agent?

                        </option>
                        <option value="tool2">
                            Tool 2 web ai agent ?
                        </option>
                    </select>


                </div>
            </header>


            <h1 className='text-2xl font-bold mb-4 '>
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
                   
                    disabled={!userMessage}
                    type='submit'
                    className='bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md'>
                    Send
                </button>
            </form>

            <div className='w-[40rem] h-[100rem]'>
                {conversation.map((message, index) => (
                    <div key={index}>
                        <p style={{
                            color: message.type === 'user' ? '#15e1f8' : '#61dd09'
                        }}>
                            {message.type === 'user' ? 'You:  ' : 'Bot🤖:  '}
                            {message.message}
                        </p>
                    </div>

                )) }

                {isBotResponding ? (
                    
                    <div className='p-2 space-y-3'>
                        "Please wait while we generate your response... 
               <Skeleton className='w-[40rem] h-[2rem] rounded-full' />
               <Skeleton className='w-[40rem] h-[2rem] rounded-full' />
               <Skeleton className='w-[40rem] h-[2rem] rounded-full' />
               </div>
                ) : (
                    <Skeleton className='pl-16 w-[30rem] h-[1rem] rounded-md' />
                )}
            </div>

        </div>

    );
}

export default Chatbot;