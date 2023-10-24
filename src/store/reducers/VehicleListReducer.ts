import { createSlice } from "@reduxjs/toolkit"
import { dropOffAction, rentVehicleAction, resetAction } from "../Actions";
import { faker } from "@faker-js/faker";


const initialState: VehicleStored[] = []

const vehicleListReducer = createSlice({
	name: "vehicleList",
	initialState,
	reducers: {
		setVehicleListAction: (_state, action) => {
			return action.payload.map( 
					(vehicle:any) => ({
						...vehicle,
						imageVehicle: faker.image.urlLoremFlickr({ category: 'transport' })
					}))

		},
		/*
		rentVehicleAction: (state, action) => {
			const vehicleFound = state.find( vehicle => vehicle.id == action.payload.id)
			if(vehicleFound){
				const updateVehicle = {...vehicleFound, isRented:action.payload.isRentedBy}
				return [...state.filter( vehicle => vehicle.id !== vehicleFound.id), updateVehicle]
			}else{
				return state
			}
		},
		*/
	},
	extraReducers: (builder) =>{
		builder.addCase(dropOffAction, (state, action) => {
		  
			const rent: RentVehicleGrogi = action.payload 
			const vehicleFound = state.find( vehicle => vehicle.id == rent.vehicleId)
			if(vehicleFound){
				const updateVehicle = {...vehicleFound, isRented: undefined}
				return [...state.filter( vehicle => vehicle.id !== vehicleFound.id), updateVehicle]
			}else{
				return state
			}
		});
		builder.addCase(rentVehicleAction, (state, action) => {
			const rent: RentVehicleGrogi = action.payload 
			const vehicleFound = state.find( vehicle => vehicle.id == rent.vehicleId)

			if(vehicleFound){
				const updateVehicle = {...vehicleFound, isRented: rent.userId}
				return [...state.filter( vehicle => vehicle.id !== vehicleFound.id), updateVehicle]
			}else{
				return state
			}
		});
		builder.addCase(resetAction, (_state, _action) => {
			return []
		})
	}
})

export const { setVehicleListAction } = vehicleListReducer.actions
export const vehicleList = vehicleListReducer.reducer
