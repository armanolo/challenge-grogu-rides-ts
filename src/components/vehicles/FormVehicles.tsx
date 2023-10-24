import { useEffect, useState } from "react"
import { toast } from 'react-toastify';
import { TOAST_CONFIG } from "../../constants/ToastConfig";
import { useDispatch, useSelector } from "react-redux";
import { CreateVehiclesService, GetVehiclesService } from "../../api/VehicleService";
import { setCreatedVehicles } from "../../store/reducers/createdVehiclesReducer";
import { setVehicleListAction } from "../../store/reducers/VehicleListReducer";

export const FormVehicles = () => {
	const { active, reset } = useSelector((state:any) => {
		return state.createdVehicles
	})
	const [seats, setSeats] = useState<string>("1")
	const [vehicles, setVehicles] = useState<string[]>([])
	const dispatch = useDispatch()

	const addVehicleToList = () => {
		toast(`New vehicle with ${seats} seats added`, TOAST_CONFIG)
		setVehicles([...vehicles, seats])
	}

	const createVehicles = async () => {
		const vehicleList:object[] = vehicles.map(
				vehicle => {
					const nv = {id:"",seats:""} 
					nv.id =  uuidv4()
					nv.seats = vehicle
					return nv
				});

		let responseApi: ResponseApi = await CreateVehiclesService(vehicleList)
		if(responseApi.isOk){
			responseApi = await GetVehiclesService()
			if(responseApi.isOk){
				const listOfVehicles:Array<VehicleGrogi> = responseApi.response
				const vehicleStored:Array<VehicleStored> = listOfVehicles.map (
					(vehicle) => ({...vehicle, isRented:undefined})
					)
				dispatch(setVehicleListAction(vehicleStored))
				dispatch(setCreatedVehicles(true))
			}
		}else{
			toast(`Some went wrong ${responseApi.response}`, TOAST_CONFIG)
		}
	}

	const arrayDataItems = vehicles.map((course, index) => <li key={index}>Vehicle with {course} seats</li>);

	useEffect(() => {
		if (reset){
			setVehicles([])
			dispatch(setCreatedVehicles(false))
		}
	},[reset])

	if (active){
		return <></>
	}

	let blockCreate = <></>
	if(arrayDataItems.length > 0){
		blockCreate = (
			<>
				<div className="row">
					<ul>{arrayDataItems}</ul>
				</div>
				<div className="row">
					<button className="ui small primary button" onClick={createVehicles}>
						Create vehicles
					</button>
				</div>
			</>
		)
	}

	return (
		<div className="ui container">
			<div className="ui left aligned grid">
				<div className="row">
					<div className="ui form">
						<div className="inline fields">
							<label>New vehicle seats: </label>
							<div className="ui mini icon input">
								<input 
									type="number" 
									value={seats} min="1" max="6"
									onChange={ (e) => setSeats(e.target.value)}
									/>
							</div>
							<button	style={{padding: "1.5vh", margin: "0px 0px 0px 1vw"}}
								onClick={addVehicleToList} className="circular ui icon button small">
								<i className="plus icon"></i>
							</button>
						</div>
					</div>
				</div>
				{blockCreate}
			</div>
		</div>
	)
}
function uuidv4(): string {
	throw new Error("Function not implemented.");
}

