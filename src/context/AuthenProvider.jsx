import { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotifications} from './NotificationProvider.jsx';
import API from '../services/apiService.js';

const AuthenContext = createContext();

function AuthenProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [initialized, setInitialized] = useState(false);
    const { handleApiCall, setNotifications } = useNotifications();
    const navigate = useNavigate();

    const login = async () => {
        const response = await API.login({username: 'benwong123', password: 'benwong123'});
        setUser(response.username)
        setIsAuthenticated(true);
        return;
    };
   
    const verifyToken = async () => {
        console.log('verifying')
        await handleApiCall(() => API.verify(), {
            notifySuccess: false,
            notifyError: false,
            onSuccess: (response) => {
                setUser(response.username);
                setIsAuthenticated(true);
                setInitialized(true);
            },
            onError: (error, infos) => {
                setUser(null);
                setIsAuthenticated(false);

                const [ { message } ] = infos; 
                if (message === 'Expired token') {
                    return handleLogout();
                } else if (message === 'Invalid expired' || message === 'No token found') {
                    return setNotifications({
                        message: message,
                        id: Date.now(),
                        isClosing: false,
                        type: 'error'
                    })
                };

                return;
            }
        });

        return;
    };

    async function handleLogout(path='/', message='You have been safely logged out.') {
        await handleApiCall(async () => await API.logout(), {
            successMessage: message,
            onSuccess: () => {
                setUser(null);
                setIsAuthenticated(false);
                return navigate(path)
            }
        });
    };

    useEffect(() => {
        if (!initialized) {
            login();
        }

        if (isAuthenticated) {
            verifyToken();
        };
        
        const intervalTimerId = setInterval(() => {
            if (isAuthenticated) {
                verifyToken();
            };

        }, 1000 * 10);

        return () => clearInterval(intervalTimerId);
    }, [isAuthenticated]);

    return (
        <AuthenContext.Provider value={{
            user, 
            setUser, 
            handleLogout,
            initialized
        }}>
            { children }
        </AuthenContext.Provider>
    );  
};

function useAuthen() {
    const authenContext = useContext(AuthenContext);

    // Return combined context with navigation functions
    return {
        ...authenContext
    };
};

export { AuthenProvider as default, useAuthen };