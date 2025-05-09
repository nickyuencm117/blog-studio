import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../services/apiService.js';
import Editor from '../../components/Editor/Editor.jsx';
import { useNotifications } from '../../context/NotificationProvider.jsx';
import { useProfile } from '../../context/ProfileProvider.jsx';

function EditPage() {
    const { handleApiCall } = useNotifications();
    const { setPosts } = useProfile();
    const [loading, setLoading] = useState(true);
    const [editContent, setEditContent] = useState();
    const { postId } = useParams();
    
    useEffect(() => {
        handleApiCall(() => API.getPost(postId), { 
            notifySuccess: false, 
            onSuccess: (response) => {
                setEditContent(response);
                setLoading(false);
            }
        });

        return;
    }, [])

    function handleUpdatePost(title, content) {
        handleApiCall(() => API.updatePost(postId, title, content), { 
            successMessage: 'Updated sucessfully', 
            errorMessage: 'Updated unsucessfully',
            onSuccess: (result) => { 
                setPosts((currentPosts) => currentPosts.map((post) => 
                    post.id === postId ? ({...post, title: result.post.title,}) : (post)
                ));
            }
        });

        return;
    };

    return (
        loading ? (
            <div>loading</div>
        ) : (
            <main className='edit-page'>
            <h2 className='font-md mb5'>Edit</h2>
                <Editor 
                    title={editContent.post.title}
                    content={editContent.post.content}
                    onSave={handleUpdatePost}
                />
            </main>
        )
    );
};

export default EditPage;