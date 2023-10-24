import { createSlice } from "@reduxjs/toolkit"
import { resetAction } from "../Actions"



const createVehicleSlice = createSlice({
    name: "createdVehicles",
    initialState: {active: false, reset: false},
    reducers: {
      setCreatedVehicles: (_state, action) => {
          return { active: action.payload, reset: false }
      }
    },
    extraReducers: (builder) =>{
      builder.addCase(resetAction, (_state, _action) => {
        return {active: false, reset: true}
      })
    }
  })

export const {setCreatedVehicles} = createVehicleSlice.actions
export const isVehiclesReducer = createVehicleSlice.reducer