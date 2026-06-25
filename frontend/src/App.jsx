import { useState, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/expenses/')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  return <div>{data ? data.message : 'No data found'}</div>;
  }

export default App
