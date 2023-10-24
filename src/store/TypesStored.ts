type UserStored = {
	id: string
	name: string
	dni: string
	avatar: string
	renting?: RentVehicleGrogi
	toOrder?: string
}

type VehicleStored = {
	id: string
	seats: number
	isRented?: string,
	imageVehicle?: string
}

type RentStored = {
	id: string
	vehicleId:string 
	userId:string 
	endTime:string
	returnTime:string
}