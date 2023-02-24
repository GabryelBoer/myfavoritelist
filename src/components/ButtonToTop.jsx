import { useState } from 'react';
import { FaAngleUp } from 'react-icons/fa';
import './ButtonToTop.css';

const ButtonToTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 6000) {
      setVisible(true);
    } else if (scrolled <= 6000) {
      setVisible(false);
    }
  };

  const handleOnClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  window.addEventListener('scroll', toggleVisible);

  return (
    <div className="circulo">
      <button
        onClick={handleOnClick}
        style={{ display: visible ? 'inline' : 'none' }}
      >
        <FaAngleUp />
      </button>
    </div>
  );
};

export default ButtonToTop;
