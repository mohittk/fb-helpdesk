import React, { useState, useEffect } from 'react';
import profile from '../components/wall.jpeg';
import config from '../config';
import HubIcon from '@mui/icons-material/Hub';
import InboxIcon from '@mui/icons-material/Inbox';
import PeopleIcon from '@mui/icons-material/People';
import InsightsIcon from '@mui/icons-material/Insights';
import CallIcon from '@mui/icons-material/Call';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SegmentIcon from '@mui/icons-material/Segment';
import ReplayIcon from '@mui/icons-material/Replay';



export default function ReplyToMessage() {
    const [messages, setMessages] = useState([]);
    const [name, setName] = useState('');
    const [participants, setParticipants] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [conversationName, setConversationName] = useState([]);
    const [adminMessage, setAdminMessage] = useState('');

    const accessToken = config.message_access_token;
    const sendMessageToUser = async () => {
        if (adminMessage.trim() === '') {
            return; // Don't send empty messages
        }

        const messageData = {
            recipient: {
                id: selectedConversation.id
            },
            message: {
                text: adminMessage
            }
        };

        try {
            const response = await fetch('https://graph.facebook.com/v19.0/me/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(messageData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Message sent:', data);
            setMessages(prevMessages => [...prevMessages, { id: data.message_id, message: adminMessage, sender: 'You' }]);
            console.log(messages, '######');
            fetchMessages();
            setAdminMessage('');

        } catch (error) {
            console.error('Error sending message:', error);

        }
    };

    const fetchMessages = async () => {
        try {
            const response = await fetch(`https://graph.facebook.com/v19.0/221852637684026/conversations?fields=participants,messages{id,message,created_time,from}&access_token=${accessToken}`);
            const data = await response.json();
            // Assuming there's only one conversation in data
            const conversation = data.data[0];
            setMessages(conversation.messages.data);
            console.log(conversation.messages.data);
            setParticipants(conversation.participants.data);
            setSelectedConversation(conversation.participants.data[0]);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);


    const handleConversationClick = (conversation) => {
        setSelectedConversation(conversation);
    };







    return (
        <div className="flex font-opensans">

            <div className="w-20 bg-indigo-800 text-white">

                <div className="py-4 flex flex-col items-center justify-between h-full">

                    <div className="my-4">
                        <button className="text-white">
                            <HubIcon />
                        </button>
                    </div>

                    <div className="my-4">
                        <button className="text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <InboxIcon />
                            </svg>
                        </button>
                    </div>

                    <div className="my-4">
                        <button className="text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <PeopleIcon />
                            </svg>
                        </button>
                    </div>

                    <div className="my-4">
                        <button className="text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <InsightsIcon />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>


            <div className="w-full flex">

                <div className="w-[40%]">
                    <h3 className="text-2xl font-opensans font-bold p-4 border border-gray-400"><SegmentIcon style={{ 'color': 'gray', 'fontWeight': '60px' }} /> Conversations <ReplayIcon style={{}} /></h3>

                    {participants.map(participant => (
                        <div key={participant.id} className="p-4 border-b relative" onClick={() => handleConversationClick(participant)}>
                            <div className="flex items-start">
                                <input type="checkbox" className="mr-4 mt-3 checkbox-lg" />
                                <div>
                                    <p className="font-bold">{participant.name}</p>
                                    <p className='font-semibold'>Incoming User</p>
                                </div>
                            </div>
                            <div className="mt-1">
                                <p>Messenger</p>
                            </div>
                            <span className="absolute top-0 right-0 px-2 py-1 m-2 text-gray-600  font-semibold text-xs rounded-full">10m</span>
                        </div>
                    ))}
                </div>


                <div className="w-full flex flex-col h-full">

                    {selectedConversation && (
                        <h3 className="text-2xl font-bold p-4 border border-gray-400">{selectedConversation.name}</h3>
                    )}

                    <div className="flex-grow bg-gray-200 p-4 overflow-auto">
                        {messages?.slice().reverse().map(message => (
                            <div key={message.id} className={`${message.from && message.from.name === 'Foodmania' ? 'text-right' : 'text-left'} p-2 rounded-lg`}>
                                <p style={{ display: 'inline-block', width: 'auto' }} className="p-3 bg-white rounded-lg"> {message.message} </p>
                                <div className="">
                                    <p className="text-xs mt-1 font-semibold text-gray-500">
                                        {message.from && message.from.name === 'Foodmania' ? message.from.name : (message.from ? message.from.name : "Unknown")} - {new Date(message.created_time).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex bg-gray-200 p-3">
                        <input type="text" value={adminMessage} onChange={(e) => setAdminMessage(e.target.value)} className="flex-1 border border-gray-400 p-2 rounded-l-md" placeholder="Type your message..." />
                        <button onClick={sendMessageToUser} className="bg-blue-500 text-white px-4 rounded-r-md">Send</button>
                    </div>
                </div>


                <div className="w-[40%] ">
                    {selectedConversation && (
                        <>
                            <div className="p-4 flex flex-col items-center bg-white">
                                <img src={profile} alt="Profile Pic" className="w-12 h-12 rounded-full mb-4" />
                                <div>
                                    <p className="font-bold text-center font-opensans">{selectedConversation.name}</p>
                                    <div className="flex mt-2">
                                        <button className="flex items-center rounded-[4px] border-2 font-semibold text-gray-600 px-4 py-2 mr-2">
                                            <CallIcon sx={{ marginRight: '0.5rem' }} />
                                            Call
                                        </button>
                                        <button className="flex items-center rounded-[4px] border-2 font-semibold text-gray-600 px-4 py-2">
                                            <AccountCircleIcon sx={{ marginRight: '0.5rem' }} />
                                            Profile
                                        </button>
                                    </div>
                                </div>
                            </div></>
                    )}

                    {selectedConversation && (
                        <>
                            <div className="p-4 border-t shadow rounded-xl bg-white m-3">
                                <h4 className="font-semibold font-opensans">Customer Details</h4>
                                <div className="p-4 border-b relative">
                                    <p><span className="text-gray-600 font-semibold">Email:</span> <span className="font-semibold">{selectedConversation.email}</span></p>
                                    <p><span className="text-gray-600 font-semibold">Name:</span> <span className="font-semibold">{selectedConversation.name}</span></p>
                                </div>
                                <button className="text-blue-500 mt-2">View more details</button>
                            </div>
                        </>
                    )}

                </div>
            </div>
        </div>
    );
}
