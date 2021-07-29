import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import firebase from 'firebase';
import { useEffect } from 'react';
import { auth } from '../firebase/firebase';

export default function Login() {
    
    useEffect(() => {
        document.title = 'Login';
    }, []);


    return (
        <div id="login-page">
            <div id="login-card">
                <h2>Welcome to The Chatter!</h2>
                <div
                    className="login-button google"
                    onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}
                >
                    <GoogleOutlined /> Sign in with Google
                </div>
                <br /><br />
                <div
                    className="login-button facebook"
                    onClick={() => auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())}
                >
                    <FacebookOutlined /> Sign in with Facebook
                </div>
            </div>
        </div>
    );
}