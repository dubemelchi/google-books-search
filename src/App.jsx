import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState({ items: [] });
  const onInputChange = e => {
    setSearchTerm(e.target.value);
  };
  const [error, setError] = useState(false);
  const [loading, setloading] = useState(false);

  let API_URL = `https://www.googleapis.com/books/v1/volumes?q=<searchTerm>
`;

  const fetchBooks = async () => {
    setloading(true);
    setError(false);
    try {
      const result = await axios.get(`${API_URL}?q=${searchTerm}`);
      setBooks(result.data);
    } catch (error) {
      setError(true);
      setloading(true);
    }
    // ajax api using axios
    const result = await axios.get(`${API_URL}?q=${searchTerm}`);
    setBooks(result.data);
    // results
    console.log(result.data);
  };

  // submit handler
  const onSubmitHandler = e => {
    // prevent browser refreshing
    e.preventDefault();
    // call function
    fetchBooks();
  };

  const bookAuthors = authors => {
    if (authors.length <= 2) {
      authors = authors.join(' and ');
    } else if (authors.length > 2) {
      let lastAuthor = ' and ' + authors.slice(-1);
      authors.pop();
      authors = authors.join(', ');
      authors += lastAuthor;
    }
    return authors;
  };

  return (
    <section>
      <form onSubmit={onSubmitHandler}>
        <label>
          <span>Search for books</span>
          <input
            type='search'
            placeholder='something something'
            value={searchTerm}
            onChange={onInputChange}
            required
          />
          <button type='submt'>Search</button>
        </label>
        {error && (
          <div style={{ color: `red` }}>error occurred while fetching api</div>
        )}
      </form>
      {loading && (
        <div style={{ color: `green` }}>
          fetching books for "<strong>{searchTerm}</strong>"
        </div>
      )}
      <ul>
        {books.items.map((book, index) => {
          return (
            <li key={index}>
              <div>
                <img
                  alt={`${book.volumeInfo.title} book`}
                  src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
                />
                <div>
                  <h3>{book.volumeInfo.tite}</h3>
                  <p>{bookAuthors(books.volumeInfo.authors)}</p>
                  <p>{book.volumeInfo.publishedDate}</p>
                </div>
              </div>
              <hr />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default App;
