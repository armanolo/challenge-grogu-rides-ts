import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//import { getAxios } from "../../../utils/get-axios";
import { GetRentsService } from "../../api/RentService";
import { resetAction } from "../Actions";

/*
const initialState: RentStored[] = []
const rentList = createSlice({
	name: 'rentList',
	initialState,
	reducers: {
		addRentAction: (state, action) => {
			return [...state, action.payload]
		},
	}
})
export const { addRentAction } = rentList.actions
export const rentListReducer = rentList.reducer
*/

const initialState = {
	//entities: Array<RentStored>,
	entities: [],
	loading: false,
}
export const getRentList = createAsyncThunk(
	'app/getRentList',
	async (_thunkAPI) => {
		const response = await GetRentsService()
		if (response.isOk){
			return response.response
		}else{
			return []
		}
	}
)

export const rentListSlice = createSlice({
	name: 'rentList',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getRentList.pending, (_state, _action) => {
			return { entities:[], loading: true}
		});
		builder.addCase(getRentList.rejected, (_state, _action) => {
			return { entities:[], loading: true}
		});
		builder.addCase(getRentList.fulfilled, (_state, action) => {
			return { entities: action.payload, loading: false}
		});
		builder.addCase(resetAction, (_state, _action) => {
			return { entities: [], loading: true}
		});
		
	}
})

export const rentListReducer = rentListSlice.reducer