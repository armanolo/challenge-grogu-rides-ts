import { useDispatch } from "react-redux";
import { setCreatedVehicles } from "../store/reducers/createdVehiclesReducer";

export const AddCreatedVehicle = () => {
	const dispatch = useDispatch();

	const createdVehicle = () => {
		dispatch(setCreatedVehicles(true))	
	}

	return (
		<input type="button" value="To created" onClick={createdVehicle}/>
	)
}