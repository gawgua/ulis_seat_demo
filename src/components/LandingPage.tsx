import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { LibraryBig, Hamburger, Landmark, Clock, MapPin, Users } from "lucide-react";

export default function LandingPage({ onGetStarted }: { onGetStarted: () => void }) {
	return (
		<div className="min-h-screen flex flex-col">
			{/* Hero Section */}
			<section className="flex-1 flex items-center justify-center px-4 py-20 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
				<div className="max-w-4xl mx-auto text-center space-y-8">
					<div className="flex justify-center mb-8">
						<img src="./ulis.svg" alt="ULIS Logo" className="h-24" />
					</div>
					<h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">
						ULIS Workspace Finder
					</h1>
					<p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
						Lock in your work easier than ever!
					</p>
					<p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
						Đặt chỗ ngồi trước tại thư viện, căng tin và các không gian học tập của ULIS. 
						Tiết kiệm thời gian, tối ưu hóa không gian làm việc của bạn.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
						<Button 
							size="lg" 
							className="text-lg px-8 py-6"
							onClick={onGetStarted}
						>
							Bắt đầu ngay
						</Button>
						<Button 
							size="lg" 
							variant="outline"
							className="text-lg px-8 py-6"
							onClick={onGetStarted}
						>
							Tìm hiểu thêm
						</Button>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-16 px-4 bg-white dark:bg-gray-900">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
						Tính năng nổi bật
					</h2>
					<div className="grid md:grid-cols-3 gap-8">
						<Card className="shadow-lg">
							<CardHeader>
								<div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
									<MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
								</div>
								<CardTitle>Nhiều địa điểm</CardTitle>
								<CardDescription>
									Thư viện, căng tin, Homies - chọn không gian phù hợp với nhu cầu của bạn
								</CardDescription>
							</CardHeader>
						</Card>

						<Card className="shadow-lg">
							<CardHeader>
								<div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
									<Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
								</div>
								<CardTitle>Đặt chỗ linh hoạt</CardTitle>
								<CardDescription>
									Chọn khung giờ phù hợp, đặt trước để đảm bảo có chỗ khi bạn đến
								</CardDescription>
							</CardHeader>
						</Card>

						<Card className="shadow-lg">
							<CardHeader>
								<div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
									<Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
								</div>
								<CardTitle>Cá nhân & Nhóm</CardTitle>
								<CardDescription>
									Hỗ trợ cả làm việc cá nhân và học nhóm với bàn từ 1-8 người
								</CardDescription>
							</CardHeader>
						</Card>
					</div>
				</div>
			</section>

			{/* Locations Section */}
			<section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
						Địa điểm có sẵn
					</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						<Card>
							<CardHeader>
								<LibraryBig className="w-8 h-8 mb-2 text-blue-600" />
								<CardTitle>Thư viện</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									Tầng 2 tòa C3. Yên tĩnh, nhiều ổ cắm điện, phù hợp cho học tập tập trung.
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<Hamburger className="w-8 h-8 mb-2 text-blue-600" />
								<CardTitle>Căng tin B2</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									Tầng 1 tòa B2. Tiện ăn uống, thoáng mát, bàn lớn cho nhóm.
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<Landmark className="w-8 h-8 mb-2 text-blue-600" />
								<CardTitle>Homies B2</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									Tầng 1 tòa B2. Sáng sủa, yên tĩnh, bàn vừa cho 4-5 người.
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<Landmark className="w-8 h-8 mb-2 text-blue-600" />
								<CardTitle>Homies C3</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									Tầng 1 tòa C3. Loại chỗ ngồi đa dạng, nhiều ổ cắm điện.
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<Landmark className="w-8 h-8 mb-2 text-blue-600" />
								<CardTitle>Homies Đa năng</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									Tầng 2 nhà Đa năng. Chủ yếu chỗ cá nhân, nhiều ổ cắm điện.
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
						Sẵn sàng bắt đầu?
					</h2>
					<p className="text-xl text-blue-100">
						Đăng nhập ngay để đặt chỗ ngồi yêu thích của bạn
					</p>
					<Button 
						size="lg" 
						variant="secondary"
						className="text-lg px-8 py-6"
						onClick={onGetStarted}
					>
						Đăng nhập ngay
					</Button>
				</div>
			</section>
		</div>
	);
}
