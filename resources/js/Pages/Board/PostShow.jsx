import {React, useState,useEffect} from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link } from '@inertiajs/react';
import RepostModal from "./RepostModal";
import { Heart } from 'lucide-react';




const Show = (props) => {
    const { post } = props; 
    const [repostModalState,setRepostModalState] = useState(false);
    const [reposts,setReposts] = useState([]);
    const openRepostModal = () => {
        setRepostModalState(true);
    };

    const fetchReposts = async () => {
        try {
            const response = await axios.get(`/posts/${post.id}/repost`);
            console.log("取得したデータ:", response.data.reposts); // データをコンソールで確認
            setReposts(response.data.reposts);
        } catch (error) {
            console.error("投稿リストの取得エラー:", error);
        }
    };
    // 初回レンダリング時に投稿リストを取得
    useEffect(() => {
        fetchReposts();
    }, []);

    

    return (
        <Authenticated user={props.auth.user} header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    詳細表示
                </h2>
            }>
            
            <div className="p-12">
               
            <Heart />
                <div>
                    <p>{ post.body }</p>
                </div>
                <button onClick={()=>{setRepostModalState(true); console.log("ijb")}}>+</button>
                {repostModalState ? (
                    <RepostModal
                    setRepostModalState={setRepostModalState}
                    post={post}
                    refreshReposts={fetchReposts}

                    
                    // refreshBoard={fetchPosts}
                    />
                ) : <></>} 
                <div>
                    {reposts.map((repost) => (
                    <div>
                        <h1 key={repost.id}>{repost.body}</h1>
                    </div>
                    ))}
                </div>
                <Link href="/board/{post.board_id}">戻る</Link>
            </div>
            
        </Authenticated>
        );
};

export default Show;