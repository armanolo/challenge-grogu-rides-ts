import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {addUserAction} from "../../store/reducers/UserListReducer"
import { CreateUserService } from "../../api/UserService";
import { toast } from "react-toastify"
import { TOAST_CONFIG } from "../../constants/ToastConfig"
import { faker } from '@faker-js/faker';

export const FormUser = () => {
	const createdVehicle = useSelector( (state:any) => {
        return state.createdVehicles;
    })
	const [name, setName] = useState("")
	const [dni, setDni] = useState("")
	const dispatch = useDispatch()
	
	const addNewUser = async() => {
		const newUser: UserToCreate = { id: uuidv4(),name,dni }
		const responseApi: ResponseApi = await CreateUserService(newUser)
		if (responseApi.isOk){
			const userGrogi: UserStored = {...newUser,avatar:faker.image.avatar(), toOrder: newUser.id}
			dispatch(addUserAction(userGrogi))
		}else{
			toast(`Some went wrong ${responseApi.response}`, TOAST_CONFIG)
		}
	}

	const randomUser = () => {
		setName(`${faker.person.firstName()} ${faker.person.lastName()}`)
		var dni = `${faker.string.numeric({ length: 8, allowLeadingZeros: false })}${faker.string.alpha().toUpperCase()}` 
		setDni(dni)
	}

	if(!createdVehicle.active){
		return <></>
	}

	return (
		<form className="ui form">
			<h2>User form:</h2>
			<div className="ui grid">
				<div className="twelve wide column">

					<div className="inline field">
						<label>Name</label>
						<input type="text" value={name} 
							onChange={(e)=> setName(e.target.value)}
								name="name" placeholder="Name"/>
					</div>
					<div className="inline field">
						<label>DNI</label>
						<input type="text" value={dni} 
							onChange={(e)=> setDni(e.target.value)}
								name="dni" placeholder="DNI"/>
					</div>
					<input className="ui button" onClick={addNewUser} value="Add user" type="button"/>
				</div>
				<div className="three wide column">
					<div className="ui container">
						<button	type="button" style={{padding: "1.5vh", margin: "0px 0px 0px 1vw"}}
											onClick={randomUser} className="circular ui icon button small">
							<i className="user plus icon"></i>
						</button>
					</div>
				</div>
			</div>
		</form>
	)
}
function uuidv4(): string {
	throw new Error("Function not implemented.");
}

