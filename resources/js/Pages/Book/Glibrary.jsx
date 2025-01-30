import { React, useState } from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import BookModal from "./BookModal";
import axios from "axios";

const Index = (props) => {
    const { books } = props;

    async function addLibrary(BookId) {
        axios
            .post("/mylibrary", { book_id: BookId })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    console.log(props);
    const [search, setSearch] = useState("");
    const handleSearch = (e) => {
        setSearch(e.target.value);
        console.log("log1", search);
    };

    return (
        <Authenticated
            user={props.auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    本の一覧表示
                </h2>
            }
        >
            <div className="p-4">
                {/* 検索フォーム */}
                <div className="flex mb-4">
                    <input
                        type="text"
                        placeholder="入力してください"
                        onChange={handleSearch}
                        className="w-full p-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <a
                        href={`/books?q=${search}`}
                        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                        検索
                    </a>
                </div>

                {/* 本の一覧表示 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {books.map((book) => (
                        <div key={book.id} className="bg-white p-4 rounded-lg shadow-md">
                            <h1 className="text-lg font-bold text-gray-700">{book.title}</h1>
                            {book.bookimages.map((image) => (
                                <img
                                    src={image.url}
                                    alt="画像がないです"
                                    className="w-full h-48 object-cover mt-2 rounded-lg"
                                />
                            ))}
                            <div className="mt-4">
                                <div className="flex justify-between">
                                    <div>
                                        <h2 className="text-gray-600">{book.author}</h2>
                                        <p className="text-gray-500">{book.totalpage} ページ</p>
                                    </div>
                                    <div>
                                        {book.boards.map((board) => (
                                            <>
                                            {board.is_seacret ? <a href={`/board/${board.id}`}><button className="m-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition">ネタバレなし掲示板</button></a>:<></>}
                                            </>
                                        ))}
                                        {book.boards.map((board) => (
                                            <>
                                            {!board.is_seacret ? <a href={`/board/${board.id}`}><button className="m-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition">ネタバレあり掲示板</button></a>:<></>}
                                            </>
                                        ))}
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => addLibrary(book.id)}
                                    className="mt-2 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                                >
                                    追加する
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <BookModal />
        </Authenticated>
    );
};

export default Index;
