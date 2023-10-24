import { createAction } from "@reduxjs/toolkit"

const dropOffAction = createAction('app/dropOff', (payload: RentVehicleGrogi) => ({ payload }))
const rentVehicleAction = createAction('app/rentVehicle', (payload: VehicleRented) => ({ payload }))
const resetAction = createAction('app/reset')

export {dropOffAction, rentVehicleAction, resetAction}