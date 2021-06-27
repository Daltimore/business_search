/* eslint-disable default-case */
import React, { useState, useEffect } from 'react';
import businessList from '../businessList';

const Home = () => {
  const [searchTerm, updateSearchTerm] = useState('');
  const [filteredResults, updateFilteredResults] = useState([]);
  const [searchResults, updateSearchResults] = useState(businessList);
  const [displayResults, updateDisplayResults] = useState(false);
  const [focusIndex, updateFocusIndex] = useState(-1);
  const keys = {
      ENTER: 13,
      UP: 38,
      DOWN: 40
  };

  useEffect(() => {
    const getSearchResults = () => {
    // ⚠️ This is where you should pull data in from your server
    const searchResultsResponse = businessList;

    updateSearchResults(searchResultsResponse);
  };
   
  getSearchResults();
}, []);

const updateSearch = e => {
  updateSearchTerm(e.target.value);
  updateFilteredResults(searchResults.filter(result => result.name.match(new RegExp(e.target.value, 'gi'))))
};

const hideAutoSuggest = e => {
  e.persist();

  if (e.relatedTarget && e.relatedTarget.className === 'autosuggest-link') {
    return;
  }

  updateDisplayResults(true);
  updateFocusIndex(-1);
};

const showGoogleMap = () => {
  console.log('you will show me google maps');
}

const showAutoSuggest = () => {
  updateDisplayResults(false);
}

  const handleNavigation = e => {
    switch (e.keyCode) {
      case keys.ENTER:
        hideAutoSuggest(e);
      break;
      case keys.UP:
        if (focusIndex > -1) {
          updateFocusIndex(focusIndex - 1);
        }
      break;
      case keys.DOWN:
        if (focusIndex < filteredResults.length - 1) {
          updateFocusIndex(focusIndex + 1);
        }
      break;
    }
  };

  const SearchResults = () => {
    const Message = ({ text }) => (
      <div className="py-2">
        <h2>{text}</h2>
        <hr />
      </div>
    );

    if (!displayResults) {
        return null;
    }

    if (!searchResults.length) {
        return <Message text="Loading search results" />
    }

    if (!searchTerm) {
        return <Message text="Try to search for something..." />
    }

    if (!filteredResults.length) {
        return <Message text="We couldn't find anything for your search term." />
    }

    return (
      <ul className="search-results">
        {filteredResults.map((article, index) => (
          <li key={index}>
            {/* ⚠️ You may want to outsource this part to make the component less heavy */}
            <div className="cursor-pointer" onClick={showGoogleMap}>{article.name}</div>
          </li>
        ))}
      </ul>
    );
}

  return (
    <div className="min-h-screen h-full flex justify-center items-center">
      <section className="w-6/12">
        <h3 className="font-semibold text-3xl pb-6">Business Search</h3>
        <div className="border border-gray-300 rounded-md p-8 mb-10">
          <input
            className="px-5 py-3 w-full border border-gray-400 rounded-xl focus:outline-none"
            type="text"
            placeholder="Type to search..."
            onKeyUp={updateSearch}
            onKeyDown={handleNavigation}
            onBlur={hideAutoSuggest}
            onFocus={showAutoSuggest}
          />
          <div className="text-left my-6">
          <ul className="search-suggestions">
            {(!displayResults && searchTerm) && <li key="-1" className={focusIndex === -1 ? 'active pb-2' : null}>{`Search for ${searchTerm}`}</li>}
              {!displayResults && filteredResults.map((business, index) => (
                <div key={index}>
                  {business.name}
                </div>
              ))}
          </ul>
            <SearchResults />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home;
