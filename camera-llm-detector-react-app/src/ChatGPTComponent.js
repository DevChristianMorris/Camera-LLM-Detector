import React, { useState } from 'react';
import axios from 'axios';

const ChatGPTComponent = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        'https://api.openai.com/v1/engines/davinci-codex/completions',
        {
          prompt: input,
          max_tokens: 150,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer sk-proj-2xS1aHfshzeWH8LJvdvbT3BlbkFJwhznkbgeIU4tLOd4LK0q`,
          },
        }
      );
      setResponse(result.data.choices[0].text);
    } catch (error) {
      console.error('Error fetching data:', error);
      setResponse('An error occurred while fetching the data.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask ChatGPT something..."
        />
        <button type="submit">Submit</button>
      </form>
      <div>
        <h3>Response:</h3>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default ChatGPTComponent;
