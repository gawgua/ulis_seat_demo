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

export default function PersonalInfo({
	onLogout,
	name,
}: {
	onLogout: () => void;
	name: string;
}) {
	const [activeCategory, setActiveCategory] = useState("info");

	const categories = [
		{ id: "info", label: "Thông tin cá nhân" },
		{ id: "password", label: "Đổi mật khẩu" },
		{ id: "history", label: "Lịch sử đặt chỗ" },
		{ id: "settings", label: "Cài đặt" },
	];

	const handleLogout = () => {
		localStorage.removeItem("user");
		onLogout();
	};

	return (
		<div className="flex flex-col gap-6 h-[600px] w-full min-w-[320px] mx-auto relative pb-16 overflow-hidden">
			<div className="flex flex-col md:flex-row gap-6 h-full overflow-y-auto">
				<div className="w-full md:w-48 flex flex-col gap-4">
					<div className="flex flex-col items-center gap-2">
						<Avatar className="w-20 h-20">
							<AvatarImage src="" />
							<AvatarFallback className="bg-linear-to-b from-blue-600 to-blue-300 text-white text-2xl">
								UL
							</AvatarFallback>
						</Avatar>
						<p className="font-semibold text-center">{name}</p>
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
								className="justify-start"
								onClick={() => setActiveCategory(category.id)}
							>
								{category.label}
							</Button>
						))}
					</div>
				</div>

				<div className="flex-1 min-w-0 md:mt-32">
					{activeCategory === "info" && (
						<Card>
							<CardHeader>
								<CardTitle>Thông tin cá nhân</CardTitle>
								<CardDescription>
									Quản lý thông tin tài khoản của bạn
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div>
									<Label>Họ và tên</Label>
									<p className="text-sm mt-1">
										Nguyễn Văn A
									</p>
								</div>
								<div>
									<Label>Khoa</Label>
									<p className="text-sm mt-1">
										Khoa NN&VH Anh
									</p>
								</div>
								<div>
									<Label>Email</Label>
									<p className="text-sm mt-1">
										24xxxxxx@ulis.vnu.edu.vn
									</p>
								</div>
								<div>
									<Label>Mã sinh viên</Label>
									<p className="text-sm mt-1">24xxxxxx</p>
								</div>
							</CardContent>
						</Card>
					)}

					{activeCategory === "password" && (
						<Card>
							<CardHeader>
								<CardTitle>Đổi mật khẩu</CardTitle>
								<CardDescription>
									Cập nhật mật khẩu của bạn
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div>
									<Label>Mật khẩu hiện tại</Label>
									<input
										type="password"
										className="w-full mt-1 px-3 py-2 border rounded-md"
									/>
								</div>
								<div>
									<Label>Mật khẩu mới</Label>
									<input
										type="password"
										className="w-full mt-1 px-3 py-2 border rounded-md"
									/>
								</div>
								<div>
									<Label>Xác nhận mật khẩu mới</Label>
									<input
										type="password"
										className="w-full mt-1 px-3 py-2 border rounded-md"
									/>
								</div>
								<Button>Cập nhật mật khẩu</Button>
							</CardContent>
						</Card>
					)}

					{activeCategory === "history" && (
						<Card>
							<CardHeader>
								<CardTitle>Lịch sử đặt chỗ</CardTitle>
								<CardDescription>
									Xem các lần đặt chỗ trước đây
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
															{item.status === "completed" ? "Hoàn thành" : "Đã hủy"}
														</Badge>
													</div>
													<p className="text-xs text-gray-500">Chỗ: {item.seat} • {item.time}</p>
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
								<CardTitle>Cài đặt</CardTitle>
								<CardDescription>
									Tùy chỉnh trải nghiệm của bạn
								</CardDescription>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-gray-500">
									Tính năng đang được phát triển
								</p>
							</CardContent>
						</Card>
					)}
				</div>
			</div>
			<div className="absolute bottom-0 right-0">
				<Button
					variant="outline"
					className="border-red-500 text-red-500 hover:bg-red-50"
					onClick={handleLogout}
				>
					Đăng xuất
				</Button>
			</div>
		</div>
	);
}
