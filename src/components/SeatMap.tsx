"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { DetailedSeatDialog } from "./DetailedSeatDialog";
import type { SeatPositionType } from "@/lib/data";

interface SeatItem {
	id: string;
	occupiedSeats: SeatPositionType[];
	x: number;
	y: number;
	width?: number;
	height?: number;
	capacity?: number;
	disabled?: boolean;
}

export interface SeatMapProps {
	seats: SeatItem[];
	onSeatSelect: (seatId: string) => void;
}

export function SeatMap({ seats, onSeatSelect }: SeatMapProps) {
	const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
	const [selectedDetailedSeat, setSelectedDetailedSeat] = useState<string | null>(null);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [selectedTable, setSelectedTable] = useState<{ id: string; capacity: number; occupiedSeats: SeatPositionType[] } | null>(null);
	const SCALE = 35; // Each seat block is 40x40 pixels

	useEffect(() => {
		setSelectedSeat(null);
		setSelectedDetailedSeat(null);
		onSeatSelect("");
	}, [seats, onSeatSelect]);

	const handleSeatClick = (seat: SeatItem) => {
		if (seat.disabled) return;

		// If capacity > 1, open the detailed seat dialog
		if (seat.capacity && seat.capacity > 1) {
			setSelectedTable({ 
				id: seat.id, 
				capacity: seat.capacity,
				occupiedSeats: seat.occupiedSeats 
			});
			setDialogOpen(true);
		} else {
			// For capacity = 1, select directly
			if (selectedSeat === seat.id) {
				setSelectedSeat(null);
				onSeatSelect("");
			} else {
				setSelectedSeat(seat.id);
				onSeatSelect(seat.id);
			}
		}
	};

	const handleDetailedSeatSelect = (seatId: string) => {
		setSelectedDetailedSeat(seatId);
		onSeatSelect(seatId);
		if (seatId) {
			setDialogOpen(false);
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
			{seats.map((seat) => {
				const isTableSelected = selectedDetailedSeat?.startsWith(`${seat.id}-`);
				const isSingleSeatSelected = selectedSeat === seat.id;
				const isFullyOccupied = seat.capacity === seat.occupiedSeats.length;
				return (
				<button
					key={seat.id}
					onClick={() => handleSeatClick(seat)}
					disabled={seat.disabled}
					className={cn(
						"absolute rounded flex items-center justify-center font-bold text-sm",
						!seat.disabled && "hover:shadow-lg",
						seat.disabled
							? "bg-gray-200 text-gray-400 border-2 border-gray-300 cursor-not-allowed opacity-50"
							: !isFullyOccupied
							? (isSingleSeatSelected || isTableSelected)
								? "bg-blue-500 text-white border-2 border-blue-600 cursor-pointer"
								: "bg-white text-black border-2 border-gray-400 hover:border-blue-500 cursor-pointer"
							: isFullyOccupied
							? "bg-gray-400 text-gray-600 border-2 border-gray-500 cursor-not-allowed opacity-60"
							: "bg-blue-500 text-white border-2 border-blue-600"
						)}
						style={{
							left: `${seat.x * SCALE}px`,
							top: `${seat.y * SCALE}px`,
							width: `${(seat.width || 1) * SCALE - 4}px`,
							height: `${(seat.height || 1) * SCALE - 4}px`,
						}}
						title={seat.disabled ? "Not available" : `Seat ${seat.id}`}
					>
						{seat.id}
					</button>
				);
				})}
			</div>

			{selectedTable && (
				<DetailedSeatDialog
					open={dialogOpen}
					onOpenChange={setDialogOpen}
					tableId={selectedTable.id}
					capacity={selectedTable.capacity}
					occupiedSeats={selectedTable.occupiedSeats}
					onSeatSelect={handleDetailedSeatSelect}
				/>
			)}
		</div>
	);
}
