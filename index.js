import express from 'express';

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

let posts = [];

// Home page route
app.get('/', (req, res) => {
  res.render('index', { posts });
});

// New post form route
app.get('/posts/new', (req, res) => {
  res.render('new');
});

// Handle new post creation
app.post('/posts', (req, res) => {
  const { title, content } = req.body;
  posts.push({ id: posts.length + 1, title, content });
  res.redirect('/');
});

// Edit post form route
app.get('/posts/:id/edit', (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  res.render('edit', { post });
});

// Handle post update
app.post('/posts/:id', (req, res) => {
  const { id, title, content } = req.body;
  const post = posts.find(p => p.id == id);
  post.title = title;
  post.content = content;
  res.redirect('/');
});

// Handle post deletion
app.post('/posts/:id/delete', (req, res) => {
  posts = posts.filter(p => p.id != req.params.id);
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
