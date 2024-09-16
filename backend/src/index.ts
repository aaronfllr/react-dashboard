import { PrismaClient } from '@prisma/client'
import cors from 'cors'
import express from 'express'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())
app.use(cors())

app.use('/', (req, res) => {
  res.send('Hello World S!')
})

const server = app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})