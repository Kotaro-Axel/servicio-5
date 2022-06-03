const express = require('express')
const routes = require('./routes')
var cors = require('cors')
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

app.use(cors())


app.use(bodyParser.json())
app.use(errorhandler())

app.use((req, res, next) => {
    req.store = store
    next()
})

app.get('/api/posts', routes.posts.getPosts)
app.post('/api/posts', routes.posts.addPost)
app.put('/api/posts/:postId', routes.posts.updatePost)
app.delete('/api/posts/:postId', routes.posts.removePost)

app.get('/api/posts/:postId/comments', routes.comments.getComments)
app.post('/api/posts/:postId/comments', routes.comments.addComment)
app.put('/api/posts/:postId/comments/:commentId', routes.comments.updateComment)
app.delete('/api/posts/:postId/comments/:commentId', routes.comments.removeComment)

app.listen(3000)