import axios from 'axios';

const ollamaApiUrl = 'http://localhost:11434/api/chat';

export default async function handler(req, res) {
  try {
    console.log('Received req:', req.body);
    const response = await axios.fetch(ollamaApiUrl, {
      method: 'POST',
        headers: {'Content-Type' :'application/json'},
        body: JSON.stringify(req.body),
       });
        console.log('Response:', response)
    // })
    //this handler doesnt seem to work at all.... fix me
    // const response = await axios.post('/api/chat', {
    //   method: 'POST',
    //   headers: {'Content-Type' :'application/json'},
    //   body: JSON.stringify(req.body),
    //  });
    console.log('Response from Ollama API:', response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to interact with Ollama agent' });
  }
}
