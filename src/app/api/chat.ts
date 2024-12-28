import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const ollamaApiUrl =  'http://localhost:11434/api/chat';

export default async function chatHandler(req: NextApiRequest, res: NextApiResponse) {
   console.log('Received request to /api/chat');

    if(req.method !== 'POST') {
        return res.status(405).json({error: 'Method not allowed'});
    }
    try {
        console.log("Making POST request now to Ollama API at", ollamaApiUrl)
        const response = await axios.post(ollamaApiUrl, req.body);
        console.log('Response from Ollama API:', response.data);
            
        if(!response) {
            throw new Error(`OLLAMA API error: ${response}`);

        }
        return res.status(200).json({ message: {content: response}});

        
    } catch (error) {
        res.status(500).json({ error: 'Failed to interact with the Ollama agent'});
    }
    return res.status(405).json({error: 'Method not allowed'});
} 



