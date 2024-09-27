import { useEffect, useState } from "react";

import "./App.css";
import { searchMuseums } from "./Utils/api";
import { ModalPopup } from "./Components/ModalPopup";
function App() {
    const [museumData, setMuseumData] = useState([]);
    const [activeModal, setActiveModal] = useState(null);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {}, [museumData]);

    function handleSearch(event) {
        setIsLoading(true);
        searchMuseums(search).then((data) => {
            setMuseumData(data);
            setIsLoading(false);
        });
        event.preventDefault();
    }

    return (
        <>
            <div
                className={`flex items-center justify-center w-screen bg-gradient-to-b from-blue-700 to-blue-900 ${
                    museumData.length ? `h-32` : `h-screen`
                } transition-[height] ease-out delay-200`}
            >
                <form
                    className={`flex-grow-0 left-1/2 ${
                        museumData.length ? "" : "top-1/2"
                    } transition`}
                    onSubmit={handleSearch}
                >
                    <input
                        name="search"
                        onChange={(e) => setSearch(e.target.value)}
                        type="search"
                        className="border-solid border-2 border-black h-full"
                    />

                    <button
                        type="submit"
                        className="border-solid border-2 border-black"
                    >
                        Search
                    </button>
                    {isLoading && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="animate-spin"
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="white"
                                d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
                                transform="rotate(360 12 12)"
                            />
                        </svg>
                    )}
                </form>
            </div>
            {museumData.length > 0 && (
                <div className="flex flex-row justify-center flex-wrap gap-5 mt-8">
                    {museumData.map((data) => {
                        if (data.images[0]) {
                            return (
                                <div
                                    key={data.id}
                                    onClick={() => setActiveModal(data)}
                                    className="p-2 flex flex-col justify-center w-96 h-96 border-solid border-black border-2"
                                >
                                    <img
                                        src={data.images[0]}
                                        className="object-scale-down h-72 flex-grow m-2"
                                    />
                                    <p className="mt-2">{data.title}</p>
                                </div>
                            );
                        }
                    })}
                </div>
            )}

            {activeModal ? (
                <ModalPopup
                    data={activeModal}
                    setActiveModal={setActiveModal}
                />
            ) : null}
        </>
    );
}

export default App;
