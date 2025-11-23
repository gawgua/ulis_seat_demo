import { Hamburger, Landmark, LibraryBig } from "lucide-react";

export const LOCATION_NAMES: Record<string, string> = {
	library: "Thư viện",
	canteen: "Căng tin B2",
	homies_b2: "Homies B2",
	homies_c3: "Homies C3",
	homies_multi: "Homies Đa năng",
};

export const SLOT_CONFIG = {
	library: {
		slots: [
			"06:30 - 08:30",
			"08:30 - 10:30",
			"10:30 - 12:30",
			"12:30 - 14:30",
			"14:30 - 16:30",
			"16:30 - 18:30",
			"18:30 - 20:30",
			"20:30 - 22:00",
		],
	},
	homies: {
		slots: [
			"06:30 - 08:30",
			"08:30 - 10:30",
			"10:30 - 12:30",
			"12:30 - 14:30",
			"14:30 - 16:30",
			"16:30 - 18:30",
			"18:30 - 20:30",
		],
	},
	canteen: {
		slots: [
			"06:30 - 08:30",
			"08:30 - 10:30",
			"10:30 - 12:30",
			"12:30 - 14:30",
			"14:30 - 16:30",
			"16:30 - 18:30",
		],
	},
};

export const LOCATIONS = [
	{ id: "library", name: "Thư viện", icon: LibraryBig },
	{ id: "canteen", name: "Căng tin B2", icon: Hamburger },
	{ id: "homies_b2", name: "Homies B2", icon: Landmark },
	{ id: "homies_c3", name: "Homies C3", icon: Landmark },
	{ id: "homies_multi", name: "Homies Đa năng", icon: Landmark },
];

const HOMIES_C3_SEAT_MAP = [
	// Section A - Left side
	{ id: "36", status: "occupied" as const, x: 0, y: 0, capacity: 1 },
	{ id: "35", status: "occupied" as const, x: 0, y: 1, capacity: 1 },
	{ id: "34", status: "occupied" as const, x: 0, y: 2, capacity: 1 },
	{ id: "33", status: "available" as const, x: 0, y: 3, capacity: 1 },
	{ id: "32", status: "occupied" as const, x: 0, y: 4, capacity: 1 },
	{ id: "6", status: "available" as const, x: 0, y: 6, width: 2, capacity: 5 },
	{ id: "5", status: "available" as const, x: 0, y: 7, width: 2, capacity: 5 },
	{ id: "4", status: "available" as const, x: 3.75, y: 5, capacity: 1 },
	{ id: "3", status: "occupied" as const, x: 3.75, y: 6, capacity: 1 },
	{ id: "2", status: "available" as const, x: 3.75, y: 7, capacity: 1 },
	{ id: "1", status: "occupied" as const, x: 3.75, y: 8, capacity: 1 },
	{ id: "29", status: "available" as const, x: 2.75, y: 0, width: 2, height: 2, capacity: 8 },
	{ id: "30", status: "available" as const, x: 2, y: 2.25, width: 1.5, capacity: 5 },
	{ id: "31", status: "available" as const, x: 3.5, y: 4, width: 1.5, capacity: 5 },
	{ id: "26", status: "occupied" as const, x: 5.5, y: 0, capacity: 1 },
	{ id: "24", status: "occupied" as const, x: 6.5, y: 0, capacity: 1 },
	{ id: "23", status: "occupied" as const, x: 9, y: 0, capacity: 1 },
	{ id: "25", status: "available" as const, x: 6, y: 1, capacity: 1 },
	{ id: "27", status: "occupied" as const, x: 5, y: 2, capacity: 1 },
	{ id: "22", status: "available" as const, x: 9, y: 1, capacity: 1 },
	{ id: "28", status: "occupied" as const, x: 5, y: 3, capacity: 1 },
	{ id: "19", status: "occupied" as const, x: 8, y: 2.5, capacity: 1 },
	{ id: "20", status: "available" as const, x: 9, y: 2, capacity: 1 },
	{ id: "18", status: "available" as const, x: 6.5, y: 3, width: 1.5, capacity: 5 },
	{ id: "21", status: "occupied" as const, x: 9, y: 3, capacity: 1 },
	{ id: "17", status: "occupied" as const, x: 5, y: 5, capacity: 1 },
	{ id: "16", status: "available" as const, x: 6, y: 5, capacity: 1 },
	{ id: "15", status: "occupied" as const, x: 9, y: 5, capacity: 1 },
	{ id: "14", status: "occupied" as const, x: 9, y: 6, capacity: 1 },
	{ id: "7", status: "available" as const, x: 5, y: 6.5, width: 2, height: 2, capacity: 8 },
	{ id: "8", status: "available" as const, x: 7, y: 6.5, width: 2, height: 2, capacity: 8 },
	{ id: "10", status: "available" as const, x: 5, y: 8.5, width: 2, height: 2, capacity: 8 },
	{ id: "9", status: "available" as const, x: 7, y: 8.5, width: 2, height: 2, capacity: 8 },
	{ id: "13", status: "occupied" as const, x: 9, y: 7, capacity: 1 },
	{ id: "12", status: "available" as const, x: 9, y: 8, capacity: 1 },
	{ id: "11", status: "occupied" as const, x: 9, y: 9, capacity: 1 },
];

