<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
    

    protected $fillable = [
        "board_id",
        "user_id",
        "body",
        "chapter_no",
        
    ];
    public function board(){
        return $this->belongsTo(Board::class);
    }
    public function user(){
        return $this->belongsTo(User::class);
    }
    public function reposts(){
        return $this->hasMany(Repost::class);
    }
}
