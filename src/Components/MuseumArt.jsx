export function MuseumArt({ museumData, setActiveModal }) {
    return (
        <>
            {museumData.length > 0 ? (
                <div className="flex flex-row justify-center flex-wrap gap-5 mt-8">
                    {museumData.map((data) => {
                        if (data.images[0]) {
                            return (
                                <div
                                    key={data.id}
                                    onClick={() => setActiveModal(data)}
                                    className="p-2 flex flex-col justify-center w-96 h-96 shadow-md shadow-black rounded-md"
                                >
                                    <img
                                        src={data.images[0]}
                                        className="object-scale-down h-72 flex-grow m-2"
                                        alt={data.title}
                                    />
                                    <p className="mt-2 truncate text-lg">
                                        {data.title}
                                    </p>
                                </div>
                            );
                        }
                    })}
                </div>
            ) : (
                <p className="absolute bottom-1/2 w-full text-center text-3xl lg:text-5xl">
                    Sorry, no exhibits found
                </p>
            )}
        </>
    );
}
