import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import API from '../services/apiService.js';

const DashboardContext = createContext();

function DashboardProvider({ children }) {
    const [summary, setSummary] = useState();
    const [posts, setPosts] = useState();
    const [comments, setComments] = useState();
    const [loading, setLoading] = useState(true);

    const fetchDashboardData = useCallback(async () => {
        setLoading(true);
        // Use setTimeout to ensure the loading state renders before API call
        // This breaks up the state updates across different render cycles
        await new Promise(resolve => setTimeout(resolve, 0));

        const json = await API.getProfile();
        if (!json.success) {
            return handleSetNotifications(json.errors.map((error) => (
                createNotification(error.message, 'error')
            )));
        };
        const { profile: { posts, comments } } = json;

        setSummary({
            posts: {
                quantity: posts.length,
                published: posts.reduce(
                    (count, post) => (post.status === 'published' ? count + 1 : count),
                    0
                ),
                drafted: posts.reduce(
                    (count, post) => (post.status === 'drafted' ? count + 1 : count),
                    0
                ),
                dislike: posts.reduce(
                    (count, post) => (count + post.dislike),
                    0
                ),
                like: posts.reduce(
                    (count, post) => (count + post.like),
                    0
                ),
            },
            comments: {
                quantity: comments.length,
                dislike: comments.reduce(
                    (count, comment) => (count + comment.dislike),
                    0
                ),
                like: posts.reduce(
                    (count, comment) => (count + comment.like),
                    0
                ),
            }
        });
        setPosts(posts);
        setComments(comments);
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    return (
        <DashboardContext.Provider value={{ 
            summary, 
            setSummary,
            posts,
            setPosts, 
            comments, 
            setComments,
            loading, 
            reFetch: fetchDashboardData
        }}>
            {children}
        </DashboardContext.Provider>
    );
};

function useDashboardData() {
    return useContext(DashboardContext);
};

export { DashboardProvider as default, useDashboardData };