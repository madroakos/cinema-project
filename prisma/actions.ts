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

export async function getShowtimeByID(showtimeID: string) {
  const prisma = new PrismaClient()
  const showtime = await prisma.showtimes.findUnique({
    where: {
      showtime_id: Number(showtimeID),
    },
    include: {
      Movies: true,
      Screens: true,
    },
  })
  return showtime
}