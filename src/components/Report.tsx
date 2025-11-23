import { Button } from "./ui/button";
import { DialogClose } from "./ui/dialog";
import { Textarea } from "./ui/textarea";

export default function Report() {
	return (
		<div>
			<h3 className="text-lg font-semibold mb-2">Báo cáo & Phản hồi</h3>
			<Textarea
				placeholder="Your feedback here..."
				className="min-h-60"
			/>
			<DialogClose asChild>
				<Button className="mt-4">Gửi phản hồi</Button>
			</DialogClose>
		</div>
	);
}
