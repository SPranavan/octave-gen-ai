import React, { useState, useRef, useEffect } from 'react';
import { Box, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { Send as SendIcon, Download as DownloadIcon } from '@mui/icons-material';
import axios from 'axios';
import '../styles/Chat.css';
import BotLogo from '../images/bot.png';
import User from '../images/user2.png';
import Poster from '../images/poster.png';

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
        const newMessages = [...messages, { text: userMessage, sender: 'user' }];       // CHANGE TEXT TO MEDIA
        setMessages(newMessages);
        setUserMessage('');
        handleAIReply(newMessages);
    };

    const handleAIReply = (newMessages) => {
        const Data = new FormData();
        Data.append('query', JSON.stringify(newMessages[newMessages.length - 1].text));

        setIsGenerating(true);

        axios.post(`http://localhost:8080/auth/query_data`, Data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {

            const poster = res.data.llm_output;
            setMessages([...newMessages, { media: poster, sender: 'ai' }]);

            setIsGenerating(false);
        });

        // const poster = Poster;
        // setMessages([...newMessages, { media: poster, sender: 'ai' }]);
        // setIsGenerating(false);
    };

    useEffect(() => {
        if (chatSectionRef.current) {
            chatSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', height: '90vh', backgroundColor: 'primary.light' }}>

            <Box className="right" sx={{ display: 'flex', flexDirection: 'column', flex: 1, paddingX: '15%', paddingY: '3%', overflowY: 'auto', }}>
                <Box className='chat-section' sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                    {messages.length === 0 ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                            <Box className='welcome-message'>
                                <img src={BotLogo} alt="bot logo" style={{ width: '10%', margin: '20px', padding: '25px' }} />
                                <Typography variant="h4" align="center">
                                    Provide details about your advertisement or promotion, and I'll design a custom poster for you.
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
                                                    &nbsp;You
                                                </Typography>
                                            </>
                                            :
                                            <>
                                                <img src={BotLogo} alt="bot" style={{ width: '40px' }} />
                                                <Typography variant="body1" sx={{ marginLeft: '8px' }}>
                                                    &nbsp;Chatter Charm
                                                </Typography>
                                            </>
                                        }
                                    </Box>
                                    {message.media ? (
                                        <Box sx={{ maxWidth: '50%', marginTop: '18px', position: 'relative' }}>
                                            <img src={`data:image/jpeg;base64,${message.media}`} alt="AI Reply" style={{ maxWidth: '100%', borderRadius: '12px' }} />
                                            <IconButton aria-label="download"
                                                onClick={() => {
                                                    const link = document.createElement('a');
                                                    link.href = `data:image/jpeg;base64,${message.media}`;
                                                    link.download = 'poster.jpg';
                                                    document.body.appendChild(link);
                                                    link.click();
                                                    document.body.removeChild(link);
                                                }}
                                                className='poster-download-button'
                                                sx={{ 
                                                    position: 'absolute', 
                                                    top: '10px', 
                                                    left: '10px', 
                                                    color: 'white', 
                                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                    borderRadius: '8px',
                                                    padding: '4px',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(0, 0, 0, 0.5)'
                                                    }
                                                }}>
                                                <DownloadIcon />
                                            </IconButton>
                                        </Box>
                                    ) : (
                                        <Typography variant="body1" sx={{ marginTop: '8px' }}>
                                            {message.text}
                                        </Typography>
                                    )}
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