import { useState } from "react";
import Header from "./components/Header";
import SeatOrderCard from "./components/SeatOrderCard";
import StatisticCard from "./components/StatisticCard";
import LoginForm from "./components/LoginForm";
import { Dialog, DialogContent, DialogTrigger } from "./components/ui/dialog";
import Report from "./components/Report";
import CurrentSeatCard from "./components/CurrentSeatCard";

function App() {
	const [user, setUser] = useState(localStorage.getItem("user") || "");
	const [seatBooking, setSeatBooking] = useState<any>(() => {
		const saved = localStorage.getItem("seatBooking");
		return saved ? JSON.parse(saved) : null;
	});
	
	const handleLogout = () => {
		setUser("");
	};
	
	const handleSeatBooked = () => {
		const saved = localStorage.getItem("seatBooking");
		if (saved) {
			setSeatBooking(JSON.parse(saved));
		}
	};

	return (
		<div className="flex flex-col min-h-screen">
			<main className="pt-15 flex-1 text-sm">
				{user === "" && (
					<div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
						<LoginForm onLogin={setUser} />
					</div>
				)}
				{user !== "" && (
					<div>
				<Header onLogout={handleLogout} name={user} />
				<div className="grid grid-cols-1 landscape:grid-cols-10 gap-4 p-4">
					<SeatOrderCard className="landscape:col-span-6 shadow-[6px_6px_10px_rgba(0,0,0,0.2)]" onSeatBooked={handleSeatBooked} />
					<div className="landscape:col-span-4 space-y-4">
						<StatisticCard className="shadow-[6px_6px_10px_rgba(0,0,0,0.2)]" />
						{seatBooking && (
							<CurrentSeatCard 
								className="shadow-[6px_6px_10px_rgba(0,0,0,0.2)]"
								groupSize={seatBooking.groupSize} 
								seatId={seatBooking.seatId} 
								time={seatBooking.time} 
								type={seatBooking.location}
							/>
						)}
					</div>
				</div>
					</div>
				)}
			</main>

			<footer className="text-xs font-light border-t flex justify-between p-2">
				<span>ULIS Seat - bản demo cho sinh viên ULIS.</span>
				<span>
					<Dialog>
						<DialogTrigger asChild>
							<a className="ml-2 cursor-pointer">
								Góp ý, phản hồi
							</a>
						</DialogTrigger>
						<DialogContent
							showCloseButton={false}
							className="max-w-[90vw] landscape:max-w-[70vw] w-full"
						>
							<Report />
						</DialogContent>
					</Dialog>
				</span>
			</footer>
		</div>
	);
}

export default App;
