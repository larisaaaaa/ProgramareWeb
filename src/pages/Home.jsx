import { useState, useEffect } from 'react';
import "../Pages.css";
import QuickNote from '../QuickNote';


function Home() {
  const [total, setTotal] = useState(0);
  const [finalizate, setFinalizate] = useState(0);
  const [nefinalizate, setNefinalizate] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(function () {
    fetch('http://localhost:3000/api/stats')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setTotal(data.total);
        setFinalizate(data.done);
        setNefinalizate(data.inProgress);
      })
      .catch(function(err) {
        console.error('Eroare la incarcarea datelor:', err);
      });
  }, []);

  return (
    
    <div style={{ textAlign: "left" }}>
      <h2 style={{ textAlign: "center", marginTop: "40px" }}>Home</h2>
      <QuickNote />
      <p style={{ marginTop: "20px" }}>Ai apasat de {count} ori</p>
      <button onClick={() => setCount(count + 1)}> Incrementeaza</button>
      <button onClick={() => count ? setCount(count - 1) : setCount(0)}> Decrementeaza</button>
       <button onClick={() => setCount(0)}>Reseteaza</button>
      <p style={{ marginTop: "20px" }}>Bine ai venit pe dashboard-ul meu!</p>
      <p style={{ marginTop: "20px" }}>Statistici:</p>
      <p> <strong className='stats_p'>Total proiecte:</strong> {total}</p>
      <p> <strong className='stats_p'>Proiecte finalizate:</strong> {finalizate}</p>
      <p> <strong className='stats_p'>Proiecte în curs:</strong> {nefinalizate}</p>
    </div>
  );
}
export default Home;
