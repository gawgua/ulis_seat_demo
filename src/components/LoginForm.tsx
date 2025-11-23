import type { SetStateAction } from "react";
import { Button } from "./ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { FieldGroup, FieldSet, Field, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { Separator } from "./ui/separator";

export default function LoginForm({
	onLogin,
}: {
	onLogin: (value: SetStateAction<string>) => void;
}) {
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const msv = formData.get("name") as string;
		const pass = formData.get("pass") as string;
		if (!msv || !pass) {
			toast.error("Vui lòng điền đầy đủ thông tin đăng nhập.", {
				style: {
					background: '#fee2e2',
					color: '#991b1b',
					border: '1px solid #fca5a5'
				}
			});
			return;
		}
		localStorage.setItem("user", msv);
		onLogin(msv);
	}

	return (
		<Card className="max-w-lg w-full">
			<form onSubmit={handleSubmit} className="flex flex-col gap-6">
				<CardHeader>
					<CardTitle className="text-xl">Đăng nhập</CardTitle>
					<CardDescription>Demo có thể điền bất kỳ MSV, mật khẩu nào để đăng nhập</CardDescription>
				</CardHeader>
				<div className="px-6">
					<Separator />
				</div>
				<CardContent>
					<FieldSet>
						<FieldGroup>
							<Field>
								<FieldLabel>MSV</FieldLabel>
								<Input id="name" name="name" type="text" />
							</Field>
							<Field>
								<FieldLabel>Mật khẩu</FieldLabel>
								<Input id="pass" name="pass" type="password" />
							</Field>
						</FieldGroup>
					</FieldSet>
				</CardContent>
				<CardFooter className="flex flex-col gap-2">
					<Button type="submit" className="w-full">Đăng nhập</Button>
					<Button type="button" variant="outline" className="w-full border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium">
						<svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
							<path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
							<path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
							<path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
							<path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
						</svg>
						Đăng nhập bằng ULIS Email
					</Button>
				</CardFooter>
			</form>
		</Card>
	);
}
