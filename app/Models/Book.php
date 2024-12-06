<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    
    // fillableを追記
    protected $fillable = [
        "title",
        "author",
        "totalpage",
        "published_date",
        "check"
    ];
}
