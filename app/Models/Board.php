<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Board extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $fillable = [
        "book_id",
        "is_seacret",
        "user_id"
    ];

    public function book(){
        return $this->belongsTo(Book::class);
    }
    public function posts(){
        return $this->hasMany(Post::class);
    }
}
