const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create example Movies
  const batman = await prisma.movies.create({
    data: {
      title: 'The Batman',
      posterUrl: 'https://m.media-amazon.com/images/I/91ezOOQjE3L._AC_UF894,1000_QL80_.jpg',
      genre: 'Action',
      duration: 176,
      description: 'The newest Batman movie.',
      release_date: new Date('2022-03-04'),
    },
  });

  const joker = await prisma.movies.create({
    data: {
      title: 'Joker',
      posterUrl: 'https://m.media-amazon.com/images/I/51E+o6036kL._AC_UF894,1000_QL80_.jpg',
      genre: 'Drama',
      duration: 122,
      description: 'The newest Joker movie.',
      release_date: new Date('2019-10-04'),
    },
  });

  // Create example Screens
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
      rows: 8,
      columns: 15,
    },
  });

  // Create example Showtimes
  await prisma.showtimes.create({
    data: {
      movie_id: batman.movie_id,
      screen_id: screen1.screen_id,
      showtime: new Date('2023-10-01T14:00:00Z'),
      dimension: '2D',
      language: 'Angol',
      subtitle: 'Magyar feliratos',
    },
  });

  await prisma.showtimes.create({
    data: {
      movie_id: batman.movie_id,
      screen_id: screen1.screen_id,
      showtime: new Date('2023-10-01T17:00:00Z'),
      dimension: '2D',
      language: 'Magyar',
      subtitle: 'None',
    },
  });

  await prisma.showtimes.create({
    data: {
      movie_id: batman.movie_id,
      screen_id: screen1.screen_id,
      showtime: new Date('2023-10-01T20:00:00Z'),
      dimension: '2D',
      language: 'Angol',
      subtitle: 'Magyar feliratos',
    },
  });

  await prisma.showtimes.create({
    data: {
      movie_id: batman.movie_id,
      screen_id: screen2.screen_id,
      showtime: new Date('2023-10-01T10:00:00Z'),
      dimension: '3D',
      language: 'Angol',
      subtitle: 'Magyar feliratos',
    },
  });

  await prisma.showtimes.create({
    data: {
      movie_id: batman.movie_id,
      screen_id: screen2.screen_id,
      showtime: new Date('2023-10-01T15:00:00Z'),
      dimension: '3D',
      language: 'Magyar',
      subtitle: 'None',
    },
  });

  await prisma.showtimes.create({
    data: {
      movie_id: batman.movie_id,
      screen_id: screen2.screen_id,
      showtime: new Date('2023-10-01T20:00:00Z'),
      dimension: '3D',
      language: 'Angol',
      subtitle: 'Magyar feliratos',
    },
  });

  await prisma.showtimes.create({
    data: {
      movie_id: joker.movie_id,
      screen_id: screen1.screen_id,
      showtime: new Date('2023-10-01T14:00:00Z'),
      dimension: '2D',
      language: 'Angol',
      subtitle: 'Magyar feliratos',
    },
  });

  await prisma.showtimes.create({
    data: {
      movie_id: joker.movie_id,
      screen_id: screen1.screen_id,
      showtime: new Date('2023-10-01T17:00:00Z'),
      dimension: '2D',
      language: 'Magyar',
      subtitle: 'None',
    },
  });

  await prisma.showtimes.create({
    data: {
      movie_id: joker.movie_id,
      screen_id: screen1.screen_id,
      showtime: new Date('2023-10-01T20:00:00Z'),
      dimension: '2D',
      language: 'Angol',
      subtitle: 'Magyar feliratos',
    },
  });

  await prisma.showtimes.create({
    data: {
      movie_id: joker.movie_id,
      screen_id: screen2.screen_id,
      showtime: new Date('2023-10-01T10:00:00Z'),
      dimension: '3D',
      language: 'Angol',
      subtitle: 'Magyar feliratos',
    },
  });

  await prisma.showtimes.create({
    data: {
      movie_id: joker.movie_id,
      screen_id: screen2.screen_id,
      showtime: new Date('2023-10-01T15:00:00Z'),
      dimension: '3D',
      language: 'Magyar',
      subtitle: 'None',
    },
  });

  await prisma.showtimes.create({
    data: {
      movie_id: joker.movie_id,
      screen_id: screen2.screen_id,
      showtime: new Date('2023-10-01T20:00:00Z'),
      dimension: '3D',
      language: 'Angol',
      subtitle: 'Magyar feliratos',
    },
  });

  // Create example Bookings
  // const booking1 = await prisma.bookings.create({
  //   data: {
  //     user_id: 1,
  //     showtime_id: showtime1.showtime_id,
  //     booking_date: new Date(),
  //     total_amount: 15.0,
  //     status: 'confirmed',
  //   },
  // });

  // const booking2 = await prisma.bookings.create({
  //   data: {
  //     user_id: 2,
  //     showtime_id: showtime2.showtime_id,
  //     booking_date: new Date(),
  //     total_amount: 12.0,
  //     status: 'confirmed',
  //   },
  // });

  // Create example Tickets
  // await prisma.tickets.create({
  //   data: {
  //     booking_id: booking1.booking_id,
  //     seat_id: 1,
  //   },
  // });

  // await prisma.tickets.create({
  //   data: {
  //     booking_id: booking2.booking_id,
  //     seat_id: 2,
  //   },
  // });

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