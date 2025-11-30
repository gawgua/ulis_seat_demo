import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { MOCK_HISTORY } from "@/lib/data";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { useTheme } from "@/contexts/ThemeContext";
import { Switch } from "./ui/switch";
import { useLanguage } from "@/contexts/LanguageContext";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

export default function PersonalInfo({
	onLogout,
	name,
}: {
	onLogout: () => void;
	name: string;
}) {
	const [activeCategory, setActiveCategory] = useState("info");
	const { theme, toggleTheme } = useTheme();
	const { language, setLanguage, t } = useLanguage();

	const categories = [
		{ id: "info", label: t("profile.personalInfo") },
		{ id: "password", label: t("profile.changePassword") },
		{ id: "history", label: t("profile.bookingHistory") },
		{ id: "settings", label: t("profile.settings") },
	];

	const handleLogout = () => {
		localStorage.removeItem("user");
		onLogout();
	};

	return (
		<div className="flex flex-col gap-6 h-[600px] w-full min-w-[320px] mx-auto relative pb-16 overflow-hidden">
			<div className="flex flex-col md:flex-row gap-6 h-full overflow-y-auto overflow-x-hidden">
				<div className="w-full md:w-48 flex flex-col gap-4 shrink-0">
					<div className="flex flex-col items-center gap-2 overflow-hidden">
						<Avatar className="w-20 h-20 shrink-0">
							<AvatarImage src="" />
							<AvatarFallback className="bg-linear-to-b from-blue-600 to-blue-300 text-white text-2xl">
								UL
							</AvatarFallback>
						</Avatar>
						<p className="font-semibold text-center wrap-break-word w-full px-2">{name}</p>
					</div>
					<div className="flex flex-col gap-1">
						{categories.map((category) => (
							<Button
								key={category.id}
								variant={
									activeCategory === category.id
										? "default"
										: "ghost"
								}
								className="justify-start portrait:mr-8"
								onClick={() => setActiveCategory(category.id)}
							>
								{category.label}
							</Button>
						))}
					</div>
				</div>

				<div className="flex-1 min-w-0 md:mt-32 portrait:mr-8">
					{activeCategory === "info" && (
						<Card>
							<CardHeader>
								<CardTitle>{t("profile.personalInfo")}</CardTitle>
								<CardDescription>
									{t("profile.manageAccount")}
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div>
									<Label>{t("profile.name")}</Label>
									<p className="text-sm mt-1">
										Nguyễn Văn A
									</p>
								</div>
								<div>
									<Label>{t("profile.faculty")}</Label>
									<p className="text-sm mt-1">
										{t("header.faculty")}
									</p>
								</div>
								<div>
									<Label>{t("profile.email")}</Label>
									<p className="text-sm mt-1">
										24xxxxxx@ulis.vnu.edu.vn
									</p>
								</div>
								<div>
									<Label>{t("profile.studentId")}</Label>
									<p className="text-sm mt-1">24xxxxxx</p>
								</div>
							</CardContent>
						</Card>
					)}

					{activeCategory === "password" && (
						<Card>
							<CardHeader>
								<CardTitle>{t("profile.changePassword")}</CardTitle>
								<CardDescription>
									{t("profile.updatePasswordDesc")}
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div>
									<Label>{t("profile.currentPassword")}</Label>
									<input
										type="password"
										className="w-full mt-1 px-3 py-2 border rounded-md"
									/>
								</div>
								<div>
									<Label>{t("profile.newPassword")}</Label>
									<input
										type="password"
										className="w-full mt-1 px-3 py-2 border rounded-md"
									/>
								</div>
								<div>
									<Label>{t("profile.confirmPassword")}</Label>
									<input
										type="password"
										className="w-full mt-1 px-3 py-2 border rounded-md"
									/>
								</div>
								<Button>{t("profile.updatePassword")}</Button>
							</CardContent>
						</Card>
					)}

					{activeCategory === "history" && (
						<Card>
							<CardHeader>
								<CardTitle>{t("profile.bookingHistory")}</CardTitle>
								<CardDescription>
									{t("profile.viewHistory")}
								</CardDescription>
							</CardHeader>
							<CardContent>
								<ScrollArea className="h-[280px] pr-4">
									<div className="space-y-3">
										{MOCK_HISTORY.map((item) => (
											<div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
												<div className="flex-1">
													<div className="flex items-center gap-2 mb-1">
														<p className="font-medium text-sm">{item.location}</p>
														<Badge variant={item.status === "completed" ? "default" : "outline"}>
															{item.status === "completed" ? t("profile.completed") : t("profile.cancelled")}
														</Badge>
													</div>
													<p className="text-xs text-gray-500">{t("current.seat")} {item.seat} • {item.time}</p>
													<p className="text-xs text-gray-500">{item.date}</p>
												</div>
											</div>
										))}
									</div>
								</ScrollArea>
							</CardContent>
						</Card>
					)}

					{activeCategory === "settings" && (
						<Card>
							<CardHeader>
								<CardTitle>{t("profile.settings")}</CardTitle>
								<CardDescription>
									{t("profile.customizeExp")}
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								<div className="flex items-center justify-between">
									<div>
										<Label className="text-sm font-medium">{t("profile.darkMode")}</Label>
										<p className="text-xs text-muted-foreground mt-1">
											{t("profile.darkMode.desc")}
										</p>
									</div>
									<Switch
										checked={theme === "dark"}
										onCheckedChange={toggleTheme}
										aria-label="Toggle dark mode"
									/>
								</div>
								<div>
									<div className="mb-2">
										<Label className="text-sm font-medium">{t("profile.language")}</Label>
										<p className="text-xs text-muted-foreground mt-1">
											{t("profile.language.desc")}
										</p>
									</div>
									<Tabs value={language} onValueChange={(val) => setLanguage(val as "vi" | "en")}>
										<TabsList className="w-full">
											<TabsTrigger value="vi" className="flex-1">Tiếng Việt</TabsTrigger>
											<TabsTrigger value="en" className="flex-1">English</TabsTrigger>
										</TabsList>
									</Tabs>
								</div>
							</CardContent>
						</Card>
					)}
				</div>
			</div>
			<div className="absolute bottom-0 right-0">
				<Button
					variant="outline"
					className="border-red-500 text-red-500 hover:bg-red-50 portrait:mr-8"
					onClick={handleLogout}
				>
					{t("profile.logout")}
				</Button>
			</div>
		</div>
	);
}
