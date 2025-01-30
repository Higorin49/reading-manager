import React, { useState } from 'react';
import axios from 'axios';

const RepostModal = ({ post, refreshReposts, setRepostModalState }) => {
    const [repostBody, setRepostBody] = useState("");

    const closeModal = () => {
        setRepostModalState(false);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`/repost`, {
                body: repostBody,
                post_id: post.id
            });
            refreshReposts();
            closeModal();
            console.log("投稿成功:", response.data);
        } catch (error) {
            console.error("投稿エラー:", error);
        }
    };

    return (
        <div
            id="overlay"
            onClick={closeModal}
            className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
        >
            <div
                id="content"
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full"
            >
                <h2 className="font-bold text-lg mb-4">返信を作成</h2>
                <textarea
                    className="w-full h-32 p-3 border rounded-md mb-4 focus:ring-2 focus:ring-blue-400"
                    placeholder="内容を入力してください"
                    value={repostBody}
                    onChange={(e) => setRepostBody(e.target.value)}
                ></textarea>
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                    >
                        投稿
                    </button>
                    <button
                        onClick={closeModal}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                    >
                        閉じる
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RepostModal;