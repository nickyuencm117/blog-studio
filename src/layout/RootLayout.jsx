import { useState } from 'react';
import AuthenProvider  from '../context/AuthenProvider.jsx';
import NotificationProvider  from '../context/NotificationProvider.jsx';
import DashboardProvider from '../context/DashboardProvider.jsx';
import DialogProvider from '../../ss/DialogProvider.jsx';
import NotificationDisplayer from '../NotificationDisplayer.jsx';
import Header from '../components/Header/Header.jsx';
import SideBar from '../components/SideBar/SideBar.jsx';
import { Outlet } from 'react-router-dom';
import layoutStyles from './RootLayout.module.css';

const RootLayout = () => {
  const [hidden, setHidden] = useState(true);

    return (
      <NotificationProvider>
        <AuthenProvider>            
              <NotificationDisplayer />
              <div className={layoutStyles.layout}>
                <Header 
                  className={layoutStyles.header}
                  toggleSideBar={() => setHidden(!hidden)} 
                />
                <SideBar 
                  className={layoutStyles.SideBar}
                  hidden={hidden} 
                />
                <div 
                  className={layoutStyles.main}
                  style={{padding: 'var(--spacing5)'}}
                >
                  <DashboardProvider>
                    <Outlet/>
                  </DashboardProvider> 
                </div>        
              </div>
        </AuthenProvider>  
      </NotificationProvider>
    );
};

export default RootLayout;