const HOMIES_B2_SEAT_MAP = [
	{ id: "27", status: "available" as const, x: 0, y: 0, width: 1.5, capacity: 5 },
	{ id: "28", status: "occupied" as const, x: 1.5, y: 0, width: 1.5, capacity: 5 },
	{ id: "29", status: "available" as const, x: 3, y: 0, width: 1.5, capacity: 5 },
	{ id: "26", status: "occupied" as const, x: 0, y: 1, width: 1.5, capacity: 5 },
	{ id: "25", status: "occupied" as const, x: 1.5, y: 1, width: 1.5, capacity: 5 },
	{ id: "24", status: "available" as const, x: 3, y: 1, width: 1.5, capacity: 5 },
	{ id: "17", status: "occupied" as const, x: 0, y: 2, width: 1.5, capacity: 5 },
	{ id: "18", status: "available" as const, x: 1.5, y: 2, width: 1.5, capacity: 5 },
	{ id: "19", status: "available" as const, x: 3, y: 2, width: 1.5, capacity: 5 },
	{ id: "16", status: "occupied" as const, x: 0, y: 3, width: 1.5, capacity: 5 },
	{ id: "15", status: "available" as const, x: 1.5, y: 3, width: 1.5, capacity: 5 },
	{ id: "14", status: "available" as const, x: 3, y: 3, width: 1.5, capacity: 5 },
	{ id: "7", status: "available" as const, x: 0, y: 4, width: 1.5, capacity: 5 },
	{ id: "8", status: "available" as const, x: 1.5, y: 4, width: 1.5, capacity: 5 },
	{ id: "9", status: "occupied" as const, x: 3, y: 4, width: 1.5, capacity: 5 },
	{ id: "6", status: "available" as const, x: 0, y: 5, width: 1.5, capacity: 5 },
	{ id: "5", status: "available" as const, x: 1.5, y: 5, width: 1.5, capacity: 5 },
	{ id: "4", status: "occupied" as const, x: 3, y: 5, width: 1.5, capacity: 5 },
	{ id: "33", status: "available" as const, x: 5.75, y: 0, width: 1.5, capacity: 5 },
	{ id: "32", status: "available" as const, x: 7.25, y: 0, width: 1.5, capacity: 5 },
	{ id: "30", status: "occupied" as const, x: 5.75, y: 1, width: 1.5, capacity: 5 },
	{ id: "31", status: "available" as const, x: 7.25, y: 1, width: 1.5, capacity: 5 },
	{ id: "23", status: "occupied" as const, x: 5.75, y: 2, width: 1.5, capacity: 5 },
	{ id: "22", status: "available" as const, x: 7.25, y: 2, width: 1.5, capacity: 5 },
	{ id: "20", status: "available" as const, x: 5.75, y: 3, width: 1.5, capacity: 5 },
	{ id: "21", status: "occupied" as const, x: 7.25, y: 3, width: 1.5, capacity: 5 },
	{ id: "13", status: "available" as const, x: 5.75, y: 4, width: 1.5, capacity: 5 },
	{ id: "12", status: "available" as const, x: 7.25, y: 4, width: 1.5, capacity: 5 },
	{ id: "10", status: "occupied" as const, x: 5.75, y: 5, width: 1.5, capacity: 5 },
	{ id: "11", status: "available" as const, x: 7.25, y: 5, width: 1.5, capacity: 5 },
	{ id: "3", status: "occupied" as const, x: 5.75, y: 6, width: 1.5, capacity: 5 },
	{ id: "2", status: "available" as const, x: 7.25, y: 6, width: 1.5, capacity: 5 },
	{ id: "1", status: "available" as const, x: 6.5, y: 7, width: 1.5, capacity: 5 },
];

