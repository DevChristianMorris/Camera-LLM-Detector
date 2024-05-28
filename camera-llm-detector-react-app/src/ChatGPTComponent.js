import React, { useState } from 'react';
import axios from 'axios';

const ChatGPTComponent = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous error
    try {
      const result = await axios.post(
        'http://localhost:5000/api/chat',
        { input },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setResponse(result.data.choices[0].message.content);
    } catch (error) {
      console.error('Error fetching data:', error.response ? error.response.data : error.message);
      setError('An error occurred while fetching the data: ' + (error.response ? error.response.data.error.message : error.message));
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
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default ChatGPTComponent;
