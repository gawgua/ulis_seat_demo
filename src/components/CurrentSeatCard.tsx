import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { LOCATION_NAMES, SLOT_CONFIG } from "@/lib/data";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./ui/dialog";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { Progress } from "./ui/progress";
import { Slider } from "./ui/slider";
import { useEffect, useState } from "react";

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
	const { t } = useLanguage();
	const [progress, setProgress] = useState(100);
	const [timeLeft, setTimeLeft] = useState("");
	const [isBeforeStart, setIsBeforeStart] = useState(false);
	const [isTimeUp, setIsTimeUp] = useState(false);
	const [extendCountdown, setExtendCountdown] = useState(120); // 2 minutes in seconds
	const [debugTimeOffset, setDebugTimeOffset] = useState(0); // Minutes offset from current time
	const [currentTime, setCurrentTime] = useState(time); // Track current time slot

	// Update currentTime when time prop changes
	useEffect(() => {
		setCurrentTime(time);
	}, [time]);

	useEffect(() => {
		if (!currentTime) return;

		const updateProgress = () => {
			try {
				// Parse the time range (e.g., "06:30 - 08:30")
				const [startTime, endTime] = currentTime.split(' - ');
				const now = new Date();
				// Apply debug time offset
				now.setMinutes(now.getMinutes() + debugTimeOffset);
				
				// Create date objects for start and end times today
				const [startHour, startMinute] = startTime.split(':').map(Number);
				const [endHour, endMinute] = endTime.split(':').map(Number);
				
				const start = new Date();
				start.setHours(startHour, startMinute, 0, 0);
				
				const end = new Date();
				end.setHours(endHour, endMinute, 0, 0);
				
				// Check if current time is before start time
				if (now.getTime() < start.getTime()) {
					setIsBeforeStart(true);
					setProgress(100);
					const timeUntilStart = start.getTime() - now.getTime();
					const hours = Math.floor(timeUntilStart / (1000 * 60 * 60));
					const minutes = Math.floor((timeUntilStart % (1000 * 60 * 60)) / (1000 * 60));
					setTimeLeft(`${hours}h ${minutes}m`);
					return;
				}
				
				setIsBeforeStart(false);
				const totalDuration = end.getTime() - start.getTime();
				const elapsed = now.getTime() - start.getTime();
				
				// Calculate progress (100% at start, 0% at end)
				const currentProgress = Math.max(0, Math.min(100, 100 - (elapsed / totalDuration) * 100));
				setProgress(currentProgress);
				
				// Calculate time left
				const remaining = end.getTime() - now.getTime();
				if (remaining > 0) {
					const hours = Math.floor(remaining / (1000 * 60 * 60));
					const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
					setTimeLeft(`${hours}h ${minutes}m`);
					setIsTimeUp(false);
				} else {
					setTimeLeft(t("current.timeUp"));
					setIsTimeUp(true);
				}
			} catch (error) {
				console.error("Error parsing time:", error);
			}
		};

		updateProgress();
		const interval = setInterval(updateProgress, 60000); // Update every minute

		return () => clearInterval(interval);
	}, [currentTime, debugTimeOffset]);

	useEffect(() => {
		if (!isTimeUp) {
			setExtendCountdown(120); // Reset to 2 minutes
			return;
		}

		const countdownInterval = setInterval(() => {
			setExtendCountdown(prev => {
				if (prev <= 1) {
					handleEndSession();
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(countdownInterval);
	}, [isTimeUp]);
	
	const handleEndSession = () => {
		localStorage.removeItem("seatBooking");
		onEndSession?.();
		toast.success(t("current.endSuccess"), {
			style: {
				background: '#d1fae5',
				color: '#065f46',
				border: '1px solid #6ee7b7'
			}
		});
	};

	const handleExtend = () => {
		// Get the next time slot
		const nextSlot = getNextTimeSlot();
		if (!nextSlot) {
			toast.error(t("current.noNextSlot"), {
				style: {
					background: '#fee2e2',
					color: '#991b1b',
					border: '1px solid #fca5a5'
				}
			});
			return;
		}

		// Update localStorage
		const currentBooking = localStorage.getItem("seatBooking");
		if (currentBooking) {
			const booking = JSON.parse(currentBooking);
			booking.time = nextSlot;
			localStorage.setItem("seatBooking", JSON.stringify(booking));
		}

		toast.success(t("current.extendSuccess"), {
			style: {
				background: '#d1fae5',
				color: '#065f46',
				border: '1px solid #6ee7b7'
			}
		});
		// Update the current time state to trigger re-render
		setCurrentTime(nextSlot);
		setIsTimeUp(false);
	};

	const getNextTimeSlot = (): string | null => {
		const locationKey = type === 'library' ? 'library' : 
						   type.startsWith('homies') ? 'homies' : 'canteen';
		const slots = SLOT_CONFIG[locationKey as keyof typeof SLOT_CONFIG]?.slots || [];
		const currentIndex = slots.indexOf(currentTime);
		
		if (currentIndex === -1 || currentIndex === slots.length - 1) {
			return null; // No next slot
		}
		
		return slots[currentIndex + 1];
	};

	return (<Card className={cn("h-fit", className)}>
		<CardHeader>
			<CardTitle className="text-xl">{t("current.title")}</CardTitle>
		</CardHeader>
		<Separator />
		<CardContent>
			{/* Debug Time Control */}
			<div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg space-y-2">
				<div className="flex justify-between items-center">
					<span className="text-sm font-semibold text-yellow-800">Debug Time Control</span>
					<span className="text-xs text-yellow-700">
						{debugTimeOffset > 0 ? '+' : ''}{debugTimeOffset} min
					</span>
				</div>
				<Slider
					value={[debugTimeOffset]}
					onValueChange={(value) => setDebugTimeOffset(value[0])}
					min={-720}
					max={720}
					step={15}
					className="w-full"
				/>
				<div className="flex justify-between text-xs text-yellow-700">
					<span>-12h</span>
					<span>Now</span>
					<span>+12h</span>
				</div>
			</div>
			<div className="space-y-2 text-[16px]">
				{seatId ? (
					<>
						<p>
							<strong>{t("seatOrder.location")}:</strong> {LOCATION_NAMES[type] || type}
						</p>
						{(() => {
							const seats = seatId.split(', ');
							const hasMultipleSeats = seats.length > 1;
							const firstSeat = seats[0];
							const tableNumber = firstSeat.includes('-') ? firstSeat.split('-')[0] : firstSeat;
							
							return (
								<>
									<p>
										<strong>{t("current.tableNumber")}</strong> {tableNumber}
									</p>
									{hasMultipleSeats ? (
										<p>
											<strong>{t("current.seatNumber")}</strong> {seats.map(s => s.includes('-') ? s.split('-')[1] : s).sort().join(', ')}
										</p>
									) : firstSeat.includes('-') && (
										<p>
											<strong>{t("current.seatNumber")}</strong> {firstSeat.split('-')[1]}
										</p>
									)}
								</>
							);
						})()}
						<p>
							<strong>{t("current.groupSize")}</strong> {groupSize}
						</p>
						<p>
							<strong>{t("current.bookingTime")}</strong> {currentTime}
						</p>
						<div className="mt-4 space-y-2">
							<div className="flex justify-between items-center text-sm">
								<span className="font-semibold">
									{t("current.timeRemaining")}
								</span>
								<span className="font-mono">
									{isBeforeStart ? t("current.notYet", currentTime.split(' - ')[0]) : timeLeft}
								</span>
							</div>
							<Progress value={progress} className="h-2" />
						</div>
					</>
				) : (
					<p>
						<strong>{t("current.noSeatLabel")}</strong> {t("current.noSeat")}
					</p>
				)}
			</div>
			{seatId && (
				<div className="flex gap-2">
					<Dialog>
						<DialogTrigger asChild>
							<Button 
								variant="default" 
								className="mt-4 w-fit"
								disabled={!isTimeUp}
							>
								{t("current.extendButton")}
								{isTimeUp && ` (${Math.floor(extendCountdown / 60)}:${String(extendCountdown % 60).padStart(2, '0')})`}
							</Button>
						</DialogTrigger>
						<DialogContent
							showCloseButton={true}
							className="max-w-md w-[min(28rem,calc(100vw-2rem))]"
						>
							<div className="space-y-4">
								<h3 className="text-lg font-semibold">
									{t("current.confirmExtendTitle")}
								</h3>
								{(() => {
									const nextSlot = getNextTimeSlot();
									return nextSlot ? (
										<>
											<p className="text-sm text-gray-600">
												{t("current.confirmExtendMessage")}
											</p>
											<div className="space-y-1">
												<p className="text-sm">
													<strong>{t("current.newTimeSlot")}</strong> {nextSlot}
												</p>
												<p className="text-sm">
													<strong>{t("current.noSeatLabel")}</strong> {seatId}
												</p>
											</div>
											<div className="flex gap-2">
												<DialogClose asChild>
													<Button variant="outline" className="flex-1">
														{t("current.cancel")}
													</Button>
												</DialogClose>
												<DialogClose asChild>
													<Button className="flex-1" onClick={handleExtend}>
														{t("current.confirm")}
													</Button>
												</DialogClose>
											</div>
										</>
									) : (
										<p className="text-sm text-gray-600">
											{t("current.noNextSlot")}
										</p>
									);
								})()}
							</div>
						</DialogContent>
					</Dialog>
					<Dialog>
						<DialogTrigger asChild>
							<Button variant="destructive" className="mt-4 w-fit">
								{t("current.earlyEndButton")}
							</Button>
						</DialogTrigger>
					<DialogContent
						showCloseButton={true}
						className="max-w-md w-[min(28rem,calc(100vw-2rem))]"
					>
					<div className="space-y-4">
						<h3 className="text-lg font-semibold">
							{t("current.confirmEndTitle")}
						</h3>
						<p className="text-sm text-gray-600">
							{t("current.confirmEndMessage")}
						</p>
						<div className="flex gap-2">
							<DialogClose asChild>
								<Button variant="outline" className="flex-1">
									{t("current.cancel")}
								</Button>
							</DialogClose>
							<DialogClose asChild>
								<Button variant="destructive" className="flex-1" onClick={handleEndSession}>
									{t("current.confirm")}
								</Button>
							</DialogClose>
						</div>
					</div>
					</DialogContent>
				</Dialog>
			</div>
			)}
		</CardContent>
	</Card>);
}
