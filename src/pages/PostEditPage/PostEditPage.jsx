import { useParams } from 'react-router-dom';
import { useRef, useState, useCallback } from 'react';
import Editor from '../../components/Editor/Editor.jsx';
import { UnexpectedError, PageNotFoundError } from '../../components/Error';
import SpinningLoader from '../../components/SpinningLoader/SpinningLoader.jsx';
import usePost from '../../hook/usePost.jsx';
import styles from './PostEditPage.module.css';

function PostEditPage() {
    const { postId } = useParams();
    const { post, setPost, initialLoading, updateLoading, setUpdateLoading, error, handlePostUpdate } = usePost(postId);
    const editorRef = useRef();

    const getInvalidFieldMessages = useCallback((error) => {
        if (!error || error.name !== 'ValidationError') return null;

        const messages = {}
        for (const field of error.details.invalidFieldError.fields) {
            messages[field.path] = field.message
        };

        return messages;
    }, []);

    const validationMessages = getInvalidFieldMessages(error);

    async function handleSave() {
        const valueToUpdate = {
            title: post.title,
            content: editorRef.current.getContent(),
            summary: post.summary ,
            status: post.status
        };

        editorRef.current.setEditable(false);
        setUpdateLoading(true);

        await handlePostUpdate(valueToUpdate);

        editorRef.current.setEditable(true);
        setUpdateLoading(false);
    };

    if (!initialLoading && !updateLoading && error) {
        switch (error.name) {
            case 'ResourceNotFoundError':
                return (<PageNotFoundError/>);  
            case 'ValidationError':
                break;
            default:
                return (<UnexpectedError/>)
        };
    };

    return (
        initialLoading ? (
            <div className={styles.loaderContainer}>
                <SpinningLoader/>
            </div>
        ) : (
            <main className={styles.editPage} >  
                {post && (
                    <>                  
                        <h2 className='font-md mb5'>Edit</h2>

                        <div className={`mb6 ${styles.inputContainer}`}>
                            <h3 className='font-sm bold mb2'>Title</h3>
                            <input
                                className='font-sm' 
                                value={post.title}
                                onChange={(e) => setPost({...post, title: e.target.value })}
                                disabled={updateLoading} 
                                required={true}
                            />
                            {validationMessages && <span className='font-xxs'>{validationMessages.title}</span>}
                        </div>

                        <div className={`mb6 ${styles.inputContainer}`}>
                            <h3 className='font-sm bold mb2'>Summary</h3>
                            <input
                                className='font-sm' 
                                value={post.summary}
                                onChange={(e) => setPost({...post, summary: e.target.value })}
                                disabled={updateLoading} 
                            />
                        </div>

                        <div className='mb4'>
                            <h3 className='font-sm bold mb2'>Content</h3>
                            <Editor 
                                content={post.content}
                                ref={editorRef}
                            />
                        </div>

                        <div className={styles.editAction}>
                            <div>
                                <label htmlFor='status' className='font-sm'>Status:</label>
                                <select 
                                    className='font-sm' 
                                    name='status' 
                                    id='status' 
                                    value={post.status} 
                                    onChange={(e) => setPost({...post, status: e.target.value })}
                                    disabled={updateLoading} 
                                >
                                    <option value='drafted'>Drafted</option>
                                    <option value='published'>Published</option>
                                    <option value='archived'>Archived</option>
                                </select>
                                {validationMessages && <span className='font-xxs' style={{marginLeft: 'var(--spacing3)'}}>{validationMessages.status}</span>}  
                            </div>  
                            <button 
                                disabled={updateLoading} 
                                onClick={handleSave} 
                            >
                                Save
                            </button>
                        </div>
                    </>
                )}
            </main>
        )        
    );
};

export default PostEditPage;