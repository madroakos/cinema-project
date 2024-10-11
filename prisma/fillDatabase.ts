import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create example Movies
  const movie1 = await prisma.movies.create({
    data: {
      title: 'Inception',
      genre: 'Sci-Fi',
      duration: 148,
      director: 'Christopher Nolan',
      cast: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page',
      description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
      release_date: new Date('2010-07-16'),
      rating: 8.8,
    },
  });

  // Create example Screens
  const screen1 = await prisma.screens.create({
    data: {
      screen_number: 1,
      capacity: 200,
    },
  });

  // Create example Showtimes
  const showtime1 = await prisma.showtimes.create({
    data: {
      movie_id: movie1.movie_id,
      screen_id: screen1.screen_id,
      showtime: new Date('2023-10-01T14:00:00Z'),
      available_seats: 200,
    },
  });

  // Create example Bookings
  const booking1 = await prisma.bookings.create({
    data: {
      user_id: 1,
      showtime_id: showtime1.showtime_id,
      booking_date: new Date(),
      total_amount: 15.0,
      status: 'confirmed',
    },
  });

  // Create example Tickets
  const ticket1 = await prisma.tickets.create({
    data: {
      booking_id: booking1.booking_id,
      seat_id: 1,
    },
  });

  console.log('Database has been populated with example data.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });