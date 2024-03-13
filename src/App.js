import { useState, useEffect } from 'react';
import './App.css';

const GRID = Array(10).fill(Array(10).fill(null)); // 10x10 grid

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const storedValue = JSON.parse(localStorage.getItem(key));
    return storedValue !== null ? storedValue : initialValue;
  });

  // Update local storage when value changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

function App() {
  const [coordinates, setCoordinates] = useLocalStorage('coordinates', { x: 0, y: 0 });

  useEffect(() => {
    const handleKeyPress = (event) => {
      switch (event.key) {
        case 'ArrowUp':
          setCoordinates((prev) => {
            if (prev.x === 0) {
              return prev;
            }
            return { x: prev.x - 1, y: prev.y };
          });
          break;
        case 'ArrowDown':
          setCoordinates((prev) => {
            if (prev.x === 9) {
              return prev;
            }
            return { x: prev.x + 1, y: prev.y };
          });
          break;
        case 'ArrowLeft':
          setCoordinates((prev) => {
            if (prev.y === 0) {
              return prev;
            }
            return { x: prev.x, y: prev.y - 1 };

          });
          break;
        case 'ArrowRight':
          setCoordinates((prev) => {
            if (prev.y === 9) {
              return prev;
            }
            return { x: prev.x, y: prev.y + 1 };
          });
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="App">
      <div className="grid">
        {GRID.map((row, rowIndex) => row.map((cell, cellIndex) => (
          <div
            key={cellIndex}
            className="cell"
            data-testid={`cell-${rowIndex}-${cellIndex}`}
            onClick={() => setCoordinates({ x: rowIndex, y: cellIndex })}
          >
            {coordinates.x === rowIndex && coordinates.y === cellIndex ? '🤖' : ' '}
          </div>
        )))}
      </div>
    </div>
  );
}

export default App;
