<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bookimage extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        "book_id",
        "url"
    ];

    public function book(){
        return $this->belongsTo(Book::class);
    }
}
