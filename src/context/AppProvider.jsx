import AuthenProvider  from './AuthenProvider.jsx';
import NotificationProvider  from './NotificationProvider.jsx';
import ProfileProvider  from './ProfileProvider.jsx';
import ThemeProvider from './ThemeProvider.jsx';

function AppProvider({ children }) {
    return (
        <NotificationProvider>
          <AuthenProvider>
            <ProfileProvider>
              <ThemeProvider>
                {children}
              </ThemeProvider>
            </ProfileProvider>
          </AuthenProvider>  
        </NotificationProvider>
      );
};

export default AppProvider;