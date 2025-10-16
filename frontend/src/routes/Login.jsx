import React, { useState, useContext }  from 'react'
import { AuthCard } from '../components/AuthCard'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidCredential, setInvalidCredential] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { login } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    //TODO: call backend API
    // On success, store token in context and localStorage -call login from context
    // Redirect to home page

    // On failure, show error message -setInvalidCredential(true), setErrorMessage('Invalid email or password');
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
