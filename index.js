import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const app = express()
const port = process.env.PORT
const prisma = new PrismaClient()

async function main() {
	try {
		const users = await prisma.user.findMany()
		console.log(users)
		return users
	} catch (e) {
		console.error(e)
	}
}

app.use(cors())

app.get('/', (req, res) => {
	res.send('Hello World!')
})

app.get('/users', async (req, res) => {
	const users = await main()
	res.send(users)
})

app.post('/users', async (req, res) => {
	const { name, email } = req.body
	const user = await prisma.user.create({
		data: {
			name,
			email,
		},
	})
	res.send(user)
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
