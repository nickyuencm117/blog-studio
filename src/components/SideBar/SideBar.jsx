import { Link } from 'react-router-dom';
import { DashboardIcon, PostIcon, CommentIcon } from '../../icons';
import styles from './SideBar.module.css';

function SideBar({ className, collasped }) {
    return (
        <aside className={`${styles.sideBar} ${className ? className : ''}`}>
            <nav>
                <ul>
                    <li className={styles.item}>
                        <Link to='/' className={styles.link}>
                            <DashboardIcon/>
                            <div className={`font-xs ${collasped ? styles.collasped : styles.show}`}>
                                <span>Dashboard</span>
                            </div>
                        </Link>
                    </li>

                    <li className={styles.item}>
                        <Link to='/posts' className={styles.link}>
                            <PostIcon/>
                            <div className={`font-xs ${collasped ? styles.collasped :styles.show}`}>
                                <span>Posts</span>
                            </div>
                        </Link>
                    </li>

                    <li className={styles.item}>
                        <Link to='/comments' className={styles.link}>    
                            <CommentIcon/>
                            <div className={`font-xs ${collasped ? styles.collasped: styles.show}`}>
                                <span>Comments</span>
                            </div>
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default SideBar;