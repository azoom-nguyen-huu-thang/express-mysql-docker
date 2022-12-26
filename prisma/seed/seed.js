import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const seedData = async () => {
	try {
		await prisma.user.create({
			data: {
				name: 'Bob',
				email: 'bob@prisma.io',
				posts: {
					create: {
						title: 'Hello World',
					},
				},
			},
		})
		console.log('Seeding successfully')
		return prisma.$disconnect()
	} catch (error) {
		console.error(error)
		await prisma.$disconnect()
	}
}

seedData()
