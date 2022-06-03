const express = require('express')
const routes = require('./routes')
const bodyParser = require('body-parser')
const errorhandler = require('errorhandler')

let store = {
  posts: [
    {name: 'TESTTING POST',
    url: 'https://webapplog.com/es6',
    text: 'Mi primera publicacion',
    comments: [
      {text: 'Hi from Tuxtla!'},
      {text: 'Cheers!'},
      {text: 'Good job'}
    ]
    }
  ]
}

let app = express()

app.use(bodyParser.json())
app.use(errorhandler())

app.use((req, res, next) => {
    req.store = store
    next()
})

app.get('/posts', routes.posts.getPosts)
app.post('/posts', routes.posts.addPost)
app.put('/posts/:postId', routes.posts.updatePost)
app.delete('/posts/:postId', routes.posts.removePost)

app.get('/posts/:postId/comments', routes.comments.getComments)
app.post('/posts/:postId/comments', routes.comments.addComment)
app.put('/posts/:postId/comments/:commentId', routes.comments.updateComment)
app.delete('/posts/:postId/comments/:commentId', routes.comments.removeComment)

app.listen(3000)