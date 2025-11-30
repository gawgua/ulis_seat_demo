import { createContext, useContext, useEffect, useState } from "react";

type Language = "vi" | "en";

type LanguageContextType = {
	language: Language;
	setLanguage: (lang: Language) => void;
	t: (key: string, ...args: (string | number)[]) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
	vi: {
		// App
		"app.footer": "Bản demo cho sinh viên ULIS.",
		"app.feedback": "Góp ý, phản hồi",
		
		// Header
		"header.title": "ULIS Workspace Finder.",
		"header.subtitle": "Lock in your work easier than ever!",
		"header.rule": "1 lượt, 2 giờ, nghỉ 15 phút",
		"header.checkin": "Có thể check-in trực tiếp tại chỗ như bình thường",
		"header.faculty": "Khoa NN&VH Anh",
		
		// Login
		"login.title": "Đăng nhập",
		"login.studentId": "Mã sinh viên",
		"login.password": "Mật khẩu",
		"login.button": "Đăng nhập",
		"login.error": "Vui lòng điền đầy đủ thông tin đăng nhập.",
		"login.demoNote": "Demo có thể điền bất kỳ MSV, mật khẩu nào để đăng nhập",
		"login.ulisEmail": "Đăng nhập bằng ULIS Email",
		
		// Seat Order Card
		"seatOrder.title": "Đặt chỗ trước",
		"seatOrder.description": "Chọn địa điểm, loại bàn và khung giờ",
		"seatOrder.location": "Địa điểm",
		"seatOrder.tableType": "Loại bàn",
		"seatOrder.personal": "Cá nhân",
		"seatOrder.group": "Nhóm",
		"seatOrder.groupSize": "Chọn số người",
		"seatOrder.selectTime": "Chọn khung giờ",
		"seatOrder.timeInfo": "Homies và Thư viện chỉ hoạt động T2 - T6, Căng tin hoạt động full tuần",
		"seatOrder.autoSelect": "Tự động chọn chỗ",
		"seatOrder.confirm": "Xác nhận",
		"seatOrder.details": "Thông tin chi tiết",
		"seatOrder.seatNumber": "Số",
		"seatOrder.time": "Thời gian",
		"seatOrder.notSelected": "Chưa chọn",
		"seatOrder.confirmBooking": "Xác nhận đặt chỗ",
		"seatOrder.bookingSuccess": "Đặt chỗ thành công!",
		"seatOrder.selectTimeFirst": "Vui lòng chọn thời gian trước!",
		"seatOrder.autoSelectSuccess": "Đã tự động chọn {0} chỗ tại bàn {1}!",
		"seatOrder.noSuitableTable": "Không tìm thấy bàn phù hợp!",
		"seatOrder.missingTimeOrSeat": "Chưa chọn thời gian hoặc chỗ ngồi!",
		"seatOrder.selectEnoughSeats": "Vui lòng chọn đủ {0} ghế!",
		"seatOrder.detailInfo": "Thông tin chi tiết",
		"seatOrder.groupWith": "Nhóm ({0} người)",
		"seatOrder.selectPeople": "Chọn số người",
		
		// Seat Map
		"seatMap.title": "Sơ đồ chỗ ngồi",
		"seatMap.empty": "Trống",
		"seatMap.occupied": "Có người",
		"seatMap.picked": "Đã chọn",
		"seatMap.info": "Nếu chỗ ngồi bị làm mờ, bàn đó không phù hợp với số người bạn đang chọn",
		
		// Locations
		"location.library": "Thư viện",
		"location.library.desc": "Tầng 2 tòa C3. Yên tĩnh, nhiều ổ cắm điện, phù hợp cho học tập tập trung.",
		"location.canteen": "Căng tin B2",
		"location.canteen.desc": "Tầng 1 tòa B2. Tiện ăn uống, thoáng mát, bàn lớn cho nhóm.",
		"location.homies_b2": "Homies B2",
		"location.homies_b2.desc": "Tầng 1 tòa B2. Sáng sủa, yên tĩnh, bàn vừa cho 4-5 người.",
		"location.homies_c3": "Homies C3",
		"location.homies_c3.desc": "Tầng 1 tòa C3. Loại chỗ ngồi đa dạng, nhiều ổ cắm điện.",
		"location.homies_danang": "Homies Đa năng",
		"location.homies_danang.desc": "Tầng 2 nhà Đa năng. Chủ yếu chỗ cá nhân, nhiều ổ cắm điện.",
		
		// Personal Info
		"profile.personalInfo": "Thông tin cá nhân",
		"profile.changePassword": "Đổi mật khẩu",
		"profile.bookingHistory": "Lịch sử đặt chỗ",
		"profile.settings": "Cài đặt",
		"profile.name": "Họ và tên",
		"profile.faculty": "Khoa",
		"profile.email": "Email",
		"profile.studentId": "Mã sinh viên",
		"profile.currentPassword": "Mật khẩu hiện tại",
		"profile.newPassword": "Mật khẩu mới",
		"profile.confirmPassword": "Xác nhận mật khẩu mới",
		"profile.updatePassword": "Cập nhật mật khẩu",
		"profile.viewHistory": "Xem các lần đặt chỗ trước đây",
		"profile.completed": "Hoàn thành",
		"profile.cancelled": "Đã hủy",
		"profile.darkMode": "Chế độ tối",
		"profile.darkMode.desc": "Bật/tắt giao diện tối cho ứng dụng",
		"profile.language": "Ngôn ngữ",
		"profile.language.desc": "Chọn ngôn ngữ hiển thị",
		"profile.logout": "Đăng xuất",
		"profile.manageAccount": "Quản lý thông tin tài khoản của bạn",
		"profile.updatePasswordDesc": "Cập nhật mật khẩu của bạn",
		"profile.customizeExp": "Tùy chỉnh trải nghiệm của bạn",
		
		// Statistics
		"stats.title": "Tổng quan hôm nay",
		"stats.totalSeats": "Tổng số chỗ",
		"stats.available": "Còn trống",
		"stats.occupied": "Đang được sử dụng",
		"stats.topSeats": "Bảng vàng học tập",
		
		// Current Seat
		"current.title": "Chỗ đang đặt",
		"current.seat": "Chỗ:",
		"current.time": "Thời gian:",
		"current.type": "Loại:",
		"current.personal": "Cá nhân",
		"current.group": "Nhóm ({0} người)",
		"current.endSession": "Kết thúc",
		"current.endSuccess": "Đã kết thúc phiên làm việc!",
		"current.notYet": "Bắt đầu lúc {0}",
		"current.extendButton": "Gia hạn",
		"current.earlyEndButton": "Kết thúc sớm",
		"current.tableNumber": "Bàn số:",
		"current.seatNumber": "Ghế số:",
		"current.groupSize": "Số người:",
		"current.bookingTime": "Thời gian đặt chỗ:",
		"current.timeRemaining": "Thời gian còn lại:",
		"current.timeUp": "Hết giờ",
		"current.noSeat": "Chưa có chỗ ngồi",
		"current.noSeatLabel": "Chỗ ngồi:",
		"current.extendSuccess": "Đã gia hạn thành công!",
		"current.confirmEndTitle": "Xác nhận kết thúc",
		"current.confirmEndMessage": "Bạn có chắc chắn muốn kết thúc phiên làm việc hiện tại không? Thông tin đặt chỗ sẽ bị xóa.",
		"current.cancel": "Hủy",
		"current.confirm": "Xác nhận",
		"current.confirmExtendTitle": "Xác nhận gia hạn",
		"current.confirmExtendMessage": "Bạn có chắc chắn muốn gia hạn không?",
		"current.newTimeSlot": "Khung giờ mới:",
		"current.noNextSlot": "Không có khung giờ tiếp theo!",
		
		// Landing Page
		"landing.hero.title": "ULIS Workspace Finder",
		"landing.hero.subtitle": "Lock in your work easier than ever!",
		"landing.hero.getStarted": "Bắt đầu ngay",
		"landing.hero.learnMore": "Tìm hiểu thêm",
		"landing.intro.title": "Giới thiệu",
		"landing.intro.p1": "Là một ULISer chăm học, chắc hẳn ai cũng đã từng trải qua một nỗi khổ quen thuộc: hí hửng mang laptop đến Homies thì… hết sạch chỗ, đứng ngơ ngác như nhân vật phụ.",
		"landing.intro.p2": "Giờ đây, với ULIS Workspace Finder, bạn không cần đoán mò nữa. Website của chúng mình sẽ giúp các bạn xem nhanh chỗ nào còn trống, đặt chỗ trước cho chắc kèo, và tiện thể khám phá thêm mấy góc học tập xinh xinh, yên tĩnh, miễn phí mà ít người để ý. Chỉ một cú click là biết ngay hôm nay nên \"đóng đô\" ở đâu cho hợp mood, hợp lịch, hợp cả vibe học tập.",
		"landing.features.title": "Tính năng nổi bật",
		"landing.features.locations.title": "Nhiều địa điểm",
		"landing.features.locations.desc": "Thư viện, căng tin, Homies - chọn không gian phù hợp với nhu cầu của bạn",
		"landing.features.flexible.title": "Đặt chỗ linh hoạt",
		"landing.features.flexible.desc": "Chọn khung giờ phù hợp, đặt trước để đảm bảo có chỗ khi bạn đến",
		"landing.features.group.title": "Cá nhân & Nhóm",
		"landing.features.group.desc": "Hỗ trợ cả làm việc cá nhân và học nhóm với bàn từ 1-8 người",
		"landing.locations.title": "Địa điểm có sẵn",
		"landing.cta.title": "Sẵn sàng bắt đầu?",
		"landing.cta.subtitle": "Đăng nhập ngay để đặt chỗ ngồi yêu thích của bạn",
		"landing.cta.login": "Đăng nhập ngay",

		"reports.title": "Reports",
		"reports.placeholder": "Write your issues or suggestions here...",
		"reports.submit": "Submit Report",
	},
	en: {
		// App
		"app.footer": "Demo for ULIS students.",
		"app.feedback": "Feedback",
		
		// Header
		"header.title": "ULIS Workspace Finder.",
		"header.subtitle": "Lock in your work easier than ever!",
		"header.rule": "1 session, 2 hours, 15 min break",
		"header.checkin": "Direct check-in available as usual",
		"header.faculty": "FELC",
		
		// Login
		"login.title": "Login",
		"login.studentId": "Student ID",
		"login.password": "Password",
		"login.button": "Login",
		"login.error": "Please fill in all login information.",
		"login.demoNote": "Demo - enter any Student ID and password to login",
		"login.ulisEmail": "Login with ULIS Email",
		
		// Seat Order Card
		"seatOrder.title": "Book in Advance",
		"seatOrder.description": "Select location, table type, and time slot",
		"seatOrder.location": "Location",
		"seatOrder.tableType": "Table Type",
		"seatOrder.personal": "Personal",
		"seatOrder.group": "Group",
		"seatOrder.groupSize": "Select group size",
		"seatOrder.selectTime": "Select time slot",
		"seatOrder.timeInfo": "Homies and Library operate Mon-Fri, Canteen operates all week",
		"seatOrder.autoSelect": "Auto Select",
		"seatOrder.confirm": "Confirm",
		"seatOrder.details": "Booking Details",
		"seatOrder.seatNumber": "Seat",
		"seatOrder.time": "Time",
		"seatOrder.notSelected": "Not selected",
		"seatOrder.confirmBooking": "Confirm Booking",
		"seatOrder.bookingSuccess": "Booking successful!",
		"seatOrder.selectTimeFirst": "Please select a time first!",
		"seatOrder.autoSelectSuccess": "Auto-selected {0} seat(s) at table {1}!",
		"seatOrder.noSuitableTable": "No suitable table found!",
		"seatOrder.missingTimeOrSeat": "Time or seat not selected!",
		"seatOrder.selectEnoughSeats": "Please select {0} seats!",
		"seatOrder.detailInfo": "Booking Details",
		"seatOrder.groupWith": "Group ({0} people)",
		"seatOrder.selectPeople": "Select group size",
		
		// Seat Map
		"seatMap.title": "Seat Map",
		"seatMap.empty": "Available",
		"seatMap.occupied": "Occupied",
		"seatMap.picked": "Selected",
		"seatMap.info": "If seats are dimmed, that table doesn't fit your group size",
		
		// Locations
		"location.library": "Library",
		"location.library.desc": "2nd floor, C3 building. Quiet, many power outlets, perfect for focused study.",
		"location.canteen": "B2 Canteen",
		"location.canteen.desc": "1st floor, B2 building. Food nearby, airy, large tables for groups.",
		"location.homies_b2": "Homies B2",
		"location.homies_b2.desc": "1st floor, B2 building. Bright, quiet, medium tables for 4-5 people.",
		"location.homies_c3": "Homies C3",
		"location.homies_c3.desc": "1st floor, C3 building. Diverse seating, many power outlets.",
		"location.homies_danang": "Homies Multi-purpose",
		"location.homies_danang.desc": "2nd floor, Multi-purpose hall. Mainly personal seats, many power outlets.",
		
		// Personal Info
		"profile.personalInfo": "Personal Information",
		"profile.changePassword": "Change Password",
		"profile.bookingHistory": "Booking History",
		"profile.settings": "Settings",
		"profile.name": "Full Name",
		"profile.faculty": "Faculty",
		"profile.email": "Email",
		"profile.studentId": "Student ID",
		"profile.currentPassword": "Current Password",
		"profile.newPassword": "New Password",
		"profile.confirmPassword": "Confirm New Password",
		"profile.updatePassword": "Update Password",
		"profile.viewHistory": "View previous bookings",
		"profile.completed": "Completed",
		"profile.cancelled": "Cancelled",
		"profile.darkMode": "Dark Mode",
		"profile.darkMode.desc": "Toggle dark theme for the app",
		"profile.language": "Language",
		"profile.language.desc": "Select display language",
		"profile.logout": "Logout",
		"profile.manageAccount": "Manage your account information",
		"profile.updatePasswordDesc": "Update your password",
		"profile.customizeExp": "Customize your experience",
		
		// Statistics
		"stats.title": "Today's Overview",
		"stats.totalSeats": "Total Seats",
		"stats.available": "Available",
		"stats.occupied": "In Use",
		"stats.topSeats": "Study Hall of Fame",
		
		// Current Seat
		"current.title": "Current Booking",
		"current.seat": "Seat:",
		"current.time": "Time:",
		"current.type": "Type:",
		"current.personal": "Personal",
		"current.group": "Group ({0} people)",
		"current.endSession": "End Session",
		"current.endSuccess": "Session ended successfully!",
		"current.notYet": "Start at {0}",
		"current.extendButton": "Extend",
		"current.earlyEndButton": "End Early",
		"current.tableNumber": "Table:",
		"current.seatNumber": "Seat:",
		"current.groupSize": "Group size:",
		"current.bookingTime": "Booking time:",
		"current.timeRemaining": "Time remaining:",
		"current.timeUp": "Time's up",
		"current.noSeat": "No seat booked",
		"current.noSeatLabel": "Seat:",
		"current.extendSuccess": "Extended successfully!",
		"current.confirmEndTitle": "Confirm End",
		"current.confirmEndMessage": "Are you sure you want to end the current session? Booking information will be deleted.",
		"current.cancel": "Cancel",
		"current.confirm": "Confirm",
		"current.confirmExtendTitle": "Confirm Extension",
		"current.confirmExtendMessage": "Are you sure you want to extend?",
		"current.newTimeSlot": "New time slot:",
		"current.noNextSlot": "No next time slot available!",
		
		// Landing Page
		"landing.hero.title": "ULIS Workspace Finder",
		"landing.hero.subtitle": "Lock in your work easier than ever!",
		"landing.hero.getStarted": "Get Started",
		"landing.hero.learnMore": "Learn More",
		"landing.intro.title": "Introduction",
		"landing.intro.p1": "As a diligent ULISer, you've probably experienced this familiar struggle: excitedly bringing your laptop to Homies, only to find... no seats left, standing confused like a background character.",
		"landing.intro.p2": "Now, with ULIS Workspace Finder, no more guessing. Our website helps you quickly see available seats, book in advance to secure your spot, and discover beautiful, quiet, free study corners that few notice. Just one click to know where to \"set up camp\" today that fits your mood, schedule, and study vibe.",
		"landing.features.title": "Key Features",
		"landing.features.locations.title": "Multiple Locations",
		"landing.features.locations.desc": "Library, canteen, Homies - choose the space that fits your needs",
		"landing.features.flexible.title": "Flexible Booking",
		"landing.features.flexible.desc": "Choose suitable time slots, book ahead to ensure you have a seat",
		"landing.features.group.title": "Personal & Group",
		"landing.features.group.desc": "Support both individual work and group study with tables for 1-8 people",
		"landing.locations.title": "Available Locations",
		"landing.cta.title": "Ready to Start?",
		"landing.cta.subtitle": "Login now to book your favorite seat",
		"landing.cta.login": "Login Now",

		"reports.title": "Reports",
		"reports.placeholder": "Write your issues or suggestions here...",
		"reports.submit": "Submit Report",
	},
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
	const [language, setLanguage] = useState<Language>(() => {
		const saved = localStorage.getItem("language");
		return (saved as Language) || "vi";
	});

	useEffect(() => {
		localStorage.setItem("language", language);
	}, [language]);

	const t = (key: string, ...args: (string | number)[]): string => {
		let text = translations[language][key as keyof typeof translations.vi] || key;
		
		// Replace placeholders {0}, {1}, etc. with arguments
		args.forEach((arg, index) => {
			text = text.replace(`{${index}}`, String(arg));
		});
		
		return text;
	};

	return (
		<LanguageContext.Provider value={{ language, setLanguage, t }}>
			{children}
		</LanguageContext.Provider>
	);
}

export function useLanguage() {
	const context = useContext(LanguageContext);
	if (!context) {
		throw new Error("useLanguage must be used within LanguageProvider");
	}
	return context;
}
