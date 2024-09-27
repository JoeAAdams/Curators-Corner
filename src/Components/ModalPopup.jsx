import { useEffect, useState } from "react";

export function ModalPopup({ data, setActiveModal }) {
    const [currentImage, SetCurrentImage] = useState(0);

    useEffect(() => {
        SetCurrentImage(0);
        window.addEventListener("keydown", (event) => {
            if (event.key === "Escape") setActiveModal(null);
        });
    }, [data]);

    return (
        <>
            <div
                id="close window box"
                onClick={() => {
                    setActiveModal(null);
                }}
                className="fixed top-[0%] left-[0%] z-10 h-full w-full"
            />
            <div className="bg-white fixed p-4 w-2/3 max-h-[80%] mt-32 top-1/2 left-1/2 -mr-[50%] -translate-x-1/2 -translate-y-2/3 z-20 border-solid border-black border-2 flex flex-col">
                <div className="flex h-full items-center">
                    <img
                        className=" object-scale-down flex-grow h-[40rem] p-4"
                        src={data.images[currentImage]}
                    />
                    {currentImage < data.images.length - 1 ? (
                        <div
                            onClick={() => {
                                SetCurrentImage((x) => x + 1);
                            }}
                            className="fixed right-3 z-40"
                        >
                            {">"}
                        </div>
                    ) : null}
                    {currentImage > 0 ? (
                        <div
                            onClick={() => {
                                SetCurrentImage((x) => x - 1);
                            }}
                            className="fixed left-3"
                        >
                            {"<"}
                        </div>
                    ) : null}
                </div>
                <section className="overflow-y-auto max-h-48">
                    <h1 className="mb-6">{data.title}</h1>
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
                        Source: <a href={data.sourceLink}>{data.sourceLink}</a>
                    </p>
                </section>
            </div>
        </>
    );
}
