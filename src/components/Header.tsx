import PersonalInfo from "./PersonalInfo";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

export default function Header({ onLogout, name }: { onLogout: () => void, name: string }) {
	return (
		<header className="fixed top-0 z-50 w-full backdrop-blur-sm shadow-sm flex flex-row items-center justify-between gap-4 px-4">
			<div className="flex flex-col">
				<h1 className="text-2xl font-bold">ULIS Seat</h1>
				<p className="text-sm text-gray-600">
					Đặt chỗ thư viện - căng tin - Homies
				</p>
			</div>
			<Badge
				variant={"outline"}
				className="bg-blue-50 border-blue-700 hidden md:flex"
			>
				1 lượt, 2 giờ, nghỉ 15 phút
			</Badge>
			<p className="text-sm text-gray-600 hidden md:block">
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
							<p className="text-xs text-gray-600">
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
