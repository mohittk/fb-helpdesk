import React from 'react';
import {useNavigate} from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-center min-h-screen bg-indigo-900">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Login to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="email" className="block text-[1rem] font-medium leading-6 text-gray-900">
                                Email
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-900 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mt-4">
                                <label htmlFor="password" className="block text-[1rem] font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-900 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input type="checkbox" id="rememberMe" className="h-4 w-4 text-indigo-900 focus:ring-indigo-500 border-gray-300 rounded" />
                            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-900"
                            >
                                Login
                            </button>
                        </div>
                    </form>

                    <p className="mt-4 text-center text-sm text-gray-500">
                        New to MyApp?{' '}
                        <button onClick={() => navigate('/signup')} href="#" className="font-semibold leading-6 text-indigo-900 hover:text-indigo-500">
                            Sign Up
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}
