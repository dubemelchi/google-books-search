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

  const fetchBooks = async () => {
    // ajax api using axios
    const result = await axios.get(`${API_URL}?q=${searchTerm}`);
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
    </section>
  );
};

export default App;
