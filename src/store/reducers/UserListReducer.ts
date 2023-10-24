import { createSlice } from "@reduxjs/toolkit";
import { dropOffAction, rentVehicleAction, resetAction } from "../Actions";


const initialState: UserStored[] = []

const userList = createSlice({
	name: 'userList',
	initialState,
	reducers: {
		addUserAction: (state, action) => {
			return [...state, action.payload]
		},
		/*
		rentUserAction: (state, action) => {
			const userFound = state.find( user => user.id == action.payload.id)
			if(userFound){
				const updatedUser = {...userFound, renting: action.payload.rentedCar, toOrder:null}
				return [...state.filter( vehicle => vehicle.id !== userFound.id), updatedUser]
			}else{
				return state
			}
		}
		*/
	},
	extraReducers(builder) {
		builder.addCase(dropOffAction, (state, action) => {
			const rent:RentVehicleGrogi = action.payload
			const userFound = state.find( user => user.id == rent.userId)
			if(userFound){
				const updatedUser = {...userFound, renting:undefined, toOrder: userFound.id}
				return [...state.filter( user => user.id !== userFound.id), updatedUser]
			}else{
				return state
			}
		}),
		builder.addCase(rentVehicleAction, (state, { payload } ) => {
			const rent: RentVehicleGrogi = payload 
			const userFound = state.find( user => user.id == rent.userId)

			if(userFound){
				const updatedUser = {...userFound, renting:rent, toOrder: undefined}
				return [...state.filter( user => user.id !== userFound.id), updatedUser]
			}else{
				return state
			}
		}),
		builder.addCase(resetAction, (_state, _action) => {
			return []
		})
	}
})

export const { addUserAction } = userList.actions
export const userListReducer = userList.reducer
