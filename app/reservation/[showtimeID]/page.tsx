import { getShowtimeByID } from "@/prisma/actions";
import Link from "next/link";
import Screen from "@/app/reservation/[showtimeID]/Screen/Screen";

export default async function ReservationPage({ params }: { params: { showtimeID: string } }) {
    const { showtimeID } = params;

    const showtime  = await getShowtimeByID(showtimeID);

    if (!showtime) {
        return (
            <div className="flex flex-col gap-3 h-screen justify-center items-center">
                <h1 className="text-4xl">Page not found</h1>
                <Link href={"/"}><button className="btn btn-neutral text-2xl">Go Back</button></Link>
            </div>
    )};

    const monthFormatter = new Intl.DateTimeFormat('hu-HU', { month: 'short' });
    const dayFormatter = new Intl.DateTimeFormat('hu-HU', { day: 'numeric' });
    const weekdayFormatter = new Intl.DateTimeFormat('hu-HU', { weekday: 'long' });
    const timeFormatter = new Intl.DateTimeFormat('hu-HU', { hour: '2-digit', minute: '2-digit' });

    const formattedDate = `${monthFormatter.format(showtime.showtime)} ${dayFormatter.format(showtime.showtime)}. ${weekdayFormatter.format(showtime.showtime)} - ${timeFormatter.format(showtime.showtime)}`;
  
    return (
        <Screen showtime={showtime} formattedDate={formattedDate} />
    );
}