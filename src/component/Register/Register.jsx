import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import { app } from '../../firebase/firebase';
import { Link } from 'react-router-dom';

const Register = () => {
    const [error, setError] = useState('');
    const [sucess, setSucess] = useState('');
    const auth = getAuth(app);

    const handelSubmit = (event) => {
        event.preventDefault();
        const password = event.target.password.value;
        const email = event.target.email.value;
        const name = event.target.name.value;
        console.log(email, password, name);
        if (!/(?=.*[!@#$%^&*])/.test(password)) {
            setError('give A spcial cheracter')
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;

                updateProfile(loggedUser, { displayName: name })
                    .then(() => {
                        console.log("successfully update Name");
                    }).catch((error) => {
                        setError(error.message)
                    });

                sendEmailVerification(loggedUser)
                    .then(result => {
                        console.log(result);
                    })
                    .catch(error => {
                        console.log(error);
                        setError(error.message)
                    })
                console.log(loggedUser);
                setError('')
                event.target.reset()
                setSucess('user is created Account sucessfully')
            })
            .catch(error => {
                console.warn(error.message);
                setError(error.message)
            })
    }

    const handelEmailChange = (event) => {
        console.log(event.target.value);
    }

    const handelPasswordBlur = (event) => {
        console.log(event.target.value);
    }

    return (
        <div>
            <h4>This is register</h4>
            {error && <p>{error}</p>}
            {sucess && <p>{sucess}</p>}
            <form onSubmit={handelSubmit}>
                <input name='name' type="text" placeholder='Your Name' required />
                <br />
                <input onChange={handelEmailChange} name='email' type="email" placeholder='Your Email' required />
                <br />
                <input onBlur={handelPasswordBlur} name='password' type="password" placeholder='Your Password' required />
                <br />
                <input type="submit" value='register' />
                <small><p>Do you have account? please <Link to='/login'> Login</Link></p></small>

            </form>
        </div>
    );
};

export default Register;