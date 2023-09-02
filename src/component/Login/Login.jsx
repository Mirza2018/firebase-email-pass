import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { app } from '../../firebase/firebase';
import { Link } from 'react-router-dom';

const Login = () => {


    const [error, setError] = useState('');
    const [sucess, setSucess] = useState('');

    const emailRef = useRef()

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
               
            })
            .catch(error => {
                console.warn(error.message);
                setError(error.message)
            })
    }

    const handlaForgotPass = () => {
        const email = emailRef.current.value;
        if (!email) {
            alert('Please give a valid email')
            return;
        }
        sendPasswordResetEmail(auth, email)
            .then((result) => {
                alert('Please check your email!!')
            })
            .catch((error) => {

                const errorMessage = error.message;
                console.log(errorMessage);
            });
    }


    return (
        <div>
            <h1>This is Login</h1>
            <h4>This is Login</h4>
            {error && <p>{error}</p>}
            {sucess && <p>{sucess}</p>}
            <form onSubmit={handelSubmit}>
                <input name='email' type="email" placeholder='Your Email' ref={emailRef} required />
                <br />
                <input name='password' type="password" placeholder='Your Password' required />
                <br />
                <input type="submit" value='register' />
            </form>
            <p>Forgot password!!
                <button onClick={handlaForgotPass} > Reset Password </button>
            </p>

            <small><p>Don't have any account? please <Link to='/register'> Register</Link></p></small>
        </div >
    );
};

export default Login;