import { useEffect, useState } from "react";

import museumSvg from "./svg/museum.svg";
// import arrowUp from "./svg/arrow-up.svg";

import "./App.css";

import { ModalPopup } from "./Components/ModalPopup";
import { SearchBar } from "./Components/SearchBar";
import { MuseumArt } from "./Components/MuseumArt";

function App() {
    const [museumData, setMuseumData] = useState([]);
    const [activeModal, setActiveModal] = useState(null);
    const [viewPersonalExhibits, setViewPersonalExhibits] = useState(false);
    const [personalExhibits, setPersonalExhibits] = useState([]);
    const [searched, setSearched] = useState(false);

    useEffect(() => {}, [museumData, viewPersonalExhibits]);

    return (
        <>
            <nav>
                <SearchBar
                    setMuseumData={setMuseumData}
                    setViewPersonalExhibits={setViewPersonalExhibits}
                    setSearched={setSearched}
                    searched={searched}
                />
            </nav>
            <main >
                {viewPersonalExhibits && (
                    <h1 className="w-full text-center text-6xl mt-6 underline">
                        Personal Exhibits
                    </h1>
                )}
                {searched && (
                    <button
                        id="PersonalGallery"
                        className="absolute z-10 bg-white rounded-xl top-36 right-4 border-black border-solid border-2 flex  flex-col justify-center align-middle  lg:right-6"
                        onClick={() =>
                            setViewPersonalExhibits(!viewPersonalExhibits)
                        }
                    >
                        <img
                            src={museumSvg}
                            height="64"
                            width="64"
                            alt="personal gallery"
                        />
                    </button>
                )}

                {searched && (
                    <MuseumArt
                        museumData={
                            viewPersonalExhibits ? personalExhibits : museumData
                        }
                        setActiveModal={setActiveModal}
                    />
                )}

                {activeModal && (
                    <ModalPopup
                        data={activeModal}
                        setActiveModal={setActiveModal}
                        setPersonalExhibits={setPersonalExhibits}
                        showAddButton={!viewPersonalExhibits}
                    />
                )}

                {/* TO DO  */}
                {/* {museumData.length > 0 && window.scrollY > 1 && (
                <button
                    id="PersonalGallery"
                    className="fixed z-10 bg-white rounded-xl mt-2 right-4 bottom-4 border-black border-solid border-2 flex  flex-col justify-center align-middle lg:mt-6 lg:right-6"
                    onClick={() => {
                        window.scrollTo(0, 0);
                    }}
                >
                    <img src={arrowUp} height="64" width="64" />
                </button>
            )} */}
            </main>
        </>
    );
}

export default App;
