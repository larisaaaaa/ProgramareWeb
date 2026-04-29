const express = require('express');
const app = express();
const PORT = 3000;
// Prima ruta: raspunde la GET /
app.get('/', function(req, res) {
 res.json({ message: 'Serverul functioneaza!' });
});
// Porneste serverul
// Date (temporar in memorie, vom folosi MongoDB mai tarziu)
const projects = [
 { id: 1, title: "Pagina Personala", tech: "HTML, CSS", done: true },
 { id: 2, title: "Calculator Buget", tech: "JS", done: true },
 { id: 3, title: "Dashboard React", tech: "React", done: false },
 { id: 4, title: "API Meteo", tech: "React, API", done: false },
];

app.use(express.json());

app.post('/api/projects', function(req, res) {
 const newProject = {
 id: projects.length + 1,
 title: req.body.title,
 tech: req.body.tech,
 done: req.body.done || false,
 };
 projects.push(newProject);
 res.status(201).json(newProject);
});

// GET /api/projects - returneaza toate proiectele
app.get('/api/projects', function(req, res) {
 res.json(projects);
});
// GET /api/projects/:id
app.get('/api/projects/:id', function(req, res) {
 const project = projects.find(p => p.id === parseInt(req.params.id));
  if (!project) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.json(project);
});

// GET /api/stats
app.get('/api/stats', function(req, res) {
    const proiecte = projects.length;
    const proiecte_temrinate = projects.filter(p => p.done === true).length;     // done este variabila booleana
    const proiecte_neterminate = projects.filter(p => p.done === false).length;
    res.json({
        total : proiecte,
        finalizate : proiecte_temrinate,
        nefinalizate : proiecte_neterminate
    })
    
});

 app.delete('/api/projects/:id', function(req, res) {
    const id_citit = parseInt(req.params.id);
    const id_index = projects.findIndex(p => p.id === id_citit);
    if(id_index == -1){
        return res.status(404).json({ error: 'Not found' });
    }
    projects.splice(id_index, 1);
    res.json({ message: 'Deleted' });
})


app.listen(PORT, function() {
 console.log('Server pornit pe http://localhost:' + PORT);
});