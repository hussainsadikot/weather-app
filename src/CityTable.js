import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import CityRow from './CityRow'; // Import the CityRow component
import './CityTable.css'; // Import the CSS file

function CityTable() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=50&offset=${(page - 1) * 50}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        if (data.results.length === 0) {
          setHasMore(false);
        }
        setCities((prevCities) => [...prevCities, ...data.results]);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (columnName) => {
    if (sortBy === columnName) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(columnName);
      setSortDirection('asc');
    }
  };

  // Apply filter and sorting to cities
  let filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(filter.toLowerCase())
  );
  if (sortBy) {
    filteredCities = filteredCities.sort((a, b) => {
      const valueA = a[sortBy].toLowerCase();
      const valueB = b[sortBy].toLowerCase();
      if (valueA < valueB) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  if (loading && cities.length === 0) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>City Table</h2>
      <div>
        <label>
          Filter by City Name:
          <input type="text" value={filter} onChange={handleFilterChange} />
        </label>
      </div>
              <InfiniteScroll
          dataLength={filteredCities.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>No more cities to load</b>
            </p>
          }
        >
      <table className='city-table'>
        <thead>
          <tr>
            <th id='id'>SrNo.</th>
            <th onClick={() => handleSortChange('name')} className="clickable">
              City Name {sortBy === 'name' && '↑↓'[sortDirection === 'desc' ? 1 : 0]}
            </th>
            <th onClick={() => handleSortChange('country_code')} className="clickable">
              Country Code {sortBy === 'country_code' && '↑↓'[sortDirection === 'desc' ? 1 : 0]}
            </th>
            <th onClick={() => handleSortChange('timezone')} className="clickable">
              Timezone {sortBy === 'timezone' && '↑↓'[sortDirection === 'desc' ? 1 : 0]}
            </th>
          </tr>
        </thead>
        

         
            {filteredCities.map((city,index) => (
                <tbody>
              <CityRow key={city.geoname_id} city={city} id={index + 1}/>
           </tbody>
            ))}
          
        
       
      </table>
      </InfiniteScroll>
    </div>
  );
}

export default CityTable;
