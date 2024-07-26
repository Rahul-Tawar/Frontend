import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignUP = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUserName] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:3000/api/auth/register', {
                username,
                email,
                password,
            });
            console.log(response?.data);
        } catch (error) {
            setError(error.response.data.message);
            console.log('error fetching the data', error);
        }
    };

    return (
        <div>
            <section className="flex items-center justify-center gap-12 py-16 px-6 md:px-12 bg-background">
                <div className="max-w-md space-y-1">
                    <div className="text-center space-y-4">
                        <h2 className="text-2xl md:text-3xl font-bold">Sign Up</h2>
                        <p className="text-muted-foreground">Create an account to get started</p>
                    </div>
                    <div className="bg-card p-6 rounded-lg shadow-sm">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    placeholder="Enter your name"
                                    value={username}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <Button 
                                type="submit" 
                                variant="solid" 
                                className="w-96 bg-orange-400 hover:bg-orange-500"
                            >
                                Sign Up
                            </Button>
                            <div className="flex items-center justify-between">
                                <Link 
                                    to="/login" 
                                    className="text-sm text-muted-foreground hover:underline"
                                >
                                    Already have an account? Sign in
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SignUP;
