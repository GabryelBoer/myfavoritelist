import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiCameraMovie, BiSearchAlt2 } from 'react-icons/bi';

import './Navbar.css';

const Navbar = () => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!search) {
      {status == true ? setStatus(false) : setStatus(true)}
      return
    }

    navigate(`/search?q=${search}`);
    setSearch('');
    setStatus(false)
  };

  return (
    <nav id="navbar">
      <h2>
        <Link to="/" onClick={() => setStatus(false)}>
          <BiCameraMovie />
          <p>MyFavoriteList</p>
        </Link>
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          className={status == true ? 'active' : ''}
          type="text"
          placeholder="Busque um filme"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <button type="submit">
          <BiSearchAlt2 />
        </button>
      </form>
    </nav>
  );
};

export default Navbar;
