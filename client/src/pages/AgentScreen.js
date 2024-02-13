import React from 'react';
import profile from '../components/wall.jpeg';

// Sample data for conversation list
const conversations = [
    {
        id: 1,
        name: 'John Doe',
        serviceRequired: 'Technical Support',
        source: 'Email',
        duration: '15',
        message: 'Having trouble with my account login.'
    },
    {
        id: 2,
        name: 'Jane Smith',
        serviceRequired: 'Sales Inquiry',
        source: 'Chat',
        duration: '10',
        message: 'Interested in your product offerings.'
    },
    {
        id: 2,
        name: 'Jane Smith',
        serviceRequired: 'Sales Inquiry',
        source: 'Chat',
        duration: '10',
        message: 'Interested in your product offerings.'
    },
    {
        id: 2,
        name: 'Jane Smith',
        serviceRequired: 'Sales Inquiry',
        source: 'Chat',
        duration: '10',
        message: 'Interested in your product offerings.'
    },
    {
        id: 2,
        name: 'Jane Smith',
        serviceRequired: 'Sales Inquiry',
        source: 'Chat',
        duration: '10',
        message: 'Interested in your product offerings.'
    },
    {
        id: 2,
        name: 'Jane Smith',
        serviceRequired: 'Sales Inquiry',
        source: 'Chat',
        duration: '10',
        message: 'Interested in your product offerings.'
    }
];

const sampleChatMessages = [
    {
        sender: 'You',
        text: 'Hello Amit, how can I assist you today?',
        name: 'Your Name'
    },
    {
        sender: 'Amit RG',
        text: 'Hi there! I\'m having some trouble with my account.',
        name: 'Amit RG'
    },
    {
        sender: 'You',
        text: 'Sure, what seems to be the problem?',
        name: 'Your Name'
    },
    {
        sender: 'Amit RG',
        text: 'I can\'t seem to log in. It keeps saying my password is incorrect.',
        name: 'Amit RG'
    },
    // Add more messages as needed
];

export default function ReplyToMessage() {
    // This component will handle replying to messages

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
                        {/* Add other icons as needed */}
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="w-full flex">
                {/* Left column: List of conversations */}
                <div className="w-1/4 ">
                    <h3 className="text-lg font-semibold p-4 border border-gray-400">Conversations</h3>
                    {/* Render list of conversations here */}
                    {conversations.map(conversation => (
                        <div key={conversation.id} className="p-4 border-b relative">
                            <div className="flex items-start">
                                <input type="checkbox" className="mr-4 mt-3 checkbox-lg" /> {/* Added mt-1 class for margin-top */}
                                <div>
                                    <p className="font-semibold">{conversation.name}</p>
                                    <p>{conversation.serviceRequired}</p>
                                </div>
                            </div>
                            <div className="mt-1"> {/* Added ml-6 and mt-1 classes */}
                                <p>{conversation.source}</p>
                                <p className="text-gray-500">{conversation.message}</p>
                            </div>
                            <span className="absolute top-0 right-0 px-2 py-1 m-2 text-xs rounded-full">{conversation.duration}m</span>
                        </div>
                    ))}
                </div>

                {/* Center column: Conversation thread */}
                <div className="w-full flex flex-col h-full">
                    <h3 className="text-lg font-bold p-4 border border-gray-400">Amit RG</h3>
                    <div className="flex-grow bg-gray-200 p-4 overflow-auto">
                        {sampleChatMessages.map((message, index) => (
                            <div key={index} className={`mb-2 ${message.sender === 'You' ? 'text-left' : 'text-right'}`}>
                                <p style={{ display: 'inline-block', width: 'auto' }} className="p-3 bg-white rounded-lg"> {message.text}</p>
                                <p className="text-xs text-gray-500">{message.name}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex bg-gray-200 p-3">
                        <input type="text" className="flex-1 border border-gray-400 p-2 rounded-l-md" placeholder="Type your message..." />
                        <button className="bg-blue-500 text-white px-4 rounded-r-md">Send</button>
                    </div>
                </div>

                {/* Right column: Customer's profile */}
                <div className="w-1/4 ">
                    <div className="p-4 flex flex-col items-center bg-white"> {/* Change flex to flex-col */}
                        <img src={profile} alt="Profile Pic" className="w-12 h-12 rounded-full mb-4" /> {/* Adjust size as needed */}
                        <div>
                            <p className="font-semibold text-center">Amit RG</p>
                            <div className="flex mt-2">
                                <button className="bg-gray-500 rounded-lg text-white px-4 py-2 mr-2">Call</button>
                                <button className="bg-gray-500 rounded-lg text-white px-4 py-2">Profile</button>
                            </div>
                        </div>
                    </div>
                    {/* Customer details */}
                    <div className="p-4 border-t shadow rounded-xl bg-white m-3">
                        <h4 className="font-semibold">Customer Details</h4>
                        <p>Email: user@example.com</p>
                        <p>First Name: John</p>
                        <p>Last Name: Doe</p>
                        <button className="text-blue-500 mt-2">View more details</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
