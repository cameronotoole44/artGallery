import { useState, useEffect } from 'react';
import './App.css';
import Gallery from './components/Gallery';
import ButtonBar from './components/ButtonBar';

function App() {
  let [data, setData] = useState({})
  let [artId, setArtId] = useState(12720)
  let [manualId, setManualId] = useState("")

  useEffect(() => {
    document.title = `Art ID: ${artId}`;
    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${artId}`)
      .then(response => response.json())
      .then(resdata => setData(resdata))
      .catch(error => {
        console.error('Error fetching data:', error);
        setData({});
      })
  }, [artId]);

  const handleIterate = (e) => {
    setArtId(artId + Number(e.target.value));
  };

  const handleManualInput = () => {
    const newId = parseInt(manualId, 10);
    if (!isNaN(newId)) {
      setArtId(newId);
    }
  };

  const displayImage = () => {
    if (!data || !data.primaryImage) {
      return <h2>No Image!</h2>;
    }
    return <Gallery artImg={data.primaryImage} title={data.title} />;
  };

  return (
    <div className="App">
      <h1>{data.title ? data.title : 'No Title'}</h1>
      <div style={{ 'width': '100%' }}>
        {displayImage()}
      </div>
      <ButtonBar handleIterate={handleIterate} />
      <div>
        <input
          type="text"
          value={manualId}
          onChange={(e) => setManualId(e.target.value)}
          placeholder="Enter art ID"
        />
        <button onClick={handleManualInput}>Go</button>
      </div>
    </div>
  )
};

export default App;

