import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { LibraryBig, Hamburger, Landmark, Clock, MapPin, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const HERO_IMAGES = [
	"./landing_1.jpg",
	"./landing_2.jpg",
	"./landing_3.jpg",
	"./landing_4.jpg",
];

export default function LandingPage({ onGetStarted }: { onGetStarted: () => void }) {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const { t } = useLanguage();

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
		}, 3000);

		return () => clearInterval(interval);
	}, []);

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
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						<Card>
							<CardHeader>
								<LibraryBig className="w-8 h-8 mb-2 text-blue-600" />
								<CardTitle>{t("location.library")}</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									{t("location.library.desc")}
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<Hamburger className="w-8 h-8 mb-2 text-blue-600" />
								<CardTitle>{t("location.canteen")}</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									{t("location.canteen.desc")}
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<Landmark className="w-8 h-8 mb-2 text-blue-600" />
								<CardTitle>{t("location.homies_b2")}</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									{t("location.homies_b2.desc")}
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<Landmark className="w-8 h-8 mb-2 text-blue-600" />
								<CardTitle>{t("location.homies_c3")}</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									{t("location.homies_c3.desc")}
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<Landmark className="w-8 h-8 mb-2 text-blue-600" />
								<CardTitle>{t("location.homies_multi")}</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									{t("location.homies_multi.desc")}
								</p>
							</CardContent>
						</Card>
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
