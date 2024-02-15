import React, { useState, useEffect } from 'react';
import profile from '../components/wall.jpeg';
import config from '../config';



export default function ReplyToMessage() {
    const [messages, setMessages] = useState([]);
    const [name, setName] = useState('');
    const [participants, setParticipants] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [conversationName, setConversationName] = useState([]);
    const [adminMessage, setAdminMessage] = useState('');

    const accessToken = config.message_access_token;
    const sendMessageToUser = () => {
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

        fetch('https://graph.facebook.com/v19.0/me/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(messageData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Message sent:', data);
                setMessages(prevMessages => [...prevMessages, { id: data.message_id, message: adminMessage, sender: 'You' }]);
                fetchMessages();
                setAdminMessage('');
                // Optionally, update local state or perform other actions
            })
            .catch(error => {
                console.error('Error sending message:', error);
                // Handle errors gracefully, show error message to the user, etc.
            });
    };

    const fetchMessages = () => {
        fetch(`https://graph.facebook.com/v19.0/221852637684026/conversations?fields=participants,messages{id,message}&access_token=${accessToken}'`)
            .then(response => response.json())
            .then(data => {
                // Assuming there's only one conversation in data
                const conversation = data.data[0];
                setMessages(conversation.messages.data);
                console.log(conversation.messages.data);
                setParticipants(conversation.participants.data);
                setSelectedConversation(conversation.participants.data[0]);
            })
            .catch(error => console.error('Error fetching messages:', error));
    };

    useEffect(() => {
        // Fetch messages from API when component mounts
        fetchMessages();
    }, []);


    const handleConversationClick = (conversation) => {
        setSelectedConversation(conversation);
    };







    return (
        <div className="flex">
            {/* Left column: Vertical navbar */}
            <div className="w-20 bg-indigo-800 text-white">
                {/* Add icons for each navigation item */}
                <div className="py-4 flex flex-col items-center justify-between h-full">
                    <div className="my-4">
                        <button className="text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>

                    </div>
                </div>
            </div>


            <div className="w-full flex">

                <div className="w-1/4 ">
                    <h3 className="text-lg font-semibold p-4 border border-gray-400">Conversations</h3>

                    {participants.map(participant => (
                        <div key={participant.id} className="p-4 border-b relative" onClick={() => handleConversationClick(participant)}>
                            <div className="flex items-start">
                                <input type="checkbox" className="mr-4 mt-3 checkbox-lg" />
                                <div>
                                    <p className="font-semibold">{participant.name}</p>
                                    <p>Incoming User</p>
                                </div>
                            </div>
                            <div className="mt-1">
                                <p>Messenger</p>
                            </div>
                            <span className="absolute top-0 right-0 px-2 py-1 m-2 text-xs rounded-full">{participant.duration}m</span>
                        </div>
                    ))}
                </div>


                <div className="w-full flex flex-col h-full">

                    {selectedConversation && (
                        <h3 className="text-lg font-bold p-4 border border-gray-400">{selectedConversation.name}</h3>
                    )}

                    <div className="flex-grow bg-gray-200 p-4 overflow-auto">
                        {messages.slice().reverse().map(message => (
                            <div key={message.id} className={`mb-2 ${message.sender === 'You' ? 'text-right' : 'text-left'}`}>
                                <p style={{ display: 'inline-block', width: 'auto' }} className="p-3 bg-white rounded-lg"> {message.message}</p>
                                <p className="text-xs text-gray-500">{message.sender === 'You' ? 'Your Name' : selectedConversation ? selectedConversation.name : 'Sundar Pichai'}</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex bg-gray-200 p-3">
                        <input type="text" value={adminMessage} onChange={(e) => setAdminMessage(e.target.value)} className="flex-1 border border-gray-400 p-2 rounded-l-md" placeholder="Type your message..." />
                        <button onClick={sendMessageToUser} className="bg-blue-500 text-white px-4 rounded-r-md">Send</button>
                    </div>
                </div>


                <div className="w-1/4 ">
                    {selectedConversation && (
                        <>
                            <div className="p-4 flex flex-col items-center bg-white">
                                <img src={profile} alt="Profile Pic" className="w-12 h-12 rounded-full mb-4" />
                                <div>
                                    <p className="font-semibold text-center">{selectedConversation.name}</p>
                                    <div className="flex mt-2">
                                        <button className="bg-gray-500 rounded-lg text-white px-4 py-2 mr-2">Call</button>
                                        <button className="bg-gray-500 rounded-lg text-white px-4 py-2">Profile</button>
                                    </div>
                                </div>
                            </div></>
                    )}

                    {selectedConversation && (
                        <>
                            <div className="p-4 border-t shadow rounded-xl bg-white m-3">
                                <h4 className="font-semibold">Customer Details</h4>
                                <div className="p-4 border-b relative">
                                    <p>Email:{selectedConversation.email}</p>
                                    <p>Name: {selectedConversation.name}</p>
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
