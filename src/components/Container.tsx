import { FormVehicles } from "./vehicles/FormVehicles"
import { FormUser } from "./users/FormUser"
import { RentList } from "./rent/RentList"
import { VehicleList } from "./vehicles/VehicleList"
import { UserList } from "./users/UserList"

export const Container = () => {
	return (
        <div className="ui main container">
			<div className="ui grid">
				<div className="six wide column">
					<FormVehicles/>
					<div className="ui segment">
						<VehicleList/>
					</div>
					<div className="ui segment">
						<FormUser/>
					</div>
				</div>
				<div className="eight wide column">
					<div className="ui segment">
						<UserList/>
					</div>
				</div>
				<div className="sixteen wide column">
					<div className="ui segment">
						<RentList/>
					</div>
				</div>
			</div>
		</div>
	)
}