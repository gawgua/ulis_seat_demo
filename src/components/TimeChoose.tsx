import { RadioGroupCard, RadioGroupCardItem } from "./ui/radio-group-card";
import { cn } from "@/lib/utils";

export default function TimeChoose({ 
	timeslot, 
	onTimeSelect, 
	occupiedTimeSlots = [],
	selectedTime 
}: { 
	timeslot: string[], 
	onTimeSelect?: (time: string) => void,
	occupiedTimeSlots?: string[],
	selectedTime?: string
}) {
	return (
		<RadioGroupCard className="grid grid-cols-2 sm:grid-cols-3 gap-2.5" onValueChange={onTimeSelect} value={selectedTime}>
			{timeslot.map((time) => {
				const isOccupied = occupiedTimeSlots.includes(time);
				return (
					<RadioGroupCardItem 
						key={time} 
						value={time} 
						disabled={isOccupied}
						className={cn(
							"h-auto min-h-0 **:data-[slot=card]:py-2",
							isOccupied && "opacity-40 cursor-not-allowed"
						)}
					>
						<p className="px-2 text-center font-semibold text-xs">{time}</p>
					</RadioGroupCardItem>
				);
			})}
		</RadioGroupCard>
	);
}	