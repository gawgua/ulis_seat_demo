import { cn } from "@/lib/utils";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";
import {
	RadioGroupCard,
	RadioGroupCardContent,
	RadioGroupCardItem,
} from "./ui/radio-group-card";
import { Tabs, TabsTrigger, TabsList, TabsContent } from "./ui/tabs";
import { useMemo, useState } from "react";
import TimeChoose from "./TimeChoose";
import { LOCATIONS, SEAT_MAP, SLOT_CONFIG } from "@/lib/data";
import { Slider } from "./ui/slider";
import SeatMapHolder from "./SeatMapHolder";
import { UserRound, UsersRound } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./ui/dialog";
import { toast } from "sonner";

export default function SeatOrderCard({
	className,
	onSeatBooked,
}: React.ComponentProps<"div"> & { onSeatBooked?: () => void }) {
	const [type, setType] = useState("library");
	const [groupSize, setGroupSize] = useState([2]);
	const [selectedTime, setSelectedTime] = useState("");
	const [tableType, setTableType] = useState("personal");
	const [id, setId] = useState("");

	const handleTypeChange = (value: string) => {
		setType(value);
		setId("");
	}

	const handleTableTypeChange = (value: string) => {
		setTableType(value);
		setId("");
	}

	const handleGroupSizeChange = (value: number[]) => {
		setGroupSize(value);
		setId("");
	}

	// Filter seats based on table type and group size
	const filteredSeats = useMemo(() => {
		const allSeats = SEAT_MAP[type as keyof typeof SEAT_MAP];
		
		if (tableType === "personal") {
			// Mark seats with capacity !== 1 as disabled for personal mode
			return allSeats.map(seat => ({
				...seat,
				disabled: seat.capacity !== 1
			}));
		} else {
			// For group mode, disable if remaining available seats < group size
			return allSeats.map(seat => {
				const remainingSeats = (seat.capacity || 0) - seat.occupiedSeats.length;
				const notEnoughRemainingSeats = remainingSeats < groupSize[0];
				return {
					...seat,
					disabled: notEnoughRemainingSeats
				};
			});
		}
	}, [type, tableType, groupSize]);

	const handleConfirmation = () => {
		toast.success("Đặt chỗ thành công!", {
			style: {
				background: '#d1fae5',
				color: '#065f46',
				border: '1px solid #6ee7b7'
			}
		});
		localStorage.setItem("seatBooking", JSON.stringify({
			location: type,
			seatId: id,
			tableType: tableType,
			groupSize: tableType === "group" ? groupSize[0] : 1,
			time: selectedTime,
		}));
		onSeatBooked?.();
	};

	const handleDialogTrigger = (e: React.MouseEvent) => {
		if (!selectedTime || !id) {
			e.preventDefault();
			toast.warning("Chưa chọn thời gian hoặc chỗ ngồi!", {
				style: {
					background: '#fef3c7',
					color: '#92400e',
					border: '1px solid #fcd34d'
				}
			});
		}
	};

	return (
		<Card className={cn("", className)}>
			<CardHeader className="pb-3">
				<CardTitle className="text-xl">Đặt chỗ trước</CardTitle>
				<CardDescription>
					Chọn địa điểm, loại bàn và khung giờ
				</CardDescription>
			</CardHeader>
			<Separator />
			<CardContent className="landscape:grid landscape:grid-cols-2 landscape:gap-4">
				<div className="space-y-4 mb-4 landscape:mb-0">
					<div>
						<p className="mb-2">Địa điểm</p>
						<RadioGroupCard
							defaultValue="library"
							className="grid grid-cols-2 sm:grid-cols-3 gap-4"
							onValueChange={handleTypeChange}
						>
							{LOCATIONS.map((location) => (
								<RadioGroupCardItem
									key={location.id}
									value={location.id}
									className="**:data-[slot=card-content]:p-2 **:data-[slot=card]:h-full"
								>
									<RadioGroupCardContent>
										<div className="flex items-center gap-3 mb-2">
											<div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
												<location.icon className="w-4 h-4" />
											</div>
											<div className="flex-1 min-w-0">
												<p className="font-medium text-xs">
													{location.name}
											</p>
										</div>
									</div>
									<p className="text-xs text-gray-500 text-left">
										{location.description}
									</p>
								</RadioGroupCardContent>
								</RadioGroupCardItem>
							))}
						</RadioGroupCard>
					</div>
					<div>
						<p className="mb-2">Loại bàn</p>
						<Tabs
							defaultValue="personal"
							onValueChange={handleTableTypeChange}
						>
							<TabsList>
								<TabsTrigger
									value="personal"
									className="cursor-pointer"
								>
									<UserRound />
									Cá nhân
								</TabsTrigger>
								<TabsTrigger
									value="group"
									className="cursor-pointer"
								>
									<UsersRound /> Nhóm
								</TabsTrigger>
							</TabsList>
							<TabsContent value="group">
							<p className="mb-2">Chọn số người</p>
							<div className="flex items-center gap-4">
								<Slider
									min={2}
									max={8}
									step={1}
									value={groupSize}
									onValueChange={handleGroupSizeChange}
									className="flex-1"
								/>
									<span className="text-sm font-medium w-8 text-center">
										{groupSize[0]}
									</span>
								</div>
							</TabsContent>
						</Tabs>
					</div>
					<div>
						<p className="mb-2">Chọn khung giờ</p>
						<TimeChoose
							timeslot={
								SLOT_CONFIG[
									type.split("_")[0] as keyof typeof SLOT_CONFIG
								].slots
							}
							onTimeSelect={setSelectedTime}
						/>
					</div>
				</div>
				<div className="landscape:h-full">
					<SeatMapHolder
						seats={filteredSeats}
						onSeatSelect={setId}
					/>
				</div>
				<div className="landscape:col-span-2 flex justify-end mt-4">
					<Dialog>
						<DialogTrigger asChild onClick={handleDialogTrigger}>
							<Button>Xác nhận</Button>
						</DialogTrigger>
						<DialogContent
							showCloseButton={true}
							className="max-w-md w-[min(28rem,calc(100vw-2rem))]"
						>
							<div className="space-y-4">
								<h3 className="text-lg font-semibold">
									Thông tin chi tiết
								</h3>
								<div className="space-y-2 text-sm">
									<p>
										<span className="font-medium">
											Địa điểm:
										</span>{" "}
										{
											LOCATIONS.find((l) => l.id === type)
												?.name
										}
									</p>
									<p>
										<span className="font-medium">
											Số:
										</span>{" "}
										{id || "Chưa chọn"}
									</p>
									<p>
										<span className="font-medium">
											Loại bàn:
										</span>{" "}
										{tableType === "personal"
											? "Cá nhân"
											: `Nhóm (${groupSize[0]} người)`}
									</p>
									<p>
										<span className="font-medium">
											Thời gian:
										</span>{" "}
										{selectedTime || "Chưa chọn"}
									</p>
								</div>
								<DialogClose>
									<Button
										className="w-full"
										onClick={handleConfirmation}
									>
										Xác nhận đặt chỗ
									</Button>
								</DialogClose>
							</div>
						</DialogContent>
					</Dialog>
				</div>
			</CardContent>
		</Card>
	);
}
