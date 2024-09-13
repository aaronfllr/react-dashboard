const express = require('express')
const cors = require('cors');

const app = express()
app.use(cors());
const port = 3001

app.get('/', (req, res) => {
    res.send({
        message: "Hello World from Express API backend!"
    })
})

app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})
