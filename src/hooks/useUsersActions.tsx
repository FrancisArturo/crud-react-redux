import {
	type User,
	type UserId,
	addNewUser,
	deleteUserById,
} from "../store/users/slice";
import { useAppDispatch } from "./Store";

export const useUsersActions = () => {
	const dispatch = useAppDispatch();

	const removeUser = (id: UserId) => {
		dispatch(deleteUserById(id));
	};
	const addUser = (user: User) => {
		dispatch(addNewUser(user));
	};
	return {
		removeUser,
		addUser,
	};
};
