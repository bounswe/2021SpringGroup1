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

const Comments = (post) => {
    // console.log(post);
    var tek_post = post["location"]["state"]["post"];
    console.log(tek_post);

    var comments = [
        { username: "gktpgktp", body: "hoşgeldin deneme", createdAt: new Date("01.01.2022 01:40:21").toLocaleString('tr-TR'), parentId: null, avatar: "", id: 0, userId: tek_post["poster"] },
        { username: "gktpgktp", body: "hoşgeldin deneme", createdAt: new Date("01.01.2022 02:40:21").toLocaleString('tr-TR'), parentId: null, avatar: "", id: 1, userId: tek_post["poster"] },
        { username: "gktpgktp", body: "hoşgeldin deneme", createdAt: new Date("02.01.2022 03:40:21").toLocaleString('tr-TR'), parentId: null, avatar: "", id: 2, userId: tek_post["poster"] },
        { username: "gktpgktp", body: "hoşgeldin deneme", createdAt: new Date("02.01.2022 04:40:21").toLocaleString('tr-TR'), parentId: 0, avatar: "", id: 3, userId: tek_post["poster"] },
        { username: "gktpgktp", body: "hoşgeldin deneme", createdAt: new Date("03.01.2022 04:40:21").toLocaleString('tr-TR'), parentId: null, avatar: "", id: 4, userId: tek_post["poster"] }];

    const [allComments, setAllComments] = useState(comments);
    const [activeComment, setActiveComment] = useState(null);
    const rootComments = allComments.filter(
        (singleComment) => singleComment.parentId === null
    );
    console.log(rootComments);
    console.log(new Date());
    console.log(new Date().toLocaleString('tr-TR'));

    const createComment = async (text, parentId = null) => {
        let max_id = 0;
        for (let i = 0; i < allComments.length; i++) {
            if (allComments[i]["id"] > max_id) {
                max_id = allComments[i]["id"];
            }
        }
        return {
            username: tek_post["poster_name"],
            body: text,
            createdAt: new Date().toLocaleString('tr-TR'),
            parentId,
            avatar: "",
            id: max_id + 1,
            userId: tek_post["poster"]
        };
    };
    const getReplies = (commentId) =>
        allComments
            .filter((singleComment) => singleComment.parentId === commentId)
            .sort(
                (a, b) =>
                    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
    const addComment = (text, parentId) => {
        createComment(text, parentId).then((comment) => {
            setAllComments([comment, ...allComments]);
            setActiveComment(null);
            // allComments
            //     .filter((singleComment) => singleComment.parentId === null)
            //     .sort(
            //         (a, b) =>
            //             new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            //     );

        });
    };
    console.log(allComments);

    return (
        <>
            <div>
                <SideBar />
            </div>

            <PostCard posts={tek_post} />

            <MaterialCard sx={{ maxWidth: 900, margin: 'auto', backgroundColor: 'Lavender' }}>
                <CardContent>
                    <h1>Comments</h1>

                    <CommentForm handleSubmit={addComment} />
                    {rootComments.map((rootComment) => (
                        <Comment
                            key={rootComment.id}
                            comment={rootComment}
                            replies={getReplies(rootComment.id)}
                            addComment={addComment}
                            activeComment={activeComment}
                            setActiveComment={setActiveComment}
                            currentUserId={tek_post["poster"]}
                        />
                    ))}
                </CardContent>
            </MaterialCard >
        </>
    );
};

export default Comments;
