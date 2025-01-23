<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\BookController;
use App\Http\Controllers\BoardController;
use App\Http\Controllers\PostController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
    Route::post('/books', [BookController::class, 'store']);
    Route::get('/books/create', [BookController::class, 'create'])->name('book.create');
    Route::get("/books", [BookController::class, "index"])->name('books');
    Route::post('/mylibrary', [BookController::class, 'addmylibrary']);
    Route::get('/mylibrary', [BookController::class, 'showMylibrary'])->name('mylibrary');
    Route::get('/mymodal', [BookController::class, 'myModal'])->name('mymodal');
    Route::post('/addpage',[BookController::class, 'addPage'])->name('addpage');
    Route::get("/board/{id}",[BoardController::class,"showBoard"]);
    Route::post("/board", [BoardController::class, "sendPost"]);
    Route::get('/api/board/{id}/posts', [BoardController::class, 'getPosts']);
    Route::get('/board/{board_id}/post/{post}', [BoardController::class, 'postShow']);
    Route::post('/repost',[PostController::class,"storeRepost"]);
    Route::get('/posts/{post}/repost',[PostController::class,"getRepost"]);
    Route::post('/books/isbn',[BookController::class, 'storeisbn']);
    Route::get('/books/createisbn', [BookController::class, 'createisbn'])->name('createisbn');
});

require __DIR__.'/auth.php';
