import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DashboardPage.css';

const DashboardPage = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('http://afc7a104784594208b12c3474fa3c924-1060237241.us-east-2.elb.amazonaws.com:9002/login')
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    const filtered = data.filter((item) => {
      const includesSearch = item.field1.includes(search);
      const matchesFilter = filter === '' || item.field2 === filter;
      return includesSearch && matchesFilter;
    });

    setFilteredData(filtered);
  }, [filter, search, data]);

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="filter-bar">
        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="">All</option>
          <option value="filter1">Filter 1</option>
          <option value="filter2">Filter 2</option>
        </select>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Column 1</th>
            <th>Column 2</th>
            <th>Column 3</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.field1}</td>
              <td>{item.field2}</td>
              <td>{item.field3}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardPage;
