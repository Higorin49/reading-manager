import { React, useState, useEffect } from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import RepostModal from "./RepostModal";
import { Heart } from "lucide-react";
import axios from "axios";

const Show = (props) => {
    const { post } = props;
    const [repostModalState, setRepostModalState] = useState(false);
    const [reposts, setReposts] = useState([]);

    const fetchReposts = async () => {
        try {
            const response = await axios.get(`/posts/${post.id}/repost`);
            console.log("取得したデータ:", response.data.reposts);
            setReposts(response.data.reposts);
        } catch (error) {
            console.error("投稿リストの取得エラー:", error);
        }
    };

    useEffect(() => {
        fetchReposts();
    }, []);

    return (
        <Authenticated
            user={props.auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    詳細表示
                </h2>
            }
        >
            <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                    <Heart className="text-red-500" />
                    <button
                        onClick={() => setRepostModalState(true)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    >
                        + リポスト
                    </button>
                </div>
                <div className="mb-6">
                    <p className="text-gray-700">{post.body}</p>
                </div>
                {repostModalState && (
                    <RepostModal
                        setRepostModalState={setRepostModalState}
                        post={post}
                        refreshReposts={fetchReposts}
                    />
                )}
                <div className="mt-6">
                    {reposts.map((repost) => (
                        <div key={repost.id} className="p-4 bg-gray-100 rounded-lg shadow-sm mb-2">
                            <h1 className="text-gray-800">{repost.body}</h1>
                        </div>
                    ))}
                </div>
                <Link
                    href={`/board/${post.board_id}`}
                    className="block mt-6 text-blue-500 hover:underline"
                >
                    戻る
                </Link>
            </div>
        </Authenticated>
    );
};

export default Show;