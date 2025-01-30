
import React, { useState } from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import ContentGrid from "./ContentCard";
import BookModalWindow from "./BookModalWindow";

const Mylibrary = (props) => {
    const { books } = props;
    const [modalState, setModalState] = useState(null);

    return (
        <Authenticated 
            user={props.auth.user} 
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">本棚</h2>}
        >
            <div className="p-4">
                <ContentGrid books={books} setModalState={setModalState} />
                {modalState !== null && (
                    <BookModalWindow 
                        setShow={setModalState} 
                        myBook={books.find(item => item.id === modalState)}
                    />
                )}
            </div>
        </Authenticated>
    );
};

export default Mylibrary;