import { configureStore } from "@reduxjs/toolkit";
import { isVehiclesReducer } from "./reducers/createdVehiclesReducer";
import { vehicleList } from "./reducers/VehicleListReducer";
import { userListReducer } from "./reducers/UserListReducer";
import { rentListReducer } from "./reducers/RentListReducer";

const store = configureStore({
	reducer: {
	  createdVehicles: isVehiclesReducer,
	  vehicleList: vehicleList,
	  userList: userListReducer,
	  rentList: rentListReducer
	}
  });

export {store}