const CANTEEN_SEAT_MAP = [
	{ id: "1", status: "occupied" as const, x: 1.75, y: 6.75, capacity: 1 },
	{ id: "2", status: "available" as const, x: 1.75, y: 5.75, capacity: 1 },
	{ id: "3", status: "occupied" as const, x: 0, y: 6.25, width: 1.5, capacity: 1 },
	{ id: "4", status: "available" as const, x: 1.75, y: 3.5, width: 2, height:2, capacity: 1 },
	{ id: "5", status: "available" as const, x: 0, y: 4.75, width: 1.5, capacity: 1 },
	{ id: "6", status: "available" as const, x: 0, y: 2.75, width: 1.5, capacity: 1 },
	{ id: "7", status: "occupied" as const, x: 1.75, y: 2.25, width: 1.5, capacity: 1 },
	{ id: "8", status: "available" as const, x: 1.75, y: 0, width: 2, height:2, capacity: 1 },
	{ id: "9", status: "occupied" as const, x: 0, y: 1, width: 1.5, capacity: 5 },
	{ id: "10", status: "available" as const, x: 0, y: 0, width: 1.5, capacity: 5 },
	{ id: "18", status: "available" as const, x: 6.5, y: 0, height: 1.5, capacity: 1 },
	{ id: "15", status: "available" as const, x: 6.5, y: 2.25, height: 1.5, capacity: 1 },
	{ id: "14", status: "occupied" as const, x: 6.5, y: 4, height: 1.5, capacity: 1 },
	{ id: "11", status: "available" as const, x: 6.5, y: 6.25, height: 1.5, capacity: 1 },
	{ id: "17", status: "available" as const, x: 8, y: 0.5, width: 1.5, capacity: 5 },
	{ id: "16", status: "occupied" as const, x: 8, y: 2.25, width: 1.5, capacity: 5 },
	{ id: "13", status: "occupied" as const, x: 8, y: 3.75, width: 1.5, capacity: 5 },
	{ id: "12", status: "available" as const, x: 8, y: 5.75, width: 1.5, capacity: 5 },

]

const HOMIES_MULTI_SEAT_MAP = [
	{ id: "11", status: "available" as const, x: 0, y: 0, capacity: 1 },
	{ id: "10", status: "occupied" as const, x: 0, y: 1, capacity: 1 },
	{ id: "9", status: "available" as const, x: 0, y: 2, capacity: 1 },
	{ id: "8", status: "available" as const, x: 0, y: 3, capacity: 1 },
	{ id: "7", status: "available" as const, x: 0, y: 4, capacity: 1 },
	{ id: "6", status: "available" as const, x: 0, y: 5, capacity: 1 },
	{ id: "5", status: "occupied" as const, x: 0, y: 6, capacity: 1 },
	{ id: "4", status: "available" as const, x: 0, y: 7, capacity: 1 },
	{ id: "3", status: "occupied" as const, x: 0, y: 8, capacity: 1 },
	{ id: "2", status: "available" as const, x: 0, y: 9, capacity: 1 },
	{ id: "1", status: "occupied" as const, x: 0, y: 10, capacity: 1 },
	{ id: "12", status: "available" as const, x: 5, y: 2, width: 1.5, capacity: 5 },
	{ id: "13", status: "occupied" as const, x: 5, y: 3.5, width: 1.5, capacity: 5 },
	{ id: "14", status: "available" as const, x: 5, y: 5, width: 1.5, capacity: 5 },
];

