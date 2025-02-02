<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Repost extends Model
{
    use HasFactory;
    
    protected $fillable = [
        "post_id",
        "user_id",
        "body",
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
    public function post(){
        return $this->belongsTo(Repost::class);
    }
    public function repostlikes(){
        return $this->hasMany(RepostLike::class);
    }
}


