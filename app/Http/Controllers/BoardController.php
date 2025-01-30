<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Board;
use Inertia\Inertia;
use App\Events\PostCreated;
use App\Models\Post;
use App\Models\PostLike;
use Illuminate\Support\Facades\Auth;


class BoardController extends Controller
{
    public function showBoard(Board $board,Post $post,$id){
        
        $board = Board::with("book")->find($id);
        $posts=$board->posts()->with('user','post_likes')->orderBy("created_at","desc")->get();//islikeとlikecountを追加する必要あり
       
        // dd($posts);
        $return_posts = $posts->map(function($post){
            // dd($post->postlikes);
            $like_list = $post->post_likes;

            $isLike = $like_list->filter(function($like){
                return $like["user_id"] = Auth()->user()->id;
            });
            if($isLike->isEmpty()){
                $post["isLike"] = false;
            } else{
                $post["isLike"] = true;
            }
            
            $post["LikeCount"] = $like_list->count();
            // dump($post);
            return $post;
        });

        // dd($return_posts);
        return Inertia::render("Board/Board",
            [
                "board" => $board,
                // 'posts' => $return_posts,
            ]
        );
    }

    public function sendPost(Request $request,Post $post){
        $input = $request->all();
        $input['user_id'] = auth()->user()->id;
        // dd($input);
        $post->fill($input)->save();
        // broadcast(new PostCreated($post))->toOthers();
       
        return response()->json([
            'message' => '投稿されました',
            // 'post' => $post
            'post' => $post,
        ]);
    }
     // データ取得 (API)
    public function getPosts($id,Post $post)
    {
        $board = Board::find($id);
        $posts = $board->posts()->with('user','post_likes')->orderBy("created_at","desc")->get();//ボードに紐づくポストデータを取ってくる　これにislikeとlikecountを追加する
        // dd($post);

        if (!$posts) {
            return response()->json(['error' => 'Board not found'], 404);
        }

        $return_posts = $posts->map(function($post){
            // dd($post->postlikes);
            $like_list = $post->post_likes;

            $isLike = $like_list->filter(function($like){
                return $like["user_id"] = Auth()->user()->id;
            });
            if($isLike->isEmpty()){
                $post["isLike"] = false;
            } else{
                $post["isLike"] = true;
            }
            
            $post["likeCount"] = $like_list->count();
            // dump($post);
            return $post;
        });

        $return_data = ['posts' => $return_posts];
        // dd($board->posts->sortBy("created_at","ASC"),);
        return response()->json($return_data);
    }

    public function postShow($board_id, Post $post)
    {
        return Inertia::render("Board/PostShow", ["post" => $post]);
    }

    public function postlike($post_id,PostLike $postlike){
        // dd($post_id);
        $user_id = auth()->user()->id;
        $input = ["post_id" => $post_id,'user_id' => $user_id];

        //自身がいいね済みなのか判定します
        
        $alreadyLiked = PostLike::where('user_id', $user_id)->where('post_id', $post_id)->first();

        if (!$alreadyLiked) {
            //こちらはいいねをしていない場合の処理です。つまり、post_likesテーブルに自身のid（user_id）といいねをした記事のid（post_id）を保存する処理になります。
            $postlike->fill($input)->save();
        } else {
            //すでにいいねをしていた場合は、以下のようにpost_likesテーブルからレコードを削除します。
            PostLike::where('post_id', $post_id)->where('user_id', $user_id)->delete();
        }
        //ビューにその記事のいいね数を渡すため、いいね数を計算しています。
        $post = Post::where('id', $post_id)->first();
        $likesCount = $post->likes ? $post->likes->count() : 0;

        $param = [
            'likesCount' =>  $likesCount,
        ];

        
        
        return response()->json(["masagge" => "ok"]);
    }

    public function showAllBoards(Board $board)
    {
        return Inertia::render("Board/BoardShow",["boards" => $board->get()]);
    }
    
}