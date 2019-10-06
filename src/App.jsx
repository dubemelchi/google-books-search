import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const onInputChange = e => {
    setSearchTerm(e.target.value);
  };

  let API_URL = `https://www.googleapis.com/books/v1/volumes?q=<searchTerm>
`;

  const [books, setBooks] = useState({ items: [] });

  const fetchBooks = async () => {
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
          />
          <button type='submt'>Search</button>
        </label>
      </form>
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
