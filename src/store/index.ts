import {
	type Middleware,
	type PayloadAction,
	Tuple,
	configureStore,
} from "@reduxjs/toolkit";
import { toast } from "sonner";
import {
	type User,
	type UserId,
	type UserWithId,
	rollBackUser,
	usersSlice,
} from "./users/slice";

const persistanceLocalStorageMiddleware: Middleware =
	(store) => (next) => (action) => {
		next(action);
		localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
	};

const syncWithDataBaseMiddleware: Middleware =
	(store) => (next) => (action) => {
		const { type, payload } = action as PayloadAction<
			User | UserId | UserWithId
		>;
		const previousState = store.getState();

		next(action);

		if (type === "users/deleteUserById") {
			const userIdToRemove = payload;
			const userToRemove = previousState.users.find(
				(user: UserWithId) => user.id === userIdToRemove,
			);

			fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
				method: "DELETE",
			})
				.then((res) => {
					if (res.ok) {
						toast.success(`Usuario ${userIdToRemove} eliminado correctamente`);
					}
				})
				.catch((err) => {
					toast.error(`Error al eliminar el usuario ${userIdToRemove}`);
					if (userToRemove) store.dispatch(rollBackUser(userToRemove));
					console.error(err);
				});
		}
	};

export const store = configureStore({
	reducer: {
		users: usersSlice.reducer,
	},
	middleware: () =>
		new Tuple(persistanceLocalStorageMiddleware, syncWithDataBaseMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
