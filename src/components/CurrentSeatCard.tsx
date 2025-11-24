import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { LOCATION_NAMES } from "@/lib/data";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./ui/dialog";
import { toast } from "sonner";

export default function CurrentSeatCard({
	seatId,
	type,
	groupSize,
	time,
	className,
	onEndSession,
}: {
	seatId: string;
	type: string;
	groupSize: number;
	time: string;
	className?: string;
	onEndSession?: () => void;
}) {
	const handleEndSession = () => {
		localStorage.removeItem("seatBooking");
		onEndSession?.();
		toast.success("Đã kết thúc phiên làm việc!", {
			style: {
				background: '#d1fae5',
				color: '#065f46',
				border: '1px solid #6ee7b7'
			}
		});
	};

	return (<Card className={cn("h-fit", className)}>
		<CardHeader>
			<CardTitle className="text-xl">Phiên hiện tại</CardTitle>
		</CardHeader>
		<Separator />
		<CardContent>
			<div className="space-y-2 text-[16px]">
				{seatId ? (
					<>
						<p>
							<strong>Địa điểm:</strong> {LOCATION_NAMES[type] || type}
						</p>
						{(() => {
							const seats = seatId.split(', ');
							const hasMultipleSeats = seats.length > 1;
							const firstSeat = seats[0];
							const tableNumber = firstSeat.includes('-') ? firstSeat.split('-')[0] : firstSeat;
							
							return (
								<>
									<p>
										<strong>Bàn số:</strong> {tableNumber}
									</p>
									{hasMultipleSeats ? (
										<p>
											<strong>Ghế số:</strong> {seats.map(s => s.includes('-') ? s.split('-')[1] : s).sort().join(', ')}
										</p>
									) : firstSeat.includes('-') && (
										<p>
											<strong>Ghế số:</strong> {firstSeat.split('-')[1]}
										</p>
									)}
								</>
							);
						})()}
						<p>
							<strong>Số người:</strong> {groupSize}
						</p>
						<p>
							<strong>Thời gian đặt chỗ:</strong> {time}
						</p>
					</>
				) : (
					<p>
						<strong>Chỗ ngồi:</strong> Chưa có chỗ ngồi
					</p>
				)}
			</div>
			{seatId && (
				<Dialog>
					<DialogTrigger asChild>
						<Button variant="destructive" className="mt-4 w-fit">
							Kết thúc sớm
						</Button>
					</DialogTrigger>
					<DialogContent
						showCloseButton={true}
						className="max-w-md w-[min(28rem,calc(100vw-2rem))]"
					>
						<div className="space-y-4">
							<h3 className="text-lg font-semibold">
								Xác nhận kết thúc
							</h3>
							<p className="text-sm text-gray-600">
								Bạn có chắc chắn muốn kết thúc phiên làm việc hiện tại không? Thông tin đặt chỗ sẽ bị xóa.
							</p>
							<div className="flex gap-2">
								<DialogClose asChild>
									<Button variant="outline" className="flex-1">
										Hủy
									</Button>
								</DialogClose>
								<DialogClose asChild>
									<Button variant="destructive" className="flex-1" onClick={handleEndSession}>
										Xác nhận
									</Button>
								</DialogClose>
							</div>
						</div>
					</DialogContent>
				</Dialog>
			)}
		</CardContent>
	</Card>);
}
