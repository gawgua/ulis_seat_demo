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
	selectedSeats: string[];
	onSeatsChange: (seats: string[]) => void;
	maxSeats: number;
	tableType: string;
}

export function SeatMap({ seats, selectedSeats, onSeatsChange, maxSeats, tableType }: SeatMapProps) {
	const [dialogOpen, setDialogOpen] = useState(false);
	const [selectedTable, setSelectedTable] = useState<{ id: string; capacity: number; occupiedSeats: SeatPositionType[] } | null>(null);
	const SCALE = 35; // Each seat block is 40x40 pixels

	useEffect(() => {
		onSeatsChange([]);
	}, [seats]);

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
			// For capacity = 1, handle based on mode
			if (tableType === "personal") {
				// Personal mode: single selection
				if (selectedSeats.includes(seat.id)) {
					onSeatsChange([]);
				} else {
					onSeatsChange([seat.id]);
				}
			} else {
				// Group mode: check if selecting from different table
				if (selectedSeats.length > 0) {
					const firstSeatTable = selectedSeats[0].includes('-') ? selectedSeats[0].split('-')[0] : selectedSeats[0];
					const currentTable = seat.id;
					
					// If selecting from different table, clear previous and start new selection
					if (firstSeatTable !== currentTable && !selectedSeats.includes(seat.id)) {
						onSeatsChange([seat.id]);
						return;
					}
				}
				
				// Multiple selections up to maxSeats
				if (selectedSeats.includes(seat.id)) {
					onSeatsChange(selectedSeats.filter(id => id !== seat.id));
				} else if (selectedSeats.length < maxSeats) {
					onSeatsChange([...selectedSeats, seat.id]);
				}
			}
		}
	};

	const handleDetailedSeatSelect = (seatIds: string[]) => {
		onSeatsChange(seatIds);
		// Only close dialog if correct number of seats selected in group mode
		if (tableType === "personal" && seatIds.length > 0) {
			setDialogOpen(false);
		} else if (tableType === "group" && seatIds.length === maxSeats) {
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
				const isTableSelected = selectedSeats.some(id => id.startsWith(`${seat.id}-`));
				const isSingleSeatSelected = selectedSeats.includes(seat.id);
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
					selectedSeats={selectedSeats}
					onSeatsChange={handleDetailedSeatSelect}
					maxSeats={maxSeats}
					tableType={tableType}
				/>
			)}
		</div>
	);
}
