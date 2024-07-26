import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '@/store/slices/authSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isLoading, error, user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div>
      <section className="py-16 px-6 md:px-12 bg-background text-right md:text-center">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold">Login</h2>
            <p className="text-muted-foreground">Sign in to your account</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-sm">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2 text-left">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2 text-left">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <Button 
                variant="solid" 
                className="w-full bg-orange-400 hover:bg-orange-500"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
              <div className="flex items-center justify-between">
                <Link to="/forgot-password" className="text-sm text-muted-foreground hover:underline">
                  Forgot password?
                </Link>
                <Link to="/signup" className="text-sm text-muted-foreground hover:underline">
                  Don't have an account? Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;