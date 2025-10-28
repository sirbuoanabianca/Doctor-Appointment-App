import React, { useState } from 'react'
import { AuthCard } from '../components/AuthCard'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
const API_URL = import.meta.env.SERVER_API_URL || 'http://localhost:5000';

export const CreateAccount = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState([]);
    const [invalidCredential, setInvalidCredential] = useState(false);
    const { register } = useContext(AppContext);
    const navigate = useNavigate();

    const validEmail = new RegExp(
        '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
    );
    const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');

    const validate = () => {
        const errors = [];

        if (!name.trim()) {
            errors.push("- Name is required");
        }
        if (!validEmail.test(email)) {
            errors.push("- Invalid email format");
        }
        if (!validPassword.test(password)) {
            errors.push("- Invalid password format: minimum 6 characters, at least 1 letter and 1 number");
        }

        return errors;
    };

    const handleCreateAccount = async (e) => {
        e.preventDefault();
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Password:', password);

        const errors = validate();

        if (errors.length > 0) {
            setErrorMessage(errors);
            setInvalidCredential(true);
            return; 
        }


 try {
      const response = await axios.post(`${API_URL}/api/user/register`, {name, email, password });
      if (response.data.success) {
        register(response.data.token, response.data.user);
        setErrorMessage([]);
        setInvalidCredential(false);
        navigate('/');
      } else {
        setInvalidCredential(true);
        setErrorMessage([response.data.message || 'Invalid name, email or password']);
      }
    }
      catch (error) {   
        console.error('Create account error:', error);
        setInvalidCredential(true);
        if (error.response) {
          setErrorMessage([error.response.data.message || 'Account creation failed. Please try again.']);
        } else {
          setErrorMessage(['Cannot connect to server. Please check if the backend is running.']);
        }
      }

    }


    return (
        <AuthCard
            title="Create account"
            buttonText="Sign Up"
            onSubmit={handleCreateAccount}
            haveAccountQuestionText="Already have an account?"
            haveAccountAnswerText="Sign In"
            footerLinkHref="/login"
            errorMessage={invalidCredential ? errorMessage : null}

        >
            <input
                type="text"
                placeholder="Your name"
                className="border border-gray-300 rounded-lg p-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                className="border border-gray-300 rounded-lg p-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                className="border border-gray-300 rounded-lg p-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
        </AuthCard>
    )
}
