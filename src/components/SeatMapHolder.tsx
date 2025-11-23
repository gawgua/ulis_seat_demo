import { SEAT_LEGEND } from "@/lib/data";
import { Card, CardContent } from "./ui/card";
import { SeatMap, type SeatMapProps } from "./SeatMap";
import { Info } from "lucide-react";

export default function SeatMapHolder({ seats, onSeatSelect }: SeatMapProps) {
	return (
		<div className="h-full flex flex-col">
			<p className="mb-2">Sơ đồ chỗ ngồi</p>
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
			<p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
				<Info className="w-3 h-3" />
				Nếu chỗ ngồi bị làm mờ, bàn đó không phù hợp với số người bạn đang chọn
			</p>
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
