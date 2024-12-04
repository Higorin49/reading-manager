<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Inertia\Inertia;

class BookController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'nullable|string|max:255',
           
            'published_date' => 'nullable|date',
        ]);
    }
    public function create()
    {
        return Inertia::render('Book/Create');
    }
    
}
