"use client";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogClose,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { SeatPositionType } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface DetailedSeat {
	id: string;
	occupied: boolean;
	x: number;
	y: number;
}

interface DetailedSeatDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	tableId: string;
	capacity: number;
	occupiedSeats: SeatPositionType[];
	selectedSeats: string[];
	onSeatsChange: (seatIds: string[]) => void;
	maxSeats: number;
	tableType: string;
}

export function DetailedSeatDialog({
	open,
	onOpenChange,
	tableId,
	capacity,
	occupiedSeats,
	selectedSeats,
	onSeatsChange,
	maxSeats,
	tableType,
}: DetailedSeatDialogProps) {

	// Generate seats based on capacity
	const generateSeats = (): DetailedSeat[] => {
		const seats: DetailedSeat[] = [];
		const pairsCount = Math.floor(capacity / 2);
		const hasOddSeat = capacity % 2 === 1;

		const seatPositions = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] as SeatPositionType[];

		// Add odd seat on the left side, centered vertically (seat A)
		if (hasOddSeat) {
			seats.push({
				id: `${tableId}-A`,
				occupied: occupiedSeats.includes('A'),
				x: 0,
				y: 0.5, // Center vertically
			});
		}

		// Create vertical pairs (opposite seats) starting from seat B
		let seatIndex = hasOddSeat ? 1 : 0;
		for (let i = 0; i < pairsCount; i++) {
			const topSeatPos = seatPositions[seatIndex];
			const bottomSeatPos = seatPositions[seatIndex + 1];
			// Top seat
			seats.push({
				id: `${tableId}-${topSeatPos}`,
				occupied: occupiedSeats.includes(topSeatPos),
				x: i + (hasOddSeat ? 1 : 0), // Offset if there's an odd seat on the left
				y: 0,
			});
			// Bottom seat (opposite)
			seats.push({
				id: `${tableId}-${bottomSeatPos}`,
				occupied: occupiedSeats.includes(bottomSeatPos),
				x: i + (hasOddSeat ? 1 : 0),
				y: 1,
			});
			seatIndex += 2;
		}

		return seats;
	};

	const seats = generateSeats();
	const SCALE = 50; // Pixel size for each seat

	// Calculate grid dimensions
	const maxX = Math.max(...seats.map((s) => s.x)) + 1;
	const maxY = Math.max(...seats.map((s) => s.y)) + 1;

	const handleSeatClick = (seatId: string, occupied: boolean) => {
		if (occupied) return;

		// Check if switching to a different table
		const isFromDifferentTable = selectedSeats.length > 0 && 
			selectedSeats.some(id => {
				const existingTable = id.includes('-') ? id.split('-')[0] : id;
				const currentTable = tableId;
				return existingTable !== currentTable;
			});

		if (tableType === "personal") {
			// Personal mode: single selection
			if (selectedSeats.includes(seatId)) {
				onSeatsChange([]);
			} else {
				// If from different table, clear and select new
				if (isFromDifferentTable) {
					onSeatsChange([seatId]);
				} else {
					onSeatsChange([seatId]);
				}
			}
		} else {
			// Group mode: multiple selections up to maxSeats
			// If from different table, start fresh
			if (isFromDifferentTable) {
				onSeatsChange([seatId]);
			} else {
				if (selectedSeats.includes(seatId)) {
					onSeatsChange(selectedSeats.filter(id => id !== seatId));
				} else if (selectedSeats.length < maxSeats) {
					onSeatsChange([...selectedSeats, seatId]);
				}
			}
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Chọn ghế tại bàn {tableId}</DialogTitle>
				</DialogHeader>
				<div className="flex flex-col items-center gap-4 py-4">
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
								onClick={() => handleSeatClick(seat.id, seat.occupied)}
								disabled={seat.occupied}
								className={cn(
									"absolute rounded-lg flex items-center justify-center font-bold text-sm transition-all",
									"hover:shadow-lg",
									!seat.occupied
										? selectedSeats.includes(seat.id)
											? "bg-blue-500 text-white border-2 border-blue-600 cursor-pointer"
											: "bg-white text-black border-2 border-gray-400 hover:border-blue-500 cursor-pointer"
										: "bg-gray-400 text-gray-600 border-2 border-gray-500 cursor-not-allowed opacity-60"
								)}
								style={{
									left: `${seat.x * SCALE}px`,
									top: `${seat.y * SCALE}px`,
									width: `${SCALE - 4}px`,
									height: `${SCALE - 4}px`,
								}}
								title={
									seat.occupied
										? "Đã có người"
										: `Ghế ${seat.id}`
								}
							>
								{seat.id.split("-").pop()}
							</button>
						))}
					</div>
					<div className="flex gap-4 text-xs text-gray-600 dark:text-[#a0a0a0]">
						<div className="flex items-center gap-2">
							<div className="w-4 h-4 bg-white border-2 border-gray-400 rounded"></div>
							<span>Còn trống</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="w-4 h-4 bg-blue-500 border-2 border-blue-600 rounded"></div>
							<span>Đã chọn</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="w-4 h-4 bg-gray-400 border-2 border-gray-500 rounded"></div>
							<span>Đã có người</span>
						</div>
					</div>
					<div className="flex gap-2 justify-end mt-4">
						<DialogClose asChild>
							<Button variant="outline">Hủy</Button>
						</DialogClose>
						<Button 
							onClick={() => {
								if (tableType === "group" && selectedSeats.length !== maxSeats) {
									toast.warning(`Vui lòng chọn đủ ${maxSeats} ghế!`, {
										style: {
											background: '#fef3c7',
											color: '#92400e',
											border: '1px solid #fcd34d'
										}
									});
								} else if (selectedSeats.length > 0) {
									onOpenChange(false);
								}
							}}
						>
							Xác nhận
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
