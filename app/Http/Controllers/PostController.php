<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Repost;

class PostController extends Controller
{
    public function storeRepost(Request $request,Repost $repost){
        $input = $request->all();
        // dd($input);
        $input['user_id'] = auth()->user()->id;
        $repost->fill($input)->save();

        return response()->json([
            'message' => '投稿されました',
            // 'post' => $post
            'repost' => $repost,
        ]);
    }
    public function getRepost(Post $post)
    {
        // dd($id);
        $reposts = $post->reposts()->with("user")->orderBy("created_at","desc")->get();
        return response()->json([
            'reposts' => $reposts
        ]);

    }
        
}
