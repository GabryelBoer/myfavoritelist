import { useState, useEffect } from 'react';
import './MyPagination.css';

export default function MyPagination({ total, current, onChangePage }) {
  const [arrOfCurrButtons, setArrOfCurrButtons] = useState([]);
  const [currentButton, setCurrentButton] = useState(current);
  
  let items = [];
  for (let i = 1; i <= total; i++) {
    items.push(i);
  }

  useEffect(() => {
    let tempNumberOfPages = [...arrOfCurrButtons];

    let dotsInitial = '...';
    let dotsLeft = '... ';
    let dotsRight = ' ...';

    if (items.length < 6) {
      tempNumberOfPages = items
    }

    else if (currentButton >= 1 && currentButton <= 3) {
      tempNumberOfPages = [1, 2, 3, 4, dotsInitial, items.length];
    } 
    
    else if (currentButton === 4) {
      const sliced = items.slice(0, 5);
      tempNumberOfPages = [...sliced, dotsInitial, items.length];
    } 
    
    else if (currentButton > 4 && currentButton < items.length - 2) {
      const sliced1 = items.slice(currentButton - 2, currentButton);
      const sliced2 = items.slice(currentButton, currentButton + 1);
      tempNumberOfPages = ([1, dotsLeft, ...sliced1, ...sliced2, dotsRight, items.length]);
    } 
    
    else if (currentButton > items.length - 3) {
      const sliced = items.slice(items.length - 4);
      tempNumberOfPages = ([1, dotsLeft, ...sliced]);

    } 
    
    else if (currentButton === dotsInitial) {
      setCurrentButton(arrOfCurrButtons[arrOfCurrButtons.length - 3] + 1);
      onChangePage(arrOfCurrButtons[arrOfCurrButtons.length - 3] + 1)
    } 
    
    else if (currentButton === dotsRight) {
      setCurrentButton(arrOfCurrButtons[3] + 2);
      onChangePage(arrOfCurrButtons[3] + 2)
      
    } 
    
    else if (currentButton === dotsLeft) {
      setCurrentButton((arrOfCurrButtons[3] - 2));
      onChangePage(arrOfCurrButtons[3] - 2)
    }

    setArrOfCurrButtons(tempNumberOfPages);
    current = currentButton
  }, [currentButton]);

  return (
    <div className="pagination-container">
      <button
        className={`${currentButton === 1 ? 'disabled' : ''}`}
        onClick={() => {
          onChangePage(prev => prev === 1 ? prev : prev - 1) 
          setCurrentButton(prev => prev === 1 ? prev : prev - 1)}}
      >
        &lt;
      </button>

      {arrOfCurrButtons.map(((page, index) => {
        return (
          <button
            key={index}
            className={`${currentButton === page ? 'active' : ''}`}
            onClick={() => {
              onChangePage(page)
              setCurrentButton(page)
            }}
          >
            {page}
          </button>
        );
      }))}

      <button
        className={`${currentButton === items.length ? 'disabled' : ''}`}
        onClick={() => {
          onChangePage(prev => prev === items.length ? prev : prev + 1)
          setCurrentButton(prev => prev === items.length ? prev : prev + 1)
        }}
      >
        &gt;
      </button>
    </div>
  );
}
