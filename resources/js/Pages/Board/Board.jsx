import { React, useState, useEffect } from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import PostModal from './PostModal';
import axios from 'axios';
import { Link } from '@inertiajs/react';

const Board = (props) => {
    const { board } = props;
    console.log(board);
    const [createModalState, setCreateModalState] = useState(false);
    const [posts, setPosts] = useState([]);
    // 投稿リストを取得する関数
    const fetchPosts = async () => {
        try {
            const response = await axios.get(`/api/board/${board.id}/posts`);
            console.log("取得したデータ:", response.data.posts); // データをコンソールで確認
            setPosts(response.data.posts);
        } catch (error) {
            console.error("投稿リストの取得エラー:", error);
        }
    };
    // 初回レンダリング時に投稿リストを取得
    useEffect(() => {
        fetchPosts();
    }, []);
    const createPostModal = () => {
        setCreateModalState(true);
    };
    return (
        <Authenticated user={props.auth.user} header={
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                {board.book.title}の掲示板
            </h2>
        }>
            <button onClick={createPostModal}>+</button>
            {createModalState ? (
                <PostModal
                    setPost={setCreateModalState}
                    bookdata={board.book.title}
                    board={board}
                    refreshBoard={fetchPosts} // 投稿後にリストを更新
                />
            ) : null}
            <div>
                {posts.map((post) => (
                    <div>
                        <Link href={`/board/${board.id}/post/${post.id}`}><h3 key={post.id}>{post.body}</h3></Link>
                    </div>
                ))}
            </div>
        </Authenticated>
    );
};
export default Board;