import { setVehicleListAction } from "../store/reducers/VehicleListReducer";
import { useDispatch } from "react-redux";

type AddVehicleToListProps = {
	data: any;
	label: string;
};

export const AddVehicleToList = ({data, label}:AddVehicleToListProps) => {
	const dispatch = useDispatch();
	const addVehicle = () => {
		dispatch(setVehicleListAction(data))
	}

	return (
		<input type="button" value={label} onClick={addVehicle}/>
	)
}