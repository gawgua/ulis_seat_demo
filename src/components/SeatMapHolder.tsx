import { SEAT_LEGEND } from "@/lib/data";
import { Card, CardContent } from "./ui/card";
import { SeatMap } from "./SeatMap";
import { Info } from "lucide-react";
import type { SeatMapProps } from "./SeatMap";
import { useLanguage } from "@/contexts/LanguageContext";

export default function SeatMapHolder({ seats, selectedSeats, onSeatsChange, maxSeats, tableType }: SeatMapProps) {
	const { t } = useLanguage();
	
	return (
		<div className="h-full flex flex-col">
			<p className="mb-2">{t("seatMap.title")}</p>
			<div className="flex flex-wrap gap-4 mb-2">
				{SEAT_LEGEND.map((item) => (
					<div
						key={item.id}
						className="flex items-center gap-2 text-sm"
					>
						<div
							className={`w-5 h-5 border-2 border-gray-500 rounded-sm ${item.color}`}
						></div>
						<p>{t(`seatMap.${item.id}`)}</p>
					</div>
				))}
			</div>
			<p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
				<Info className="w-3 h-3" />
				{t("seatMap.info")}
			</p>
			<Card className="bg-gray-100 dark:bg-[#101010] shadow-none border-none flex-1">
				<CardContent>
					<SeatMap
						seats={seats}
						selectedSeats={selectedSeats}
						onSeatsChange={onSeatsChange}
						maxSeats={maxSeats}
						tableType={tableType}
					/>
				</CardContent>
			</Card>
		</div>
	);
}
