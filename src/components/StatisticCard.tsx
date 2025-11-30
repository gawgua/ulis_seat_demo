import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { useState } from "react";
import { MOCK_TOP_SEAT } from "@/lib/data";
import { useLanguage } from "@/contexts/LanguageContext";

export default function StatisticCard({
	className,
}: React.ComponentProps<"div">) {
	const [libraryUsage, _setLibraryUsage] = useState(50);
	const [canteenUsage, _setCanteenUsage] = useState(30);
	const [homiesUsage, _setHomiesUsage] = useState(70);
	const { t } = useLanguage();

	const formatTime = (seconds: number) => {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		return `${hours}h ${minutes}m`;
	};

	const getGradientClass = (value: number) => {
		if (value < 45)
			return "[&_[data-slot=progress-indicator]]:bg-gradient-to-r [&_[data-slot=progress-indicator]]:from-green-400 [&_[data-slot=progress-indicator]]:to-green-600";
		if (value < 70)
			return "[&_[data-slot=progress-indicator]]:bg-gradient-to-r [&_[data-slot=progress-indicator]]:from-yellow-400 [&_[data-slot=progress-indicator]]:to-yellow-600";
		return "[&_[data-slot=progress-indicator]]:bg-gradient-to-r [&_[data-slot=progress-indicator]]:from-red-400 [&_[data-slot=progress-indicator]]:to-red-600";
	};

	return (
		<Card className={cn("h-fit", className)}>
			<CardHeader>
				<CardTitle className="text-xl">{t("stats.title")}</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="grid grid-cols-3 gap-4">
					<Card>
						<CardContent className="space-y-2">
							<CardTitle>{t("location.library")}</CardTitle>
							<p className="text-2xl font-bold">{libraryUsage}% <span className="text-sm font-normal dark:text-white">{t("stats.occupied").toLowerCase()}</span></p>
							<Progress
								value={libraryUsage}
								className={getGradientClass(libraryUsage)}
							/>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="space-y-2">
							<CardTitle>{t("location.canteen")}</CardTitle>
							<p className="text-2xl font-bold">{canteenUsage}% <span className="text-sm font-normal dark:text-white">{t("stats.occupied").toLowerCase()}</span></p>
							<Progress
								value={canteenUsage}
								className={getGradientClass(canteenUsage)}
							/>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="space-y-2">
							<CardTitle>Homies</CardTitle>
							<p className="text-2xl font-bold">{homiesUsage}% <span className="text-sm font-normal dark:text-white">{t("stats.occupied").toLowerCase()}</span></p>
							<Progress
								value={homiesUsage}
								className={getGradientClass(homiesUsage)}
							/>
						</CardContent>
					</Card>
				</div>
				<Card>
					<CardContent className="space-y-4">
						<CardTitle>{t("stats.topSeats")}</CardTitle>
						<div className="space-y-2">
							<div className="grid grid-cols-3 gap-4 font-semibold text-sm border-b pb-2">
								<div>{t("seatOrder.seatNumber")}</div>
								<div>{t("seatOrder.location")}</div>
								<div>{t("stats.occupied")}</div>
							</div>
							{MOCK_TOP_SEAT.map((student) => (
								<div key={student.id} className="grid grid-cols-3 gap-4 text-sm">
									<div>{student.id}</div>
									<div>{student.name}</div>
									<div>{formatTime(student.time)}</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</CardContent>
		</Card>
	);
}
