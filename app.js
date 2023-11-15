// app.js
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
const port = 3000;

// Sample data store
const projects = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Home Page - List of projects
app.get('/', (req, res) => {
  res.render('home', { projects });
});

// Create Project Page
app.get('/create-project', (req, res) => {
  res.render('createProject');
});

app.post('/create-project', (req, res) => {
  const { name, description, author } = req.body;
  const newProject = { name, description, author, issues: [] };
  projects.push(newProject);
  res.redirect('/');
});

// Project Detail Page
app.get('/project/:projectId', (req, res) => {
  const projectId = req.params.projectId;
  const project = projects.find((p) => p.name === projectId);
  if (!project) return res.status(404).send('Project not found');
  res.render('projectDetail', { project });
});

// Create Issue Page
app.get('/create-issue/:projectId', (req, res) => {
  const projectId = req.params.projectId;
  const project = projects.find((p) => p.name === projectId);
  if (!project) return res.status(404).send('Project not found');
  res.render('createIssue', { project });
});

app.post('/create-issue/:projectId', (req, res) => {
  const projectId = req.params.projectId;
  const project = projects.find((p) => p.name === projectId);
  if (!project) return res.status(404).send('Project not found');

  const { title, description, labels, author } = req.body;
  const newIssue = { title, description, labels: labels.split(','), author };
  project.issues.push(newIssue);
  res.redirect(`/project/${projectId}`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
