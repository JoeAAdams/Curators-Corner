import { useEffect, useState } from "react";
import galleryIcon from "../svg/gallery.svg";
import arrowLeft from "../svg/arrow-left.svg";
import arrowRight from "../svg/arrow-right.svg";
import cross from "../svg/cross.svg";
import remove from "../svg/remove.svg";

export function ModalPopup({
    data,
    setActiveModal,
    setPersonalExhibits,
    showAddButton,
}) {
    const [currentImage, SetCurrentImage] = useState(0);

    useEffect(() => {
        SetCurrentImage(0);
        window.addEventListener("keydown", (event) => {
            if (event.key === "Escape") setActiveModal(null);
        });
    }, [data]);

    function handleAddToPersonal() {
        let duplicate = false;
        setPersonalExhibits((personalExhibits) => {
            personalExhibits.forEach((exhibit) => {
                if (exhibit === data) duplicate = true;
            });
            return !duplicate ? [...personalExhibits, data] : personalExhibits;
        });
    }

    function handleRemoveFromPersonal() {
        setPersonalExhibits((personalExhibits) => {
            const newPeronsalExhibits = personalExhibits.filter(
                (exhibit) => exhibit !== data
            );
            return newPeronsalExhibits;
        });
    }

    return (
        <>
            <div
                id="close window box"
                tabIndex="-1"
                onClick={() => {
                    setActiveModal(null);
                }}
                className="fixed top-[0%] left-[0%] z-20 h-full w-full"
            />
            <div className="bg-white rounded-md fixed p-4 w-full h-[80%] lg:w-2/3 lg:h-auto lg:max-h-[80%] mt-32 top-1/2 left-1/2 -mr-[50%] -translate-x-1/2 -translate-y-2/3 z-30 border-solid border-black border-2 flex flex-col shadow-xl">
                <button
                    aria-label="close window"
                    onClick={() => {
                        setActiveModal(null);
                    }}
                    className="absolute h-10 w-10 rounded-full cursor-pointer right-2 top-2 lg:right-4 lg:top-4 bg-gray-300 hover:bg-gray-400 bg-opacity-30 transition-colors ease-in-out delay-100"
                >
                    <img
                        src={cross}
                        height={"48"}
                        width={"48"}
                        alt="close box"
                    ></img>
                </button>
                <div className="flex items-center">
                    <img
                        className=" object-scale-down max-h-96 flex-grow p-4"
                        src={data.images[currentImage]}
                        alt={data.title}
                    />
                    {currentImage < data.images.length - 1 ? (
                        <img
                            onClick={() => {
                                SetCurrentImage((x) => x + 1);
                            }}
                            className="fixed right-3 z-50 cursor-pointer bg-gray-300  rounded-full hover:bg-gray-400 bg-opacity-30 transition-colors ease-in-out delay-100"
                            src={arrowRight}
                            height="32"
                            width="32"
                            alt="next image"
                        />
                    ) : null}
                    {currentImage > 0 ? (
                        <img
                            onClick={() => {
                                SetCurrentImage((x) => x - 1);
                            }}
                            className="fixed left-3 z-50 cursor-pointer bg-gray-300  rounded-full hover:bg-gray-400 bg-opacity-30 transition-colors ease-in-out delay-100"
                            src={arrowLeft}
                            height="32"
                            width="32"
                            alt="previous image"
                        />
                    ) : null}
                </div>
                <section className="overflow-y-auto max-h-96 ">
                    <div className="flex">
                        <h1 className="mb-6 text-3xl underline flex-grow">
                            {data.title}
                        </h1>
                        <h2>{`Date of creation: ${data.creationDateEarliest} ${
                            data.creationDateEarliest !==
                            data.creationDateLatest
                                ? `- ${data.creationDateLatest}`
                                : ""
                        }`}</h2>
                    </div>
                    {data.description ? (
                        <p className="">{data.description}</p>
                    ) : (
                        <em>No description provided</em>
                    )}

                    <p className="mt-4">
                        {"Artist(s): "}
                        {data.artists}
                    </p>
                    <p className="mt-4">
                        Source:{" "}
                        <a className="underline" href={data.sourceLink}>
                            {data.sourceLink}
                        </a>
                    </p>
                </section>
                <div className="w-full flex flex-row-reverse">
                    {showAddButton ? (
                        <label
                            className="relative mt-2 flex gap-3 "
                            htmlFor="addToPersonal"
                        >
                            Add to personal gallery
                            <button
                                id="addToPersonal"
                                onClick={handleAddToPersonal}
                                className="active:animate-buttonBounce"
                            >
                                <img
                                    src={galleryIcon}
                                    alt="add to personal exhibit"
                                    height={"32"}
                                    width={"32"}
                                />
                            </button>
                        </label>
                    ) : (
                        <label
                            className="relative mt-2 flex gap-3 "
                            htmlFor="removeFromPersonal"
                        >
                            Remove from personal exhibit
                            <button
                                className="active:animate-buttonBounce"
                                id="removeFromPersonal"
                                onClick={handleRemoveFromPersonal}
                            >
                                <img
                                    src={remove}
                                    alt="add to personal exhibit"
                                    height={"32"}
                                    width={"32"}
                                />
                            </button>
                        </label>
                    )}
                </div>
            </div>
        </>
    );
}
