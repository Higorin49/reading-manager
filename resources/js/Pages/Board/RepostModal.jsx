import React, { useState } from 'react';

const RepostModal = ({post, refreshReposts, setRepostModalState}) => {
    const [repostBody,setRepostBody] = useState("");
    const closeModal = () => {
        setRepostModalState(false);// モーダルを閉じる
    };
    const handleSubmit = async () => {
        try {
            const response = await axios.post(`/repost`, {
                body:repostBody,
                post_id:post.id
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
                className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full"
            >
                <h2 className="font-bold mb-4">返信を作成</h2>
                <textarea
                    className="w-full h-32 p-2 border rounded-md mb-4"
                    placeholder="内容を入力してください"
                    value={repostBody}
                    onChange={(e) => setRepostBody(e.target.value)}
                ></textarea>
                <button
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4"
                >
                    投稿
                </button>
                <button
                    onClick={closeModal}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                    閉じる
                </button>
            </div>
        </div>
    );
}
export default RepostModal