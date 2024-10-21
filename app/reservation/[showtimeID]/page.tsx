import { getShowtimeByID } from "@/prisma/actions";
import Link from "next/link";

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
        <div className="p-6">
            <div className="flex flex-col items-center gap-1 ">
                <h1 className="font-bold text-3xl">{showtime.Movies.title}</h1>
                <p className="text-xl">{formattedDate}, {showtime.Screens.screen_number}. terem</p>
                <p>{showtime.language} | {showtime.dimension} {hasSubtitle()}</p>
            </div>
            <div>
                <div className="flex flex-col gap-1 mt-4">
                    <div className="flex flex-col self-center gap-1">
                    {Array.from({ length: showtime.Screens.rows }).map((_, rowIndex) => (
                        <div key={rowIndex} className="flex max-w-screen">
                        {Array.from({ length: showtime.Screens.columns }).map((_, colIndex) => (
                            <button
                            className="m-0.5 w-3 h-3 bg-black rounded-sm"
                            key={`${rowIndex}-${colIndex}`}
                            //   onClick={() => handleReservation(rowIndex + 1, colIndex + 1)}
                            >
                            </button>
                        ))}
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    );


    function hasSubtitle() {
        if (showtime?.subtitle && showtime.subtitle.toLowerCase() !== "none") {
            return (
                <> |&nbsp;
                <div className="badge badge-neutral text-xs text-nowrap sm:text-sm">{showtime.subtitle}</div>
                </>
            )
        }
    }
}