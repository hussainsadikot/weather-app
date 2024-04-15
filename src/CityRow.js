import React from 'react';
import { Link } from 'react-router-dom';

function CityRow({ city,id }) {
  return (
    <tr>
        <td>{id}</td>
      <td>
        <Link to={`/weather/${city.geoname_id}`}>{city.name}</Link>
      </td>
      <td>{city.country_code}</td>
      <td>{city.timezone}</td>
      {/* Render other city details as needed */}
    </tr>
  );
}

export default CityRow;
