import { useState, useEffect } from "react";
import "./Pages.css";
import ToDoList from "./ToDoList.jsx";

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");
  const [tech, setTech] = useState("");
  const [idEdit, editingId] = useState(null);
  const [titleEdit, editingTitle] = useState("");
  const [techEdit, editingTech] = useState("");

  useEffect(function () {
    fetch("http://localhost:3000/api/projects")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setProjects(data.projects);
        setLoading(false);
      })
      .catch(function (err) {
        setError("Eroare la incarcarea datelor");
        setLoading(false);
      });
  }, []);

  async function handleSubmit() {
    try {
      const response = await fetch(`http://localhost:3000/api/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title, tech: tech, done: false }),
      });
      const newProject = await response.json();
      setProjects([...projects, newProject]);
      setTitle("");
      setTech("");
    } catch (err) {
      console.error("Eroare:", err);
    }
  }

  /*async function handleDelete(id) {
    try {
      await fetch(`http://localhost:3000/api/projects/${id}`, {
        method: "DELETE",
      });
      setProjects(projects.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Eroare:", err);
    }
  }*/

  async function handleUpdate(id) {
    try {
      const response = await fetch(`http://localhost:3000/api/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          done: !projects.find((p) => p._id === id).done,
        }),
      });
      const updatedProject = await response.json();
      setProjects(projects.map((p) => (p._id === id ? updatedProject : p)));
    } catch (err) {
      console.error("Eroare:", err);
    }
  }

  async function handleSave(id) {
    try {
      const response = await fetch(`http://localhost:3000/api/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: titleEdit, tech: techEdit }),
      });
      const updatedProject = await response.json();
      setProjects(projects.map((p) => (p._id === id ? updatedProject : p)));
      editingId(null);
    } catch (err) {
      console.error("Eroare:", err);
    }
  }

  function handleDelete(id) {
    if (window.confirm("Sigur vrei să ștergi acest proiect?")) {
      fetch(`http://localhost:3000/api/projects/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          setProjects(projects.filter((p) => p._id !== id));
        })
        .catch((err) => console.error("Eroare:", err));
    }
  }



  if (loading) {
    return <p>Se incarca...</p>;
  }
  if (error) {
    return <p> {error} </p>;
  } else {
    return (
      <div style={{ textAlign: "left" }}>
        <ToDoList/>
        <h3>Adauga sau cauta un proiect:</h3>
        <div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titlu"
          />
          <input
            value={tech}
            onChange={(e) => setTech(e.target.value)}
            placeholder="Tehnologie"
          />
          <button onClick={handleSubmit} className="btn_form_adaugare">
            Adauga
          </button>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Cauta ceva..."
            style={{ marginBottom: "20px"}}
          />
        </div>
        {projects.length > 0 && <p><strong>Numele proiectelor:</strong></p>}
        {projects
          .filter(function (p) {
            //console.log("Filtering:", p.title, "with search:", search);
            return p.title.toLowerCase().includes(search.toLowerCase());
          })
          .map(function (project) {
            return (
              <div key={project._id} className="project_card">
                  {idEdit === project._id ? (
                    <div>
                      <p>Editeaza proiectul:</p>
                      <input
                        value={titleEdit}
                        onChange={(e) => editingTitle(e.target.value)}
                        placeholder="Titlu"
                      />
                      <input
                        value={techEdit}
                        onChange={(e) => editingTech(e.target.value)}
                        placeholder="Tehnologie"
                      />
                      <button onClick={() => handleSave(project._id)}>
                        Salveaza
                      </button>
                      <button onClick={() => editingId(null)}>Anulează</button>
                    </div>
                  ) : (
                    <div >
                      <p style = {{ color: project.done ? "green" : "red" }}>
                        {project.title}
                      </p>
                      <p>{project.description}</p>
                      <button onClick={() => handleDelete(project._id)}>
                        Șterge
                      </button>
                      <button onClick={() => handleUpdate(project._id)}>
                        {project.done ? "In lucru" : "Finalizat"}
                      </button>
                      <button
                        onClick={() => {
                          editingId(project._id);
                          editingTitle(project.title);
                          editingTech(project.tech);
                        }}
                      >
                        Editează
                      </button>
                    </div>
                  )}
                </div>
            );
          })}
        <div className="stats">
          <p><strong className='stats_p'>Total:</strong> {projects.length}</p>
          <p><strong className='stats_p'>Finalizate:</strong> {projects.filter((p) => p.done).length}</p>
          <p style={{ marginBottom: "40px" }}><strong className='stats_p'>Nefinalizate:</strong> {projects.filter((p) => !p.done).length}</p>
        </div>
      </div>
    );
  }
}

export default ProjectList;
