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
        event.preventDefault();
    }

    return (
        <div
            className={`shadow-lg border-b-2 border-black flex flex-col items-center justify-center w-screen bg-gradient-to-tr from-blue-700 to-purple-900 via-purple-600  ${
                searched ? `h-32` : `h-screen`
            } transition-[height] ease-out delay-200`}
        >
            <h1
                className={`text-8xl bottom-20 ${
                    searched && !isLoading ? `hidden` : `relative`
                } transition-opacity ease-in delay-100 `}
            >
                Curators Corner
            </h1>

            <form
                className={`align-middle flex flex-grow-0 flex-col gap-2 w-screen lg:w-auto p-2 lg:p-0`}
                onSubmit={handleSearch}
            >
                {isLoading && (
                    <img className="animate-spin fixed" src={spinner} />
                )}
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
                            type="number"
                            onKeyUp={(e) => {
                                !/([0-9]|Backspace|Tab|ArrowLeft|ArrowRight)/.test(
                                    e.key
                                )
                                    ? e.preventDefault()
                                    : setCreatedAfter(e.target.value);
                            }}
                            onSubmit={(e) => setCreatedAfter(e.target.value)}
                            className="pl-2 lr-2 w-1/2 rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                    </div>
                    <div className="flex flex-col justify-center align-middle content-center">
                        <p>Created before</p>

                        <input
                            aria-label="Created before date"
                            name="createdBefore"
                            placeholder={new Date().getFullYear() + 1}
                            type="number"
                            onKeyUp={(e) => {
                                !/([0-9]|Backspace|Tab|ArrowLeft|ArrowRight)/.test(
                                    e.key
                                )
                                    ? e.preventDefault()
                                    : setCreatedBefore(e.target.value);
                            }}
                            onSubmit={(e) => setCreatedBefore(e.target.value)}
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
            </form>
        </div>
    );
}
