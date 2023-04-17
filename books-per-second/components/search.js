import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";

//TODO: Add a search by genre button or like a suggestions prompt
const Search = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [startIndex, setStartIndex] = useState(0);

  const url = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&startIndex=${startIndex}&filter=partial`;

  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      const data = response.data.items;
      const bookData = data
        .filter((book) => book.accessInfo.embeddable)
        .filter(
          (book) =>
            book.volumeInfo.industryIdentifiers &&
            book.volumeInfo.industryIdentifiers[0].type === "ISBN_13"
        )
        .map((book) => {
          return {
            title: book.volumeInfo.title,
            isbn: book.volumeInfo.industryIdentifiers[0].identifier,
            thumbnail: book.volumeInfo.imageLinks
              ? book.volumeInfo.imageLinks.thumbnail
              : "https://via.placeholder.com/150x200?text=No+Thumbnail",
          };
        });
      setBooks([...books, ...bookData]); //* appends to the existing array of books
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setStartIndex(0);
    setBooks([]); // Clearing the books array
    fetchData();
  };

  const handleLoadMore = () => {
    setStartIndex(startIndex + 10);
    fetchData();
  };
  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
    setStartIndex(0);
    setBooks([]); // Clearing the books array
  };

  return (
    <div className="flex flex-col justify-center items-center ">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row justify-center items-center mt-48">
          <input
            value={searchQuery}
            onChange={handleSearchQueryChange}
            autoComplete="off"
            className=" lg:text-4xl md:text-3xl sm:text-2xl text-xl xl:w-[1200px] lg:w-[600px] md:w-[500px] sm:w-96 w-56 py-3 border-black placeholder:text-black px-3 rounded-full border-4"
            placeholder="Search for books"
            type="text"
          ></input>
          <div className="flex bg-black rounded-full  h-16 self-center pr-[2px] pl-[4px] group hover:scale-105 hover:pb-1 cursor-pointer mx-1">
            <button
              type="submit"
              className="font-bold  font-Lato text-xl transition ease-in-out duration-100 bg-black rounded-full h-14 self-center text-white px-6 group-hover:text-black  group-hover:bg-white"
            >
              Search
            </button>
          </div>
        </div>
      </form>
      <h1 className="hover:scale-105 select-none mt-16 font-Lato text-2xl lg:text-7xl md:text-5xl sm:text-5xl">
        Have a good read ⸂⸂⸜(രᴗര๑)⸝⸃⸃
      </h1>
      <div>
        <ul>
          {books.map((book, index) => (
            <li key={index}>
              <strong>Title:</strong>{" "}
              <Link
                href={{
                  pathname: `/preview/[isbn]`,
                  query: { isbn: book.isbn },
                }}
              >
                {book.title}
              </Link>
              , <strong>ISBN:</strong> {book.isbn}
              <br />
              <img src={book.thumbnail} alt={`Thumbnail for ${book.title}`} />
            </li>
          ))}
        </ul>
        {books.length > 0 && (
          <button onClick={handleLoadMore}>Load more</button>
        )}
      </div>
    </div>
  );
};

export default Search;
