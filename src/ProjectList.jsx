import { useState, useEffect } from 'react';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(function () {
    fetch('http://localhost:3000/api/projects')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setProjects(data.projects);
        setLoading(false);
      })
      .catch(function(err) {
        setError('Eroare la incarcarea datelor');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Se incarca...</p>;
  }
  if (error) {
    return <p> {error} </p>
  }
  else {
  return (
    <div>
      <h3>Proiecte</h3>
      <input 
        value={search} 
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Cauta ceva..." />
      {projects 
        .filter(function(p) { return p.title.toLowerCase().includes(search.toLowerCase()); })
        .map(function (project, index) {
        return (
          <div key={index}>
            <p><strong>{project.title}</strong></p>
            <p>{project.description}</p>
          </div>
          
        );
      })
      }
      <p>Total: {projects.length}</p>
      <p>Finalizate: {projects.filter(p => p.done).length}</p>
      <p>Nefinalizate: {projects.filter(p => !p.done).length}</p>
      
    </div>
  );}
}

export default ProjectList;