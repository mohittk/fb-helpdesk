import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config';

export default function Home() {
    const [isConnected, setIsConnected] = useState(false);
    const [integratedPage, setIntegratedPage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const navigate = useNavigate();
    const accessToken = config.page_access_token;

    useEffect(() => {
        if(localStorage.getItem("token")){
            setIsLoggedIn(true);
        }
        else{
            setIsLoggedIn(false);
        }
    },[])

    

    const handleConnectPage = async () => {
        try {
            const response = await fetch(`https://graph.facebook.com/v19.0/122106292460209152/accounts?access_token=${accessToken}`);
            const data = await response.json();
            if (data && data.data && data.data.length > 0) {
                const pageName = data.data[0].name;
                setIntegratedPage(pageName);
                setIsConnected(true);
            }
        } catch (error) {
            console.error('Error connecting to Facebook page:', error);
        }
    };

    const handleDeleteIntegration = () => {
        setIsConnected(false);
        setIntegratedPage('');
    };

    const handleReplyToMessage = () => {
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

                
                {isLoggedIn ? (
                    // User is logged in
                    !isConnected ? (
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
                    )
                ) : (
                    // User is not logged in
                    <div>
                        <p className="text-center text-gray-700 mb-2">Please login to see the page</p>
                        <button
                            onClick={() => navigate('/login')}
                            type="button"
                            className="flex w-full font-opensans justify-center rounded-[4px] bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                        >
                            Login
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
