import { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase/firebase';
import * as ROUTES from '../constants/routes';
import { useAuth } from '../contexts/auth-context';
import axios from 'axios';

export default function Chats() {
    const history = useHistory();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    
    const handleLogout = () => {
        auth.signOut();
        history.push(ROUTES.LOGIN);
    }

    const getFile = async(url) => {
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data], "userPhoto.jpg", { type: 'image/jpeg' })
    }

    useEffect(() => {
        if(!user) {
            history.push(ROUTES.LOGIN);
            return;
        }

        axios.get('https://api.chatengine.io/users/me/', {
            headers: {
                "project-id": "19223a19-555b-45f9-8871-ba2f7bd61c2f",
                "user-name": user.email,
                "user-secret": user.uid,
            }
        })
        .then(() => {
            setLoading(false);
        })
        .catch(() => {
            let formdata = new FormData();
            formdata.append('email', user.email);
            formdata.append('username', user.email);
            formdata.append('secret', user.uid);

            getFile(user.photoURL)
                .then((avatar) => {
                    formdata.append('avatar', avatar, avatar.name);

                    axios.post('https://api.chatengine.io/users/',
                        formdata,
                        { headers: { "private-key": "32bf282f-6f05-4dd1-9cac-5333eb1f25bb" } }
                    )
                    .then(() => setLoading(false))
                    .catch((error) => console.log(error))
                })
        })
    }, [user, history]);
    
    return user?.email || !loading ? (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    The Chatter
                </div>
                <div
                    className="logout-tab"
                    onClick={handleLogout}
                >
                    Logout
                </div>
            </div>
            <ChatEngine 
                height="calc(100vh - 66px)"
                projectID="19223a19-555b-45f9-8871-ba2f7bd61c2f"
                userName={user.email}
                userSecret={user.uid}
            />
        </div> 
    ) : null;
}