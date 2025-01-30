import { React, useState, useEffect } from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import PostModal from "./PostModal";
import axios from "axios";
import { Link } from "@inertiajs/react";
import { Heart } from "lucide-react";

const Board = (props) => {
    const { board } = props;
    console.log(board);
    const [createModalState, setCreateModalState] = useState(false);
    const [posts, setPosts] = useState([]);

    // 投稿リストを取得する関数
    const fetchPosts = async () => {
        try {
            const response = await axios.get(`/api/board/${board.id}/posts`);
            console.log("取得したデータ:", response.data.posts);
            setPosts(response.data.posts);
        } catch (error) {
            console.error("投稿リストの取得エラー:", error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const createPostModal = () => {
        setCreateModalState(true);
    };

    const clickLike = async (post) => {
        axios
            .post(`/post/like/${post.id}`)
            .then((res) => {
                console.log(res.data);
                fetchPosts();
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <Authenticated
            user={props.auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {board.book.title}の掲示板{board.is_seacret ? "（ネタバレなし）" : "（ネタバレあり）"}
                </h2>
            }
        >
            <div className="p-4">
                <button
                    onClick={createPostModal}
                    className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                    + 投稿する
                </button>
                {createModalState && (
                    <PostModal
                        setPost={setCreateModalState}
                        bookdata={board.book.title}
                        board={board}
                        refreshBoard={fetchPosts}
                    />
                )}
                <div className="grid gap-4">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-white p-4 rounded-lg shadow-md">
                            <Link href={`/board/${board.id}/post/${post.id}`}>
                                <h3 className="text-lg font-semibold text-gray-700">{post.body}</h3>
                            </Link>
                            <button onClick={() => clickLike(post)} className="mt-2 flex items-center gap-2">
                                <Heart color={post.isLike ? "#ff0000" : "#787878"} />
                                <p className="text-gray-600">{post.likeCount}</p>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </Authenticated>
    );
};

export default Board;
