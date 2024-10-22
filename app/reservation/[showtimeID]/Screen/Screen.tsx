'use client'
import React, { useState, useEffect, useRef } from 'react';
import { usePinch, useDrag } from '@use-gesture/react';
import { Showtimes, Screens, Movies } from "@prisma/client";

interface showtimeWithMovie extends Showtimes {
    Movies: Movies;
    Screens: Screens;
}

export default function Screen({ showtime, formattedDate }: { showtime: showtimeWithMovie, formattedDate: string }) {
    const [zoom, setZoom] = useState(1);
    const seatSelectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleDoubleClick = () => {
            console.log('Double-clicked on seat selection area');
            // Add your double-click handling logic here
        };

        const seatSelectionDiv = seatSelectionRef.current;
        if (seatSelectionDiv) {
            seatSelectionDiv.addEventListener('dblclick', handleDoubleClick);
        }

        return () => {
            if (seatSelectionDiv) {
                seatSelectionDiv.removeEventListener('dblclick', handleDoubleClick);
            }
        };
    }, []);

    const hasSubtitle = () => {
        return showtime.subtitle && showtime.subtitle.toLowerCase() !== 'none' ? `| ${showtime.subtitle}` : '';
    };

    const bindPinch = usePinch(({ offset: [d] }) => {
        setZoom(Math.max(0.1, Math.min(2, d / 200)));
    });

    const bindDrag = useDrag(({ offset: [x, y] }) => {
        if (seatSelectionRef.current) {
            seatSelectionRef.current.scrollLeft = -x;
            seatSelectionRef.current.scrollTop = -y;
        }
    }, {
        from: () => {
            if (seatSelectionRef.current) {
                return [-seatSelectionRef.current.scrollLeft, -seatSelectionRef.current.scrollTop];
            }
            return [0, 0];
        }
    });

    function handleReservation(row: number, col: number): void {
        console.log(`Reserved seat at row ${row}, column ${col}`);
        // Add your reservation logic here, such as updating state or making an API call
    }

    return (
        <div className="w-[100vw] max-w-[100vw] overflow-hidden">
            <div className="p-6 flex flex-col items-center w-full gap-1 z-50 relative">
                <h1 className="font-bold text-3xl">{showtime.Movies.title}</h1>
                <p className="text-xl">{formattedDate}, {showtime.Screens.screen_number}. terem</p>
                <p>{showtime.language} | {showtime.dimension} {hasSubtitle()}</p>
            </div>
            <div id="seatSelection" ref={seatSelectionRef} className="relative z-0 overflow-auto">
                <div className="flex flex-col overflow-hidden z-0" {...bindDrag()}>
                    <div {...bindPinch()} style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }} className="flex flex-col self-center space-y-0 sm:space-y-3 md:space-y-4 z-0">
                        {Array.from({ length: showtime.Screens.rows }).map((_, rowIndex) => (
                            <div key={rowIndex} className="flex space-x-1 sm:space-x-3 md:space-x-4 z-0">
                                {Array.from({ length: showtime.Screens.columns }).map((_, colIndex) => (
                                    <button
                                        className="w-8 h-8 bg-black rounded-sm z-0"
                                        key={`${rowIndex}-${colIndex}`}
                                          onClick={() => handleReservation(rowIndex + 1, colIndex + 1)}
                                    >
                                    </button>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex justify-center p-3 gap-4 w-screen z-50 relative">
                <button onClick={() => setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.1))} className="btn btn-primary">-</button>
                <button onClick={() => setZoom((prevZoom) => Math.min(prevZoom + 0.1, 2))} className="btn btn-primary">+</button>
            </div>
            <div className='z-50 relative w-full flex justify-end pr-6'>
                <button className="btn btn-primary self-end">Reserve</button>
            </div>
        </div>
    );
}