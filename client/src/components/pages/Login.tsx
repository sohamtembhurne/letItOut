import React, { useState } from 'react';
import Input from '../common/Input';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { notifyError, notifySuccess } from '../common/Toaster';

const Signup = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSignup = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        const reqBody = {
            email: email,
            password: password
        }

        try {
            const { data } = await axios.post("http://localhost:5500/user/login", reqBody);

            localStorage.setItem('token', data.token);

            const { success, message } = data;

            if (success) {
                notifySuccess(message);
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            } else {
                notifyError(message);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleLoginClick = () => {
        navigate('/signup')
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
            <form onSubmit={handleSignup} className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <Input
                    label='Email'
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    label='Password'
                    type="password"
                    placeholder="Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="flex justify-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Log in
                    </button>
                </div>
                <p className="text-gray-400 mt-4">Don't have an account? <span className="text-blue-400 cursor-pointer" onClick={handleLoginClick}>Sign Up</span></p>
            </form>
        </div>
    );
};

export default Signup;