const LIBRARY_SEAT_MAP = [
	{ id: "4", status: "available" as const, x: 6, y: 0, capacity: 1 },
	{ id: "5", status: "occupied" as const, x: 7, y: 0, capacity: 1 },
	{ id: "6", status: "available" as const, x: 8, y: 0, capacity: 1 },
	{ id: "7", status: "available" as const, x: 8, y: 1, capacity: 1 },
	{ id: "3", status: "occupied" as const, x: 6, y: 1.75, capacity: 1 },
	{ id: "8", status: "available" as const, x: 4, y: 1.75, capacity: 1 },
	{ id: "2", status: "available" as const, x: 5, y: 3.75, capacity: 1 },
	{ id: "1", status: "available" as const, x: 5, y: 5.75, capacity: 1 },
	{ id: "17", status: "available" as const, x: 0, y: 5.75, capacity: 1 },
	{ id: "18", status: "occupied" as const, x: 1, y: 5.75, capacity: 1 },
	{ id: "16", status: "available" as const, x: 0, y: 6.75, capacity: 1 },
	{ id: "15", status: "occupied" as const, x: 1, y: 6.75, capacity: 1 },
	{ id: "13", status: "available" as const, x: 0, y: 7.75, capacity: 1 },
	{ id: "14", status: "occupied" as const, x: 1, y: 7.75, capacity: 1 },
	{ id: "12", status: "available" as const, x: 0, y: 8.75, capacity: 1 },
	{ id: "11", status: "available" as const, x: 1, y: 8.75, capacity: 1 },
	{ id: "10", status: "available" as const, x: 3.5, y: 8, capacity: 1 },
	{ id: "9", status: "occupied" as const, x: 5.5, y: 8, capacity: 1 },
	{ id: "19", status: "available" as const, x: 0, y: 10.5, capacity: 1 },
	{ id: "20", status: "available" as const, x: 1.5, y: 10.5, capacity: 1 },
	{ id: "21", status: "available" as const, x: 3, y: 10.5, capacity: 1 },
	{ id: "22", status: "available" as const, x: 4.5, y: 10.5, capacity: 1 },
	{ id: "23", status: "occupied" as const, x: 6, y: 10.5, capacity: 1 },
	{ id: "24", status: "available" as const, x: 7.5, y: 10.5, capacity: 1 },
];

export const SEAT_MAP = {
	library: LIBRARY_SEAT_MAP, // To be filled with actual seat data
	canteen: CANTEEN_SEAT_MAP, // To be filled with actual seat data
	homies_b2: HOMIES_B2_SEAT_MAP, // To be filled with actual seat data
	homies_c3: HOMIES_C3_SEAT_MAP,
	homies_multi: HOMIES_MULTI_SEAT_MAP, // To be filled with actual seat data
};

export const SEAT_LEGEND = [
	{ id: "empty", label: "Chỗ trống", color: "bg-white" },
	{ id: "picked", label: "Đã chọn", color: "bg-blue-500" },
	{ id: "occupied", label: "Đã được đặt", color: "bg-gray-400" },
];

export const MOCK_TOP_SEAT = [
	{ id: "23040001", name: "Nguyễn Văn A", time: 163800 },
	{ id: "25040021", name: "Trần Thị B", time: 152100 },
	{ id: "23040021", name: "Lê Hoàng C", time: 139500 },
	{ id: "24020254", name: "@nguen", time: 127200 },
	{ id: "24040020", name: "Vũ Thu E", time: 115800 },
];

export const MOCK_HISTORY = [
	{ id: 1, location: "Thư viện", seat: "A-12", date: "2024-11-20", time: "08:30 - 10:30", status: "completed" },
	{ id: 2, location: "Homies C3", seat: "15", date: "2024-11-18", time: "14:30 - 16:30", status: "completed" },
	{ id: 3, location: "Căng tin B2", seat: "5", date: "2024-11-15", time: "12:30 - 14:30", status: "completed" },
	{ id: 4, location: "Thư viện", seat: "B-8", date: "2024-11-12", time: "10:30 - 12:30", status: "cancelled" },
	{ id: 5, location: "Homies B2", seat: "22", date: "2024-11-10", time: "16:30 - 18:30", status: "completed" },
];