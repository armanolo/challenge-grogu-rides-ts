import { useEffect, useState } from "react"
import Table from "../common/table/Table"
import { EnumColumTypes } from "../common/table/constants/EnumColumTypes"
import { EnumColumAlignment } from "../common/table/constants/EnumColumAlignment"
import { useDispatch, useSelector } from "react-redux"
import { getRentList } from "../../store/reducers/RentListReducer"
import { shortUuid } from "../../util/CommonMethod";
import { TableColumnConfigProps } from "../common/table/types/TableColumnProps"
import {ThunkDispatch} from "@reduxjs/toolkit";


const parseStoreToTable = (rentList: RentStored [], userList: UserStored[], vehicleList: VehicleStored[], selected:string): Array<Object> =>{

	if (rentList.length === 0 || userList.length === 0 || vehicleList.length === 0) {
		return new Array()
	} 
	
	if (selected === 'renting' || selected === 'rented'){
		if(selected === 'renting'){
			rentList = rentList.filter(rent => !rent.returnTime)
		}else{
			rentList = rentList.filter(rent => !!rent.returnTime)
		}
	}
	
	let dictonaryUser: Dictionary<UserStored> = {}
	let dictonaryVehicle: Dictionary<VehicleStored> = {}

	userList.forEach( item => dictonaryUser[item.id]=item)
	vehicleList.forEach( item => dictonaryVehicle[item.id]=item)

	const outList = rentList.map(
		(item:any) => ({ 
			...item,
			userImage: dictonaryUser[item.userId].avatar,
			imageVehicle: dictonaryVehicle[item.vehicleId].imageVehicle
		})
	)
	return outList
}


export const RentList = () => {
	const [show, setShow] = useState("")
	const dispatch = useDispatch<ThunkDispatch<any, void, any>>()
	const { entities, loading } = useSelector( (state:any) => {
        return state.rentList;
    })
	const userList = useSelector( (state:any) => {
        return state.userList;
    })
	const vehicleList = useSelector( (state:any) => {
        return state.vehicleList;
    })
	const {active} = useSelector( (state:any) => {
        return state.createdVehicles;
    })

	useEffect(() => {
		if(active){
			setTimeout( () => dispatch(getRentList()), 1000)
		}
    },[userList])

	const titleSection = (
		<>
			<h1>	
				<label>Rent list:</label>
			</h1>
			<div onChange={(event:any) => { setShow(event.target.value)}}>
				<input type="radio" name="selectedRentList" value="all" /> All
				<input type="radio" name="selectedRentList" style={{marginLeft:'2vw'}} value="renting" /> Renting
				<input type="radio" name="selectedRentList" style={{marginLeft:'2vw'}} value="rented" /> Rented
			</div>
		</>
	)

	const rentTableItems = parseStoreToTable(entities, userList, vehicleList, show)

	const returnTimeHidden = show === 'renting'

	if (loading || rentTableItems.length === 0) return titleSection

	const configTableColumns: Dictionary<TableColumnConfigProps> = {
		id: {name: 'Id',width:120, type:EnumColumTypes.TEXT, decorator: shortUuid, align: EnumColumAlignment.CENTER},
		userImage: {name: 'User',type:EnumColumTypes.IMAGE_URL, align: EnumColumAlignment.CENTER},
		imageVehicle: {name: 'Vehicle',type:EnumColumTypes.IMAGE_URL, align: EnumColumAlignment.CENTER},
		endTime: {name: 'endTime',type:EnumColumTypes.TEXT, align: EnumColumAlignment.CENTER},
		returnTime: {name: 'returnTime', width:50, type:EnumColumTypes.TEXT, align: EnumColumAlignment.CENTER, hidden: returnTimeHidden},
	}
	return (
		<div>
			{titleSection}
			<div style={{justifyContent: 'center', display: 'flex'}}>
				<Table data={rentTableItems} config={configTableColumns}/>
			</div>
		</div>
	)
}