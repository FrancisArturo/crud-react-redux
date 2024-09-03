import { Button, Card, TextInput, Title } from "@tremor/react";
import { useState } from "react";
import { useUsersActions } from "../hooks/useUsersActions";
import { Badge } from "./Badge";

export const CreateNewUser = () => {
	const { addUser } = useUsersActions();
	const [result, setResult] = useState<"ok" | "ko" | null>(null);

	const handleAddUser = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const form = e.target as HTMLFormElement;
		const formData = new FormData(form); //sacar entries del form con su respectivo valor

		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const github = formData.get("github") as string;

		if (!name || !email || !github) {
			return setResult("ko");
		}

		const newUser = {
			name,
			email,
			github,
		};

		addUser(newUser);
		setResult("ok");
		form.reset();
	};

	return (
		<Card style={{ marginTop: "16px" }}>
			<Title>Create New User</Title>
			<form onSubmit={handleAddUser}>
				<TextInput placeholder="Aquí el nombre" name="name" />
				<TextInput placeholder="Aquí el email" name="email" />
				<TextInput placeholder="Aquí el usuario de GitHub" name="github" />
				<div>
					<Button type="submit" style={{ marginTop: "16px" }}>
						Crear usuario
					</Button>
					<span>
						{result === "ok" && (
							<Badge variant="neutral">Guardado Correctamente</Badge>
						)}
						{result === "ko" && (
							<Badge variant="error">No se pudo crear el usuario</Badge>
						)}
					</span>
				</div>
			</form>
		</Card>
	);
};
