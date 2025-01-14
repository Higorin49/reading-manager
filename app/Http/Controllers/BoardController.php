<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Board;
use Inertia\Inertia;
use App\Events\PostCreated;
use App\Models\Post;

class BoardController extends Controller
{
    public function showBoard(Board $board,$id){
        // dump($board);
        $board = Board::with("book")->find($id);
        $posts=$board->posts()->orderBy("created_at","desc")->get();
        // dd($posts);
        // dd($board->book);
        return Inertia::render("Board/Board",
        ["board" => $board,
         'posts' => $posts,
        ]);
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
    public function getPosts($id)
    {
        $posts = Board::find($id)->posts()->orderBy("created_at","desc")->get();
        // dd($board);
        if (!$posts) {
            return response()->json(['error' => 'Board not found'], 404);
        }
        // dd($board->posts->sortBy("created_at","ASC"),);
        return response()->json([
            'posts' => $posts
        ]);
    }
    public function postShow($board_id, Post $post)
    {
        return Inertia::render("Board/PostShow", ["post" => $post]);
    }
}
