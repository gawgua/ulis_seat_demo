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
import { LOCATIONS, SEAT_MAP, SeatPosition, SLOT_CONFIG } from "@/lib/data";
import { Slider } from "./ui/slider";
import SeatMapHolder from "./SeatMapHolder";
import { Info, UserRound, UsersRound, Wand } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./ui/dialog";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

export default function SeatOrderCard({
	className,
	onSeatBooked,
}: React.ComponentProps<"div"> & { onSeatBooked?: () => void }) {
	const { t } = useLanguage();
	const [type, setType] = useState("library");
	const [groupSize, setGroupSize] = useState([2]);
	const [selectedTime, setSelectedTime] = useState("");
	const [tableType, setTableType] = useState("personal");
	const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

	const handleTypeChange = (value: string) => {
		setType(value);
		setSelectedSeats([]);
	};

	const handleTableTypeChange = (value: string) => {
		setTableType(value);
		setSelectedSeats([]);
	};

	const handleGroupSizeChange = (value: number[]) => {
		setGroupSize(value);
		setSelectedSeats([]);
	};

	// Filter seats based on table type and group size
	const filteredSeats = useMemo(() => {
		const allSeats = SEAT_MAP[type as keyof typeof SEAT_MAP];

		return allSeats.map((seat) => {
			const neededSeats = tableType === "group" ? groupSize[0] : 1;
			const remainingSeats =
				(seat.capacity || 0) - seat.occupiedSeats.length;
			return {
				...seat,
				disabled: remainingSeats < neededSeats,
			};
		});
	}, [type, tableType, groupSize]);

	const handleConfirmation = () => {
		toast.success(t("seatOrder.bookingSuccess"), {
			style: {
				background: "#d1fae5",
				color: "#065f46",
				border: "1px solid #6ee7b7",
			},
		});
		localStorage.setItem(
			"seatBooking",
			JSON.stringify({
				location: type,
				seatId: selectedSeats.join(", "),
				tableType: tableType,
				groupSize: tableType === "group" ? groupSize[0] : 1,
				time: selectedTime,
			})
		);
		onSeatBooked?.();
	};

	const handleAutoSelect = (e: React.MouseEvent) => {
		if (!selectedTime) {
			e.preventDefault();
			toast.warning(t("seatOrder.selectTimeFirst"), {
				style: {
					background: "#fef3c7",
					color: "#92400e",
					border: "1px solid #fcd34d",
				},
			});
			return;
		}

		const requiredSeats = tableType === "group" ? groupSize[0] : 1;

		// Get all possible seat positions
		const allSeatPositions = Object.values(SeatPosition);

		// Find a table that has enough consecutive available seats
		for (const seat of filteredSeats) {
			if (seat.disabled) continue;

			const availableSeats = allSeatPositions.filter(
				(s) => !seat.occupiedSeats.includes(s)
			);

			if (availableSeats.length >= requiredSeats) {
				// Select the required number of seats from this table with table number prefix
				const selectedFromTable = availableSeats.slice(
					0,
					requiredSeats
				).map(seatPos => `${seat.id}-${seatPos}`);
				setSelectedSeats(selectedFromTable);

				toast.success(
					t("seatOrder.autoSelectSuccess", requiredSeats, seat.id),
					{
						style: {
							background: "#d1fae5",
							color: "#065f46",
							border: "1px solid #6ee7b7",
						},
					}
				);
				return;
			}
		}

		// If no suitable table found
		e.preventDefault();
		toast.error(t("seatOrder.noSuitableTable"), {
			style: {
				background: "#fee2e2",
				color: "#991b1b",
				border: "1px solid #fca5a5",
			},
		});
	};

	const handleDialogTrigger = (e: React.MouseEvent) => {
		const requiredSeats = tableType === "group" ? groupSize[0] : 1;
		if (!selectedTime || selectedSeats.length === 0) {
			e.preventDefault();
			toast.warning(t("seatOrder.missingTimeOrSeat"), {
				style: {
					background: "#fef3c7",
					color: "#92400e",
					border: "1px solid #fcd34d",
				},
			});
		} else if (
			tableType === "group" &&
			selectedSeats.length !== requiredSeats
		) {
			e.preventDefault();
			toast.warning(t("seatOrder.selectEnoughSeats", requiredSeats), {
				style: {
					background: "#fef3c7",
					color: "#92400e",
					border: "1px solid #fcd34d",
				},
			});
		}
	};

	return (
		<Card className={cn("", className)}>
			<CardHeader className="pb-3">
				<CardTitle className="text-xl">{t("seatOrder.title")}</CardTitle>
				<CardDescription>
					{t("seatOrder.description")}
				</CardDescription>
			</CardHeader>
			<Separator />
			<CardContent className="landscape:grid landscape:grid-cols-2 landscape:gap-4">
				<div className="space-y-4 mb-4 landscape:mb-0">
					<div>
						<p className="mb-2">{t("seatOrder.location")}</p>
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
												<location.icon className="w-4 h-4 dark:text-blue-500" />
											</div>
											<div className="flex-1 min-w-0">
												<p className="font-medium text-xs">
													{location.name}
												</p>
											</div>
										</div>
										<p className="text-xs text-gray-500 dark:text-[#a0a0a0] group-data-[state=checked]:dark:text-white text-left">
											{t(location.description)}
										</p>
									</RadioGroupCardContent>
								</RadioGroupCardItem>
							))}
						</RadioGroupCard>
					</div>
					<div>
						<p className="mb-2">{t("seatOrder.tableType")}</p>
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
									{t("seatOrder.personal")}
								</TabsTrigger>
								<TabsTrigger
									value="group"
									className="cursor-pointer"
								>
									<UsersRound /> {t("seatOrder.group")}
								</TabsTrigger>
							</TabsList>
							<TabsContent value="group">
								<p className="mb-2">{t("seatOrder.selectPeople")}</p>
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
						<p className="mb-2">{t("seatOrder.selectTime")}</p>
						<p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
							<Info className="w-3 h-3" />
							{t("seatOrder.timeInfo")}
						</p>
						<TimeChoose
							timeslot={
								SLOT_CONFIG[
									type.split(
										"_"
									)[0] as keyof typeof SLOT_CONFIG
								].slots
							}
							onTimeSelect={setSelectedTime}
						/>
					</div>
				</div>
				<div className="landscape:h-full">
					<SeatMapHolder
						seats={filteredSeats}
						selectedSeats={selectedSeats}
						onSeatsChange={setSelectedSeats}
						maxSeats={tableType === "group" ? groupSize[0] : 1}
						tableType={tableType}
					/>
				</div>
				<div className="landscape:col-span-2 flex justify-end gap-2 mt-4">
					<Dialog>
						<DialogTrigger asChild onClick={handleAutoSelect}>
							<Button className="bg-blue-400 hover:bg-blue-300 dark:text-white">
								<Wand />
								{t("seatOrder.autoSelect")}
							</Button>
						</DialogTrigger>
						<DialogTrigger asChild onClick={handleDialogTrigger}>
							<Button>{t("seatOrder.confirm")}</Button>
						</DialogTrigger>
						<DialogContent
							showCloseButton={true}
							className="max-w-md w-[min(28rem,calc(100vw-2rem))]"
						>
							<div className="space-y-4">
								<h3 className="text-lg font-semibold">
									{t("seatOrder.detailInfo")}
								</h3>
								<div className="space-y-2 text-sm">
									<p>
										<span className="font-medium">
											{t("seatOrder.location")}:
										</span>{" "}
										{
											LOCATIONS.find((l) => l.id === type)
												?.name
										}
									</p>
									<p>
										<span className="font-medium">{t("seatOrder.seatNumber")}:</span>{" "}
										{selectedSeats.join(", ") ||
											t("seatOrder.notSelected")}
									</p>
									<p>
										<span className="font-medium">
											{t("seatOrder.tableType")}:
										</span>{" "}
										{tableType === "personal"
											? t("seatOrder.personal")
											: t("seatOrder.groupWith", groupSize[0])}
									</p>
									<p>
										<span className="font-medium">
											{t("seatOrder.time")}:
										</span>{" "}
										{selectedTime || t("seatOrder.notSelected")}
									</p>
								</div>
								<DialogClose>
									<Button
										className="w-full"
										onClick={handleConfirmation}
									>
										{t("seatOrder.confirmBooking")}
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
