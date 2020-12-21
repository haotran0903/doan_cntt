const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
var cors = require("cors");
const express = require('express')
const app = express()
const appRoute = require('./app/routes')
const path = require('path')

const corsOption = {
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['POST', 'PUT', 'OPTIONS', 'DELETE', 'GET'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept']
}

app.options('*', cors(corsOption))
app.use(cors(corsOption))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())

//Route
app.use('/api', appRoute)

app.use(express.static('build'));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
