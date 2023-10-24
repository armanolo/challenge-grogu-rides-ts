import { useSelector } from "react-redux";
import Table from "../common/table/Table";
import { EnumColumTypes } from "../common/table/constants/EnumColumTypes";
import { EnumColumAlignment } from "../common/table/constants/EnumColumAlignment";
import { TableColumnConfigProps } from "../common/table/types/TableColumnProps";

export const VehicleList = () => {

	const vehicleList:Array<VehicleStored> = useSelector( (state:any) => {
        return state.vehicleList;
    })

	const shortUuid = (value:any) => {
		const idValue = value.substr(value.lastIndexOf("-")+1)
		return <img className="ui avatar image" title={idValue} src="/images/vehicle.png"></img>
	}
	const showRented = (isRented:boolean) => {
		let imageRented = "/images/vehicle_garage_1.png"; 
		if (isRented){
			imageRented = "/images/on_route_2.png"; 
		}
		return <img className="ui avatar image" src={imageRented}></img>
	}
	const configTableColumns: Dictionary<TableColumnConfigProps> = {
		id: {name: 'Id', width: 80, type:EnumColumTypes.TEXT, decorator: shortUuid, align: EnumColumAlignment.CENTER},
		seats: {name: 'Seats', width: 60, type:EnumColumTypes.NUMBER, align: EnumColumAlignment.CENTER},
		isRented: {name: 'Status', width: 80, type:EnumColumTypes.BOOLEAN, decorator:showRented, align: EnumColumAlignment.CENTER},
		imageVehicle: {name: 'Image', width: 80, type:EnumColumTypes.IMAGE_URL, align: EnumColumAlignment.CENTER},
	}
    return (
        <div className="vehicle_list">
			<h1>Vehicle list:</h1>
			<Table data={vehicleList} config={configTableColumns}/>
        </div>
    )
}