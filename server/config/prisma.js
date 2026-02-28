// Ensure env is loaded and DATABASE_URL is available before Prisma reads schema
require('dotenv').config()

const buildDatabaseUrlFromEnv = () => {
	if (process.env.DATABASE_URL) return process.env.DATABASE_URL

	const host = process.env.DB_HOST
	const user = process.env.DB_USER
	const password = process.env.DB_PASSWORD
	const database = process.env.DB_NAME
	const port = process.env.DB_PORT || '3306'

	if (host && user && database) {
		const u = encodeURIComponent(user)
		const p = password ? encodeURIComponent(password) : ''
		return `mysql://${u}:${p}@${host}:${port}/${database}`
	}

	return undefined
}

const databaseUrl = buildDatabaseUrlFromEnv()
if (databaseUrl && !process.env.DATABASE_URL) {
	process.env.DATABASE_URL = databaseUrl
}

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = prisma