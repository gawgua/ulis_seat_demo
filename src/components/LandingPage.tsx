import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Clock, MapPin, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LOCATIONS } from "@/lib/data";

const HERO_IMAGES = [
	"./landing_1.jpg",
	"./landing_2.jpg",
	"./landing_3.jpg",
	"./landing_4.jpg",
];

export default function LandingPage({ onGetStarted }: { onGetStarted: () => void }) {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [selectedLocationIndex, setSelectedLocationIndex] = useState(LOCATIONS.length);
	const [isTransitioning, setIsTransitioning] = useState(true);
	const { t } = useLanguage();

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
		}, 3000);

		return () => clearInterval(interval);
	}, []);

	// Auto-scroll through locations with infinite loop
	useEffect(() => {
		const interval = setInterval(() => {
			setIsTransitioning(true);
			setSelectedLocationIndex((prev) => prev + 1);
		}, 3000);

		return () => clearInterval(interval);
	}, []);

	// Handle infinite loop reset - reset to middle set when reaching end
	useEffect(() => {
		if (selectedLocationIndex >= LOCATIONS.length * 2) {
			// Disable transitions immediately
			setIsTransitioning(false);
			
			// Wait for the DOM to process the transition disable
			setTimeout(() => {
				setSelectedLocationIndex(LOCATIONS.length);
				
				// Re-enable transitions after the instant reset
				setTimeout(() => {
					setIsTransitioning(true);
				}, 50);
			}, 50);
		}
	}, [selectedLocationIndex]);

	return (
		<div className="min-h-screen flex flex-col">
			{/* Hero Section */}
			<section className="relative flex-1 flex items-center justify-center px-4 py-20 overflow-hidden">
				{/* Background Images */}
				<div className="absolute inset-0 z-0">
					{HERO_IMAGES.map((image, index) => (
						<div
							key={image}
							className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
								index === currentImageIndex
									? "translate-x-0 opacity-100"
									: index === (currentImageIndex - 1 + HERO_IMAGES.length) % HERO_IMAGES.length
									? "-translate-x-full opacity-0"
									: "translate-x-full opacity-0"
							}`}
							style={{
								backgroundImage: `url(${image})`,
								backgroundSize: "cover",
								backgroundPosition: "center",
							}}
						>
							{/* Overlay */}
							<div className="absolute inset-0 bg-linear-to-br from-blue-50/75 to-blue-100/75 dark:from-gray-900/75 dark:to-gray-800/75"></div>
						</div>
					))}
				</div>

				{/* Content */}
				<div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
					<div className="flex justify-center mb-8">
						<img src="./ulis.svg" alt="ULIS Logo" className="h-24" />
					</div>
					<h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">
						{t("landing.hero.title")}
					</h1>
					<p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
						{t("landing.hero.subtitle")}
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
						<Button 
							size="lg" 
							className="text-lg px-8 py-6"
							onClick={onGetStarted}
						>
							{t("landing.hero.getStarted")}
						</Button>
						<Button 
							size="lg" 
							variant="outline"
							className="text-lg px-8 py-6"
							onClick={onGetStarted}
						>
							{t("landing.hero.learnMore")}
						</Button>
					</div>
				</div>
			</section>

			{/* Introduction Section */}
			<section className="py-16 px-4 bg-white dark:bg-gray-900">
				<div className="max-w-4xl mx-auto">
					<h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
						{t("landing.intro.title")}
					</h2>
					<div className="space-y-6 text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
						<p>
							{t("landing.intro.p1")}
						</p>
						<p>
							{t("landing.intro.p2")}
						</p>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
						{t("landing.features.title")}
					</h2>
					<div className="grid md:grid-cols-3 gap-8">
						<Card className="shadow-lg">
							<CardHeader>
								<div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
									<MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
								</div>
								<CardTitle>{t("landing.features.locations.title")}</CardTitle>
								<CardDescription>
									{t("landing.features.locations.desc")}
								</CardDescription>
							</CardHeader>
						</Card>

						<Card className="shadow-lg">
							<CardHeader>
								<div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
									<Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
								</div>
								<CardTitle>{t("landing.features.flexible.title")}</CardTitle>
								<CardDescription>
									{t("landing.features.flexible.desc")}
								</CardDescription>
							</CardHeader>
						</Card>

						<Card className="shadow-lg">
							<CardHeader>
								<div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
									<Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
								</div>
								<CardTitle>{t("landing.features.groupPersonal.title")}</CardTitle>
								<CardDescription>
									{t("landing.features.groupPersonal.desc")}
								</CardDescription>
							</CardHeader>
						</Card>
					</div>
				</div>
			</section>

			{/* Locations Section */}
			<section className="py-16 px-4 bg-white dark:bg-gray-900">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
						{t("landing.locations.title")}
					</h2>
					
					{/* Image Carousel Section */}
					<div className="relative overflow-hidden min-h-[700px] rounded-2xl flex items-end pb-12">
						{/* Background Image */}
						<div className="absolute inset-0 z-0">
							{LOCATIONS.map((location, index) => (
								<div
									key={location.id}
									className={`absolute inset-0 ${isTransitioning ? 'transition-opacity duration-1000' : ''} ${
										index === (selectedLocationIndex % LOCATIONS.length) ? "opacity-100" : "opacity-0"
									}`}
									style={{
										backgroundImage: `url(${location.image})`,
										backgroundSize: "cover",
										backgroundPosition: "center",
									}}
								>
									<div className="absolute inset-0 bg-linear-to-t from-white/95 via-white/80 to-white/60 dark:from-gray-900/95 dark:via-gray-900/80 dark:to-gray-900/60"></div>
								</div>
							))}
						</div>

						<div className="relative z-10 w-full pb-8 px-4">
							{/* Horizontal scrolling carousel */}
							<div className="relative overflow-hidden py-8">
								<div 
									className={`flex gap-6 ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
									style={{
										transform: `translateX(calc(50% - ${selectedLocationIndex * (100 / LOCATIONS.length)}% - ${(100 / LOCATIONS.length) / 2}%))`
									}}
								>
							{[...LOCATIONS, ...LOCATIONS, ...LOCATIONS].map((location, index) => {
								const Icon = location.icon;
								const actualIndex = index % LOCATIONS.length;
								const isSelected = index === selectedLocationIndex;
								
								return (
									<div
										key={`${location.id}-${index}`}
										className="shrink-0 transition-all duration-500"
										style={{
											width: `calc(${100 / LOCATIONS.length}% - ${(LOCATIONS.length - 1) * 24 / LOCATIONS.length}px)`
										}}
										onClick={() => {
											setIsTransitioning(true);
											setSelectedLocationIndex(actualIndex);
										}}
									>
										<Card 
											className={`cursor-pointer transition-all duration-500 h-full ${
												isSelected 
														? "scale-125 shadow-2xl" 
														: "scale-95 hover:scale-100 hover:shadow-lg"
											}`}
										>
											<CardHeader>
												<Icon className={`w-8 h-8 mb-2 transition-colors ${
													isSelected ? "text-blue-600" : "text-blue-500"
												}`} />
												<CardTitle className={isSelected ? "text-blue-600" : ""}>
													{t(`location.${location.id}`)}
												</CardTitle>
											</CardHeader>
											<CardContent>
												<p className={`text-sm ${
													isSelected 
														? "text-gray-800 dark:text-gray-200" 
														: "text-gray-600 dark:text-gray-400"
												}`}>
													{t(`location.${location.id}.desc`)}
												</p>
											</CardContent>
										</Card>
									</div>
								);
							})}
						</div>
					</div>

					{/* Dots indicator */}
					<div className="flex justify-center gap-2 mt-8">
						{LOCATIONS.map((_, index) => (
							<button
								key={index}
								onClick={() => {
									setIsTransitioning(true);
									setSelectedLocationIndex(index);
								}}
								className={`w-2 h-2 rounded-full transition-all ${
									index === (selectedLocationIndex % LOCATIONS.length)
										? "bg-blue-600 w-8" 
										: "bg-gray-400 hover:bg-gray-500"
								}`}
								aria-label={`Go to location ${index + 1}`}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	</section>

			{/* Video Demo Section */}
			<section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
				<div className="max-w-4xl mx-auto">
					<h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
						{t("landing.video.title")}
					</h2>
					<div className="aspect-video w-full rounded-lg overflow-hidden shadow-xl">
						<iframe
							width="100%"
							height="100%"
							src="./hdsd_video.mp4"
							title="Tutorial"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							allowFullScreen
							className="w-full h-full"
						></iframe>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-16 px-4 bg-blue-600 dark:bg-blue-800">
				<div className="max-w-4xl mx-auto text-center space-y-6">
					<h2 className="text-3xl md:text-4xl font-bold text-white">
						{t("landing.cta.title")}
					</h2>
					<p className="text-xl text-blue-100">
						{t("landing.cta.desc")}
					</p>
					<Button 
						size="lg" 
						variant="secondary"
						className="text-lg px-8 py-6"
						onClick={onGetStarted}
					>
						{t("landing.cta.button")}
					</Button>
				</div>
			</section>
		</div>
	);
}
