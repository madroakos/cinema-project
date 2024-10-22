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

export async function getMovieByID(movieID: string) {
  const prisma = new PrismaClient()
  const movie = await prisma.movies.findUnique({
    where: {
      movie_id: Number(movieID),
    },
    include: {
      Showtimes: true,
    },
  })
  return movie
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