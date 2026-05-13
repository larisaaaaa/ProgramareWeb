const express = require('express');
const mongoose = require('mongoose');
const Project = require('./models/Project');

mongoose.connect('mongodb://localhost:27017/dashboard')
 .then(function() {
 console.log('Conectat la MongoDB!');
 })
 .catch(function(err) {
 console.error('Eroare conectare MongoDB:', err);
 });
const app = express();
const PORT = 3000;
// Prima ruta: raspunde la GET /
app.get('/api/projects', async function(req, res) {
 try {
 const projects = await Project.find();
 res.json(projects);
 } catch (err) {
 res.status(500).json({ error: 'Eroare ' + err });
 }
});

// Porneste serverul
// Date (temporar in memorie, vom folosi MongoDB mai tarziu)


app.use(express.json());

app.post('/api/projects', async function(req, res) {
 try {
 const newProject = new Project({
 title: req.body.title,
 tech: req.body.tech,
 done: req.body.done || false,
 });
 const saved = await newProject.save();
 res.status(201).json(saved);
 } catch (err) {
 res.status(400).json({ error: err.message });
 }
});

// GET /api/projects - returneaza toate proiectele
/*app.get('/api/projects', function(req, res) {
 res.json(projects);
});*/

// GET /api/projects/:id
app.get('/api/projects/:id', async function(req, res) {
    const project = await Project.findById(req.params.id);
    if (!project) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.json(project);
});

// GET /api/stats
/*app.get('/api/stats', function(req, res) {
    const proiecte = projects.length;
    const proiecte_temrinate = projects.filter(p => p.done === true).length;     // done este variabila booleana
    const proiecte_neterminate = projects.filter(p => p.done === false).length;
    res.json({
        total : proiecte,
        finalizate : proiecte_temrinate,
        nefinalizate : proiecte_neterminate
    })
    
});*/

 app.delete('/api/projects/:id', async function(req, res) {
    const id_citit = await Project.findByIdAndDelete(req.params.id);
    if(!id_citit){
        return res.status(404).json({ error: 'Not found' });
    }
    res.json({ message: 'Deleted' });
})


app.listen(PORT, function() {
 console.log('Server pornit pe http://localhost:' + PORT);
});