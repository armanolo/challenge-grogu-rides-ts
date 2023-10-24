import MockAdapter from "axios-mock-adapter"
import { FormUser } from "../components/users/FormUser"
import { Provider } from "react-redux"
import { store } from '../store/index.ts'
import AxiosMock from "./AxiosMock"
import { Meta, StoryObj } from "@storybook/react"
import { AddCreatedVehicle } from "./AddCreatedVehicle.tsx"

const meta: Meta<typeof FormUser> = {
	title: 'Users/FormUser',
	component: FormUser,
	tags: ['autodocs'],
	parameters: {}
}
export default meta;


const mock = (apiMock: MockAdapter) => {
	apiMock.onPost('/user').reply(200);
}

type Story = StoryObj<typeof FormUser>;
export const Primary: Story = {
	render: () => (
		<>
			<Provider store={store}>
				<AxiosMock mock={mock}>
				<AddCreatedVehicle/>
				<FormUser/>
				</AxiosMock>
			</Provider>
		</>
	)
}