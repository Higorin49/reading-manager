<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use App\Models\Mybook;
use Inertia\Inertia;
use App\Models\Board;


class BookController extends Controller
{
    public function store(Request $request, Book $book)
    {
        
        $input = $request->all();
        $input['check'] = true;
        // dd($input);
        $book->fill($input)->save();
        $board_input = ["is_seacret" => true,"book_id" => $book["id"]];
        $board = Board::create($board_input);
        $board_input = ["is_seacret" => false,"book_id" => $book["id"]];
        $board = Board::create($board_input);
        
        return redirect("/books/create" );
        // $validated = $request->validate([
        //     'title' => 'required|string|max:255',
        //     'author' => 'nullable|string|max:255',
        //     'published_date' => 'nullable|date',
        // ]);
    }
    public function create()
    {
        
        return Inertia::render('Book/Create');
    }
    public function index(Book $book)
    {
        return Inertia::render("Book/Glibrary",["books" => $book->get()]);
    }
    public function addmylibrary(Request $request)
    {
        //  dd(auth()->user()->id);
        $book = Mybook::firstOrCreate(
            ['book_id' => $request['book_id'],'user_id' => auth()->user()->id],
            ['currentpage' => 0]
        );
        // dd($book);
        return response()->json(["addlibrary"=>$book]);
    }
    public function showMylibrary(Mybook $mybook)
    {
        // $mybooks = $mybook->where('user_id', "=" ,auth()->user()->id)->load('book');
        // $mybooks = Mybook::with(["book" => function($query){
        //     $query->where('user_id', "=" ,auth()->user()->id);
        // }])->get();
        $mybooks = Mybook::with('book.boards')->where('user_id',auth()->user()->id)->get();
        
        return Inertia::render("Book/Mylibrary",['books' => $mybooks]);

    }
    public function myModal(){
        $mybooks = Mybook::with('book','book.board')->where('user_id',auth()->user()->id)->get();

        return Inertia::render("Book/BookModalMain",['books' => $mybooks,]);
    }

    public function addPage(Request $request)
    {
    //    dd($request["page"]);
        // 本のデータを更新
        $book = Mybook::with("book.boards")->where('book_id',  $request["bookId"])->where('user_id', auth()->user()->id)->first();
        $book->currentpage = $request["page"];
        $book->save();
        $mybooks = Mybook::with('book')->where('user_id',auth()->user()->id)->get();

        return response()->json([
            'message' => 'ページ数が更新されました。',
            'book' => $book,
            'mybooks' => $mybooks,
        ]);
    }
}
