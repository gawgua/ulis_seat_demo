import PersonalInfo from "./PersonalInfo";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Header({ onLogout, name, hideProfile, onLogoClick }: { onLogout: () => void, name: string, hideProfile: boolean, onLogoClick?: () => void }) {
	const { t } = useLanguage();
	
	return (
		<header className="fixed top-0 z-50 w-full backdrop-blur-sm shadow-sm flex flex-row items-center justify-between gap-4 px-4">
			<div className="hidden lg:flex flex-col cursor-pointer" onClick={onLogoClick}>
				<h1 className="text-2xl font-bold dark:text-white">{t("header.title")}</h1>
				<p className="text-sm text-gray-600 dark:text-[#a0a0a0]">
					{t("header.subtitle")}
				</p>
			</div>
			<img src="./ulis.svg" alt="ULIS Logo" className="h-12 lg:hidden cursor-pointer" onClick={onLogoClick} />
			<Badge
				variant={"outline"}
				className="bg-blue-50 dark:bg-blue-400 border-blue-700 dark:border-2 hidden lg:flex"
			>
				{t("header.rule")}
			</Badge>
			<p className="text-sm text-gray-600 dark:text-[#a0a0a0] hidden lg:block">
				{t("header.checkin")}
			</p>
			{!hideProfile && (
				<Dialog>
				<DialogTrigger asChild>
					<Badge variant={"outline"} className="h-11 cursor-pointer">
						<Avatar>
							<AvatarImage src="" />
							<AvatarFallback className="bg-linear-to-b from-blue-600 to-blue-300 text-white">
								UL
							</AvatarFallback>
						</Avatar>
						<div className="flex flex-col">
							<p className="font-semibold text-sm">
								{name}
							</p>
							<p className="text-xs text-gray-600 dark:text-[#a0a0a0]">
								{t("header.faculty")}
							</p>
						</div>
					</Badge>
				</DialogTrigger>
				<DialogContent showCloseButton={false} className="max-w-[90vw] landscape:max-w-[70vw] w-full">
					<PersonalInfo onLogout={onLogout} name={name}/>
				</DialogContent>
			</Dialog>
			)}
		</header>
	);
}
