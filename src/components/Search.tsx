import { IoMdSearch } from 'react-icons/io';

export const Search = () => {
  return (
    <div className='search-wrap'>
      <div className='search-title'>
        <h2>Search. Explore. Buy.</h2>
      </div>

      <div className='search'>
        <input
          type='text'
          className='search__term'
          placeholder='What are you looking for?'
        />
        <button type='submit' className='search__button'>
          <IoMdSearch size={25} />
        </button>
      </div>
    </div>
  );
};
