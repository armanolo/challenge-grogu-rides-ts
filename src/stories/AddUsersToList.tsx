import { useDispatch } from "react-redux";
import { addUserAction } from "../store/reducers/UserListReducer";

type AddUsersToListProps = {
	data: any;
	label: string;
};


export const AddUsersToList = ({data, label}:AddUsersToListProps) => {
	const dispatch = useDispatch();

	const addUsers = () => {
		data.forEach( (element:any) => {
			dispatch(addUserAction(element))	
		});
	}

	return (
		<input type="button" value={label} onClick={addUsers}/>
	)
}