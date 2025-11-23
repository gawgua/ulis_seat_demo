import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { LOCATION_NAMES } from "@/lib/data";

export default function CurrentSeatCard({
	seatId,
	type,
	groupSize,
	time,
	className,
}: {
	seatId: string;
	type: string;
	groupSize: number;
	time: string;
	className?: string;
}) {
	return (<Card className={cn("h-fit", className)}>
		<CardHeader>
			<CardTitle className="text-xl">Chỗ ngồi hiện tại</CardTitle>
		</CardHeader>
		<Separator />
		<CardContent>
			<div className="space-y-2">
				<p className="text-lg">
					<strong>Chỗ ngồi hiện tại:</strong> {seatId || "Chưa có chỗ ngồi"}
				</p>
				{seatId && (
					<>
						<p className="text-lg">
							<strong>Địa điểm:</strong> {LOCATION_NAMES[type] || type}
						</p>
						<p className="text-lg">
							<strong>Số người:</strong> {groupSize}
						</p>
						<p className="text-lg">
							<strong>Thời gian đặt chỗ:</strong> {time}
						</p>
					</>
				)}
			</div>
		</CardContent>
	</Card>);
}
