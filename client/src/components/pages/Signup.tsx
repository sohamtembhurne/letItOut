import React, { useState } from 'react';
import Input from '../common/Input';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { notifyError, notifySuccess } from '../common/Toaster';

const Signup = () => {

    const navigate = useNavigate();
    // State for input values
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    // Function to handle form submission
    const handleSignup = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        const reqBody = {
            name: name,
            email: email,
            password: password
        }

        try {
            const { data } = await axios.post("http://localhost:5500/user/signup", reqBody);

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

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <form onSubmit={handleSignup} className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <Input
                    label='Name'
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Signup;
