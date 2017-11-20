const app = require('express')();

const posts = [
    {
        id: 1,
        author: 'John',
        title: 'Templating with EJS',
        body: 'Blog post number 1'
    },
    {
        id: 2,
        author: 'Drake',
        title: 'Express: Starting from the Bottom',
        body: 'Blog post number 2'
    },
    {
        id: 3,
        author: 'Emme',
        title: 'Streams',
        body: 'Blog post number 3'
    },
    {
        id: 4,
        author: 'Cody',
        title: 'Events',
        body: 'Blog post number 4'
    }
];

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home', {posts: posts});
});

app.get('/post/:id', (req, res) => {
    const post = posts.filter((post) => {
        return post.id == req.params.id;
    })[0];
    res.render('post', {
        author: post.author,
        title: post.title,
        body: post.body
    });
});

app.listen(8080);
console.log("Listening on port 8080");