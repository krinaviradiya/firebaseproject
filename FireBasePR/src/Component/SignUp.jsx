import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseConfig'; 
import { Link, useNavigate } from 'react-router-dom';  
import { doc, setDoc } from 'firebase/firestore';  
import './SignUp.css';

const SignUp = () => {
    const [name, setName] = useState('');  
    const [email, setEmail] = useState('');  
    const [phone, setPhone] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [error, setError] = useState(''); 
    const navigate = useNavigate();  

    const handleSignUp = () => {
        setError(''); 

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('User signed up:', user);

                setDoc(doc(db, 'users', user.uid), {
                    name: name,
                    email: email,
                    phone: phone 
                })
                .then(() => {
                    console.log('User data stored in Firestore');
                   
                    setName('');
                    setEmail('');
                    setPhone('');
                    setPassword('');
                    navigate('/login'); 
                })
                .catch((error) => {
                    console.error('Error storing user data:', error);
                    setError(error.message);
                });
            })
            .catch((error) => {
                setError(error.message);  
            });
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="text"
                placeholder="Phone Number" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleSignUp}>Sign Up</button>
            {error && <p style={{color: 'red'}}>{error}</p>} 
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default SignUp;
