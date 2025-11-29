import PersonalInfo from "./PersonalInfo";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

export default function Header({ onLogout, name }: { onLogout: () => void, name: string }) {
	return (
		<header className="fixed top-0 z-50 w-full backdrop-blur-sm shadow-sm flex flex-row items-center justify-between gap-4 px-4">
			<div className="hidden lg:flex flex-col">
				<h1 className="text-2xl font-bold text-white">ULIS Workspace Finder.</h1>
				<p className="text-sm text-gray-600 dark:text-[#a0a0a0]">
					Lock in your work easier than ever!
				</p>
			</div>
			<img src="./ulis.svg" alt="ULIS Logo" className="h-12 lg:hidden" />
			<Badge
				variant={"outline"}
				className="bg-blue-50 dark:bg-blue-400 border-blue-700 dark:border-2 hidden lg:flex"
			>
				1 lượt, 2 giờ, nghỉ 15 phút
			</Badge>
			<p className="text-sm text-gray-600 dark:text-[#a0a0a0] hidden lg:block">
				Có thể check-in trực tiếp tại chỗ như bình thường
			</p>
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
								Khoa NN&VH Anh
							</p>
						</div>
					</Badge>
				</DialogTrigger>
				<DialogContent showCloseButton={false} className="max-w-[90vw] landscape:max-w-[70vw] w-full">
					<PersonalInfo onLogout={onLogout} name={name}/>
				</DialogContent>
			</Dialog>
		</header>
	);
}
