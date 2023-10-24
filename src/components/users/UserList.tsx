import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux";
import Table from "../common/table/Table";
import { EnumColumTypes } from "../common/table/constants/EnumColumTypes";
import "react-datetime/css/react-datetime.css";
import Datetime from 'react-datetime';
import { EnumColumAlignment } from "../common/table/constants/EnumColumAlignment";
import { DropOffRentsService, RentService } from "../../api/RentService";
import { toFormattedString } from "../../../utils/prototypes";
import { toast } from "react-toastify";
import { TOAST_CONFIG } from "../../constants/ToastConfig";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { dropOffAction, rentVehicleAction } from "../../store/Actions";
import { shortUuid } from "../../util/CommonMethod";
import { TableColumnConfigProps } from "../common/table/types/TableColumnProps";


var validDate = function( value:any){
	const currentDate = value._d
	const selectedDate = value._i
    const dd = currentDate.getTime() - (selectedDate.getTime())
	return ( dd / (1000 * 3600) ) > 1
};

export const UserList = () => {
	const dispatch = useDispatch()

	const userList:Array<UserStored> = useSelector( (state:any) => {
        return state.userList;
    })

	const rentVehicle = async (id:string, seats:any, time:any) => {
		let timeValue = ""
		if(time.current.getInputValue()){
			const newDate = new Date(Date.parse(time.current.getInputValue()))
			timeValue = toFormattedString(newDate)

		}
		const seatsValue = seats.current.value;
		let rentToOrder: RentToOrder = {
			userId: id,
    		endTime: timeValue,
    		seats: seatsValue
		}

		const responseApi:ResponseApi = await RentService(rentToOrder)

		if (responseApi.isOk){
			toast(`Rent vehicle with ${seatsValue}`, TOAST_CONFIG)
			const rentedCar:VehicleRented = responseApi.response

			const userRented = userList.find(user => user.id === rentedCar.userId)
			if(userRented){
				dispatch(rentVehicleAction(rentedCar))
			}
		}else{
			toast(`Not rented: ${responseApi.response}`, TOAST_CONFIG)
		}
	}

	const dropOffTheVehicle = async (rent: RentVehicleGrogi) => {

		const responseApi: ResponseApi = await DropOffRentsService(rent.id);

		if (responseApi.isOk){
			dispatch(dropOffAction(rent))
		}

	}

	const dropOffTheVehiclePromt = (rent:RentVehicleGrogi) => {
		confirmAlert({
			title: 'Confirm to drop the vehicle off',
			message: 'Are you sure to do this.',
			buttons: [
			  {
				label: 'Yes',
				onClick: () => dropOffTheVehicle(rent)
			  },
			  {
				label: 'No',
				onClick: () => {}
			  }
			]
		});
	}

	const dropOff = (rented:RentVehicleGrogi) => {
		let imageRented = "/images/vehicle_garage_1.png"; 
		let onClick = () => {alert("Rent it")}
		let pointerStyle = {}
		if (rented !== undefined){
			imageRented = "/images/on_route.png"; 
			onClick = () => {dropOffTheVehiclePromt(rented)}
			pointerStyle = {cursor: 'no-drop'}

		}
		return <img className="ui avatar image" src={imageRented} onClick={onClick} style={pointerStyle}></img>

	}
	const addOrder = (id:any) => {
		
		const minimum = new Date()
		minimum.setHours(minimum.getHours()+2)

		if(!id){
			return <>Is renting</>
		}

		const seatRef = useRef(null);
		const seatDatetime = useRef(null);

		return (
			<span style={{display: 'inline-block'}}>
				<label>Seats:</label><input ref={seatRef} type="number" min="1" max="6" style={{width: '57px'}}/>
				<label>Until:</label><Datetime ref={seatDatetime} initialValue={minimum} isValidDate={ validDate } />
				<button onClick={() =>rentVehicle(id, seatRef, seatDatetime)}>Add </button>
			</span>
		)

	}
	
	const configTableColumns: Dictionary<TableColumnConfigProps> = {
		id: {name: 'Id',width:120, type:EnumColumTypes.TEXT, decorator: shortUuid, align: EnumColumAlignment.CENTER},
		name: {name: 'Name',type:EnumColumTypes.TEXT, width:100, align: EnumColumAlignment.CENTER},
		dni: {name: 'Dni',width:100,type:EnumColumTypes.TEXT, align: EnumColumAlignment.CENTER},
		avatar: {name: 'Avatar',type:EnumColumTypes.IMAGE_URL, align: EnumColumAlignment.CENTER},
		renting: {name: 'Status', width:50, type:EnumColumTypes.OBJECT, decorator: dropOff, align: EnumColumAlignment.CENTER},
		toOrder: {name: 'Order',width:200, type:EnumColumTypes.TEXT, decorator: addOrder,align: EnumColumAlignment.CENTER},
	}

    return (
        <div>
			<h1>User list:</h1>
			<Table data={userList} config={configTableColumns}/>
        </div>
    )
}