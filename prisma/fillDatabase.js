const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create example movies
  const movie1 = await prisma.movies.create({
    data: {
      title: 'Inception',
      posterUrl: 'https://example.com/inception.jpg',
      genre: 'Sci-Fi',
      duration: 148,
      description: 'A thief who steals corporate secrets through the use of dream-sharing technology.',
      release_date: new Date('2010-07-16'),
    },
  });

  const movie2 = await prisma.movies.create({
    data: {
      title: 'The Matrix',
      posterUrl: 'https://example.com/matrix.jpg',
      genre: 'Action',
      duration: 136,
      description: 'A computer hacker learns about the true nature of his reality and his role in the war against its controllers.',
      release_date: new Date('1999-03-31'),
    },
  });

  // Create example screens
  const screen1 = await prisma.screens.create({
    data: {
      screen_number: 1,
      rows: 10,
      columns: 20,
    },
  });

  const screen2 = await prisma.screens.create({
    data: {
      screen_number: 2,
      rows: 15,
      columns: 25,
    },
  });

  // Create example showtimes
  const showtime1 = await prisma.showtimes.create({
    data: {
      movie_id: movie1.movie_id,
      screen_id: screen1.screen_id,
      showtime: new Date('2023-10-01T14:00:00Z'),
    },
  });

  const showtime2 = await prisma.showtimes.create({
    data: {
      movie_id: movie2.movie_id,
      screen_id: screen2.screen_id,
      showtime: new Date('2023-10-01T17:00:00Z'),
    },
  });

  // Create example bookings
  const booking1 = await prisma.bookings.create({
    data: {
      user_id: 1,
      showtime_id: showtime1.showtime_id,
      booking_date: new Date(),
      total_amount: 15.00,
      status: 'confirmed',
    },
  });

  const booking2 = await prisma.bookings.create({
    data: {
      user_id: 2,
      showtime_id: showtime2.showtime_id,
      booking_date: new Date(),
      total_amount: 20.00,
      status: 'confirmed',
    },
  });

  // Create example tickets
  await prisma.tickets.create({
    data: {
      booking_id: booking1.booking_id,
      seat_id: 1,
    },
  });

  await prisma.tickets.create({
    data: {
      booking_id: booking2.booking_id,
      seat_id: 2,
    },
  });

  console.log('Example data inserted successfully');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });