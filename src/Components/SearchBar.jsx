import { useState } from "react";
import spinner from "../svg/spinner.svg";
import { searchMuseums } from "../Utils/api";

export function SearchBar({
    setMuseumData,
    setViewPersonalExhibits,
    setSearched,
    searched,
}) {
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [createdBefore, setCreatedBefore] = useState(
        new Date().getFullYear() + 1
    );
    const [createdAfter, setCreatedAfter] = useState(0);

    function handleSearch(event) {
        event.preventDefault();
        setIsLoading(true);
        searchMuseums(search, createdBefore, createdAfter).then((data) => {
            setViewPersonalExhibits(false);
            setMuseumData(data);
            setIsLoading(false);
            setSearched(true);
        });
    }

    function handleChange(event) {
        console.log(event.target.value);
        if (!/^\d+$/.test(event.target.value)) console.log("oops");
    }

    return (
        <div
            className={`shadow-lg border-b-2 border-black flex flex-col items-center pt-3 justify-center w-screen bg-[url('https://openaccess-cdn.clevelandart.org/alternate/1961.39/1961.39_alt0_web.jpg')] bg-cover ${
                searched ? `h-40` : `h-screen`
            } transition-[height] ease-out delay-200`}
        >
            <div
                className={`${
                    !searched &&
                    "border-black border-2 p-5 bg-gray-300 bg-opacity-50"
                } w-screen lg:w-auto flex flex-col items-center`}
            >
                <h1
                    className={`drop-shadow-[1.2px_1.2px_1.2px_rgba(255,255,255,1)] text-4xl pt-2 lg:text-8xl md:text-7xl bottom-5 ${
                        searched ? `hidden` : `relative`
                    } transition-opacity ease-in delay-100 `}
                >
                    Curators Corner
                </h1>
                {!searched && (
                    <p
                        className={`lg:w-1/2 md:w-2/3 p-5 sm:w-3/4 mb-5 drop-shadow-[0_0_2.5px_rgb(255,255,255)] ${
                            searched && !isLoading ? `hidden` : `relative`
                        } transition-opacity ease-in delay-100`}
                    >
                        Welcome to Curators Corner. Here you can search for
                        images stored within the Harvard University and
                        Cleveland art museum archives to add to your own
                        personal exhibit
                    </p>
                )}

                <form
                    className={` align-middle flex flex-col gap-2 w-screen lg:w-auto p-2 lg:p-0`}
                    onSubmit={handleSearch}
                >
                    <input
                        aria-label="search museums"
                        name="search"
                        onChange={(e) => setSearch(e.target.value)}
                        type="search"
                        autoComplete="false"
                        autoFocus={true}
                        placeholder="Search name or relative information"
                        className="border-solid border-2 border-black h-full pl-2 lr-2"
                    />
                    <div className="flex flex-row">
                        <div className="flex flex-col">
                            <p>Created After</p>

                            <input
                                aria-label="Created after date"
                                name="createdAfter"
                                placeholder={0}
                                type="tel"
                                value={createdAfter}
                                onChange={(event) => {
                                    if (
                                        /^\d+$/.test(event.target.value) ||
                                        event.target.value === ""
                                    )
                                        setCreatedAfter(event.target.value);
                                }}
                                className="pl-2 lr-2 w-1/2 rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                        </div>
                        <div className="flex flex-col justify-center align-middle content-center">
                            <p>Created before</p>

                            <input
                                aria-label="Created before date"
                                name="createdBefore"
                                placeholder={new Date().getFullYear() + 1}
                                type="tel"
                                value={createdBefore}
                                onChange={(event) => {
                                    if (
                                        /^\d+$/.test(event.target.value) ||
                                        event.target.value === ""
                                    )
                                        setCreatedBefore(event.target.value);
                                }}
                                className="w-1/2 pl-2 lr-2 rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="border-solid border-2 border-black bg-white"
                    >
                        Search
                    </button>
                    <p
                        className={`relative mb-1 w-full flex flex-row gap-2 ${
                            !isLoading && "invisible"
                        }`}
                    >
                        Searching...
                        <img
                            src={spinner}
                            className="animate-spin"
                            height={"15"}
                            width={"15"}
                        />
                    </p>
                </form>
            </div>
        </div>
    );
}
