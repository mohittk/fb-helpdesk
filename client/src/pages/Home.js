import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

export default function Home() {
    const [isConnected, setIsConnected] = useState(false);
    const [integratedPage, setIntegratedPage] = useState('');
    const navigate = useNavigate();

    const handleConnectPage = () => {
        // Simulate connecting to Facebook page
        setIsConnected(true);
        setIntegratedPage('Amazon business'); // Set the integrated page name
    };

    const handleDeleteIntegration = () => {
        // Simulate deleting integration
        setIsConnected(false);
        setIntegratedPage('');
    };

    const handleReplyToMessage = () => {
        // Handle reply to message action
        navigate('/agent');
        console.log('Reply to message');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-indigo-900">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-5 mb-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Facebook Page Integration
                    </h2>
                </div>

                {!isConnected ? (
                    <div>
                        <button
                            onClick={handleConnectPage}
                            type="button"
                            className="flex w-full justify-center rounded-[4px] bg-indigo-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-900"
                        >
                            Connect Page
                        </button>
                    </div>
                ) : (
                    <div>
                        <p className="text-center text-gray-700 mb-4">Integrated page: <span className="font-bold">{integratedPage}</span></p>
                        <button
                            onClick={handleDeleteIntegration}
                            type="button"
                            className="flex w-full justify-center rounded-[4px] bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 mb-2"
                        >
                            Delete Integration
                        </button>
                        <button
                            onClick={handleReplyToMessage}
                            type="button"
                            className="flex w-full justify-center rounded-[4px] bg-indigo-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-900"
                        >
                            Reply to Message
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
