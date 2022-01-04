//React Library
import React, { useState, useEffect, } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { urls } from 'DATABASE';
import 'assets/css/home.css';
import SideBar from 'components/navbar/SideBar';
import PostCard from 'components/card/MaterialUICard';
import MaterialCard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Comment from 'components/comment';
import CommentForm from 'components/commentForm';
import { getPostComments, sendCommentBackend } from 'store/actions/communityAction';
import { useDispatch, useSelector } from 'react-redux';

const Comments = (post) => {
    const [isLoaded, setIsLoaded] = useState(false);
    var tek_post = post["location"]["state"]["post"];
    console.log(tek_post);
    const dispatch = useDispatch();
    const { postComments } = useSelector(state => state.community)
    console.log('postComments: ', postComments);

    useEffect(() => {
        async function fetchMyAPI() {
            let response = await dispatch(getPostComments(tek_post["id"]));
            console.log("response", response);
            setIsLoaded(true);
        }
        fetchMyAPI()
    }, [])

    console.log('postComments: ', postComments);
    console.log("Comments", postComments?.["Comments"]);
    console.log("Post", postComments?.["Post"]);

    const [activeComment, setActiveComment] = useState(null);
    const rootComments = postComments?.["Comments"]?.filter(
        (singleComment) => singleComment.replied_comment === null
    );
    console.log("rootComments", rootComments);
    console.log(new Date());
    console.log(new Date().toLocaleString('tr-TR'));

    function createComment(text, replied_comment = null) {
        let max_id = 0;
        for (let i = 0; i < postComments?.["Comments"].length; i++) {
            if (postComments?.["Comments"][i]["id"] > max_id) {
                max_id = postComments?.["Comments"][i]["id"];
            }
        }
        if(replied_comment == null) {
            return {
                post: postComments?.["Post"]["id"],
                body: text
            }; 
        }
        return {
            post: postComments?.["Post"]["id"],
            replied_comment,
            body: text
        };
    };
    const getReplies = (commentId) =>
        postComments?.["Comments"]
            .filter((singleComment) => singleComment.replied_comment === commentId)
            .sort(
                (a, b) =>
                    new Date(a.created_date).getTime() - new Date(b.created_date).getTime()
            );
    async function addCommentBackend(text, replied_comment) {
        var comment = createComment(text, replied_comment);
        console.log("comm:", comment);
        await dispatch(sendCommentBackend(comment));
        dispatch(getPostComments(tek_post["id"]));
    }

    return (
        isLoaded ?
            <>
                <div>
                    <SideBar />
                </div>

                <PostCard posts={postComments?.["Post"]} />

                <MaterialCard sx={{ maxWidth: 900, margin: 'auto', backgroundColor: 'Lavender' }}>
                    <CardContent>
                        <h1>Comments</h1>

                        <CommentForm handleSubmit={addCommentBackend} />
                        {rootComments?.map((rootComment) => (
                            <Comment
                                key={rootComment.id}
                                comment={rootComment}
                                replies={getReplies(rootComment.id)}
                                addCommentBackend={addCommentBackend}
                                activeComment={activeComment}
                                setActiveComment={setActiveComment}
                            />
                        ))}
                    </CardContent>
                </MaterialCard >
            </>
            :
            <>
                <p>Comments are Loading!</p>
            </>
    );
};

export default Comments;
