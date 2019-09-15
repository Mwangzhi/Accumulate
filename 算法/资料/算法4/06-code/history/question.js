const express = require('express')
const path = require('path') 
const app = express()

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './question.html'))
})


app.listen(3000)
