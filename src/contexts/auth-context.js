import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { auth } from '../firebase/firebase';
import * as ROUTES from '../constants/routes';

const AuthContext = React.createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ( {children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const history = useHistory();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
            if (user) {
                console.log('HAS USER');
                history.push(ROUTES.CHATS);
            } else {
                console.log('NO USER YET');
                history.push(ROUTES.LOGIN);
            }
        })
    }, [user, history]);

    const value = { user };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}