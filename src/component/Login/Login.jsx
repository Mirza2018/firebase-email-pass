import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { app } from '../../firebase/firebase';
import { Link } from 'react-router-dom';

const Login = () => {
    const [error, setError] = useState('');
    const [sucess, setSucess] = useState('');

    const auth = getAuth(app)
    const handelSubmit = (event) => {
        event.preventDefault();
        const password = event.target.password.value;
        const email = event.target.email.value;
        console.log(email, password);

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                setError('')
                event.target.reset()
                setSucess('user is create Account sucessfully')
            })
            .catch(error => {
                console.warn(error.message);
                setError(error.message)
            })
    }



    return (
        <div>
            <h1>This is Login</h1>
            <h4>This is Login</h4>
            {error && <p>{error}</p>}
            {sucess && <p>{sucess}</p>}
            <form onSubmit={handelSubmit}>
                <input name='email' type="email" placeholder='Your Email' required />
                <br />
                <input name='password' type="password" placeholder='Your Password' required />
                <br />
                <input type="submit" value='register' />
            </form>

            <small><p>Don't have any account? please <Link to='/register'> Register</Link></p></small>
        </div>
    );
};

export default Login;