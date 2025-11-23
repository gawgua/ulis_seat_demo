import { RadioGroupCard, RadioGroupCardItem } from "./ui/radio-group-card";

export default function TimeChoose({ timeslot, onTimeSelect }: { timeslot: string[], onTimeSelect?: (time: string) => void }) {
	return (
		<RadioGroupCard className="grid grid-cols-2 sm:grid-cols-3 gap-2.5" onValueChange={onTimeSelect}>
			{timeslot.map((time) => (
				<RadioGroupCardItem key={time} value={time} className="h-auto min-h-0 **:data-[slot=card]:py-2">
						<p className="px-2 text-center font-semibold text-xs">{time}</p>
				</RadioGroupCardItem>
			))}
		</RadioGroupCard>
	);
}	