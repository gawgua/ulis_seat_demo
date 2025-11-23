"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface SeatItem {
	id: string;
	status: "available" | "occupied" | "selected";
	x: number;
	y: number;
	width?: number;
	height?: number;
	capacity?: number;
}

export interface SeatMapProps {
	seats: SeatItem[];
	onSeatSelect: (seatId: string) => void;
}

export function SeatMap({ seats, onSeatSelect }: SeatMapProps) {
	const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
	const SCALE = 35; // Each seat block is 40x40 pixels

	useEffect(() => {
		setSelectedSeat(null);
		onSeatSelect("");
	}, [seats, onSeatSelect]);

	const handleSeatClick = (seatId: string, status: string) => {
		if (status === "occupied") return;

		if (selectedSeat === seatId) {
			setSelectedSeat(null);
			onSeatSelect("");
		} else {
			setSelectedSeat(seatId);
			onSeatSelect(seatId);
		}
	};

	// Calculate grid dimensions
	const maxX = Math.max(...seats.map((s) => s.x + (s.width || 1)));
	const maxY = Math.max(...seats.map((s) => s.y + (s.height || 1)));

	return (
		<div className="w-full flex flex-col items-center gap-6">
			<div
				className="relative"
				style={{
					width: `${maxX * SCALE}px`,
					height: `${maxY * SCALE}px`,
				}}
			>
				{seats.map((seat) => (
					<button
						key={seat.id}
						onClick={() => handleSeatClick(seat.id, seat.status)}
						disabled={seat.status === "occupied"}
						className={cn(
							"absolute rounded flex items-center justify-center font-bold text-sm",
							"hover:shadow-lg",
							seat.status === "available"
								? selectedSeat === seat.id
									? "bg-blue-500 text-white border-2 border-blue-600 cursor-pointer"
									: "bg-white text-black border-2 border-gray-400 hover:border-blue-500 cursor-pointer"
								: seat.status === "occupied"
								? "bg-gray-400 text-gray-600 border-2 border-gray-500 cursor-not-allowed opacity-60"
								: "bg-blue-500 text-white border-2 border-blue-600"
						)}
						style={{
							left: `${seat.x * SCALE}px`,
							top: `${seat.y * SCALE}px`,
							width: `${(seat.width || 1) * SCALE - 4}px`,
							height: `${(seat.height || 1) * SCALE - 4}px`,
						}}
						title={
							seat.status === "occupied"
								? "Occupied"
								: `Seat ${seat.id}`
						}
					>
						{seat.id}
					</button>
				))}
			</div>
		</div>
	);
}
