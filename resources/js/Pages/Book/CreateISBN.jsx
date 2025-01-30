import React, { useState, useEffect } from "react";
import { Link, useForm } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import BookScanner from "./BookScanner";

const Create = (props) => {
    const { data, setData, post } = useForm({
        isbn: "",
    });

    const Send = (e) => {
        e.preventDefault();
        post("/books/isbn");
    };

    const [camera, setCamera] = useState(true);
    const [result, setResult] = useState(null);

    const onDetected = (result) => {
        setResult(result);
        setCamera(!camera);
        window.location.href = "/scanners/" + result;
    };

    return (
        <Authenticated
            user={props.auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    ブック作成
                </h2>
            }
        >
            <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
                <form onSubmit={Send} className="space-y-4">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-700">ISBNコード</h2>
                        <input
                            type="number"
                            placeholder="コード番号"
                            value={data.isbn}
                            onChange={(e) => setData("isbn", e.target.value)}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-400"
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition"
                    >
                        送信
                    </button>
                </form>
                <section className="mt-6">
                    <div className="text-center">
                        {camera ? <BookScanner setData={setData} /> : <p className="text-gray-600">読み込み中...</p>}
                    </div>
                </section>
            </div>
        </Authenticated>
    );
};

export default Create;