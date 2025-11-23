import { SEAT_LEGEND } from "@/lib/data";
import { Card, CardContent } from "./ui/card";
import { SeatMap, type SeatMapProps } from "./SeatMap";

export default function SeatMapHolder({ seats, onSeatSelect }: SeatMapProps) {
	return (
		<div className="h-full flex flex-col">
			<p>Sơ đồ chỗ ngồi</p>
			<div className="flex flex-wrap gap-4 mb-2">
				{SEAT_LEGEND.map((item) => (
					<div
						key={item.id}
						className="flex items-center gap-2 text-sm"
					>
						<div
							className={`w-5 h-5 border-2 border-gray-500 rounded-sm ${item.color}`}
						></div>
						<p>{item.label}</p>
					</div>
				))}
			</div>
			<Card className="bg-gray-100 shadow-none border-none flex-1">
				<CardContent>
					<SeatMap
						seats={seats}
						onSeatSelect={onSeatSelect}
					/>
				</CardContent>
			</Card>
		</div>
	);
}
