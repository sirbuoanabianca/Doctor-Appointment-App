import React, { useState, useContext } from 'react'
import { AuthCard } from '../components/AuthCard'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const API_URL = import.meta.env.VITE_SERVER_API_URL || 'http://localhost:5000';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidCredential, setInvalidCredential] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);

  const { login } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setInvalidCredential(false);
    setErrorMessage([]);

    try {
      const response = await axios.post(`${API_URL}/api/user/login`, { email, password });
      if (response.data.success) {
        login(response.data.token, response.data.user);
        navigate('/');
      } else {
        setInvalidCredential(true);
        setErrorMessage([response.data.message || 'Invalid email or password']);
      }
    } catch (error) {
      console.error('Login error:', error);
      setInvalidCredential(true);
      if (error.response) {
        setErrorMessage([error.response.data.message || 'Login failed. Please try again.']);
      } else {
        setErrorMessage(['Cannot connect to server. Please check if the backend is running.']);
      }

    }
  }

  return (
    <AuthCard
      title="Login"
      onSubmit={handleLogin}
      buttonText="Sign In"
      haveAccountQuestionText="Don't you have an account?"
      haveAccountAnswerText="Sign up"
      footerLinkHref="/create-account"
      errorMessage={invalidCredential ? errorMessage : null}
    >
      <input
        type="email"
        placeholder="Email" className="border border-gray-300 rounded-lg p-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)} />
      <input
        type="password"
        placeholder="Password"
        className="border border-gray-300 rounded-lg p-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)} />
    </AuthCard>
  )
}
