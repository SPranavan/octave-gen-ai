import React, { useState, useRef, useEffect } from 'react';
import { Box, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import axios from 'axios';
import '../styles/Chat.css';
import BotLogo from '../images/bot.png';
import User from '../images/user.png';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [userMessage, setUserMessage] = useState('');
    const chatSectionRef = useRef(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleUserMessageChange = (e) => {
        setUserMessage(e.target.value);
    };

    //handle user prompt
    const handleSendMessage = () => {
        const newMessages = [...messages, { text: userMessage, sender: 'user' }];
        setMessages(newMessages);
        setUserMessage('');
        handleAIReply(newMessages);
    };

    const handleAIReply = (newMessages) => {
        const Data = new FormData();
        Data.append('query', JSON.stringify(newMessages[newMessages.length - 1].text));

        setIsGenerating(true);

        // axios.post(`http://localhost:8080/auth/query_data_with_cosmosDB`, Data, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     }
        // }).then((res) => {

        //     const aiReply = res.data.llm_output;
        //     setMessages([...newMessages, { text: aiReply, sender: 'ai' }]);

        //     setIsGenerating(false);
        // });

        const aiReply = "This is a AI reply";
            setMessages([...newMessages, { text: aiReply, sender: 'ai' }]);
        setIsGenerating(false);
    };

    useEffect(() => {
        if (chatSectionRef.current) {
            chatSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh', backgroundColor: 'primary.light' }}>

            <Box className="right" sx={{ display: 'flex', flexDirection: 'column', flex: 1, paddingX: '15%', paddingY: '3%', overflowY: 'auto', }}>
                <Box className='chat-section' sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                    {messages.length === 0 ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                            <Box className='welcome-message'>
                                <img src={BotLogo} alt="bot logo" style={{ width: '10%', margin: '20px' }} />
                                <Typography variant="h5" align="center">
                                    How can I help you today?
                                </Typography>
                            </Box>
                        </Box>
                    ) : (
                        messages.map((message, index) => (
                            <Box
                                key={index}
                                ref={index === messages.length - 1 ? chatSectionRef : null}
                                sx={{ padding: '16px', display: 'flex' }}>
                                <Box className='ch-box'>
                                    <Box className='ch-box-inner'>
                                        {message.sender === 'user' ?
                                            <>
                                                <img src={User} alt="user" style={{ width: '40px' }} />
                                                <Typography variant="body1" sx={{ marginLeft: '8px' }}>
                                                    User
                                                </Typography>
                                            </>
                                            :
                                            <>
                                                <img src={BotLogo} alt="bot" style={{ width: '40px' }} />
                                                <Typography variant="body1" sx={{ marginLeft: '8px' }}>
                                                    Chatbot
                                                </Typography>
                                            </>
                                        }
                                    </Box>
                                        <Typography variant="body1" sx={{ marginTop: '8px' }}>
                                            {message.text}
                                        </Typography>
                                </Box>

                            </Box>
                        ))
                    )}
                </Box>
                {isGenerating && (
                    <Typography className="loading-container" style={{ margin: 'auto', marginTop: '10px' }}>
                        <Box className="loading-container-inner">
                            <span>Generating </span><span className="loading"></span>
                        </Box>
                    </Typography>
                )}

                <Box className='send-section' sx={{ paddingTop: '1rem' }}>
                    <Box sx={{ position: 'sticky', bottom: 0 }}>
                        <TextField
                            fullWidth
                            placeholder="Your message"
                            value={userMessage}
                            onChange={handleUserMessageChange}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    if (userMessage.trim() === '') {
                                        e.preventDefault();
                                    } else {
                                        handleSendMessage();
                                    }
                                }
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton className='send-button' onClick={handleSendMessage} disabled={userMessage.trim() === ''}>
                                            <SendIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default Chat;