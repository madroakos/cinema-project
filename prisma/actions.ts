'use server'

import { PrismaClient } from '@prisma/client'

export async function getAllMovies() {
  const prisma = new PrismaClient()
  const movies = await prisma.movies.findMany({
    include: {
      Showtimes: true,
    },
  })
  return movies
}