import { type Meta, type StoryObj } from '@storybook/react';
import { store } from '../store/index.ts'
import { Provider } from 'react-redux';
import { UserList } from '../components/users/UserList.tsx';
import MockAdapter from 'axios-mock-adapter'
import AxiosMock from './AxiosMock.ts'
import { RentList } from '../components/rent/RentList.tsx';
import { AddUsersToList } from './AddUsersToList.tsx';
import { faker } from '@faker-js/faker';
import { AddVehicleToList } from './AddVehiclesToList.tsx';


const meta: Meta<typeof RentList> = {
	title: 'Rent/RentList',
	component: RentList,
	tags: ['autodocs'],
	argTypes: {
		data_car: {
			name: 'Data car',
		  	control: 'array'
		},
		data_user: {
			name: 'Data user',
		  	control: 'array'
		}
	},
	args: {
		data_car: [
			{id:'5a8b2fd4-a26a-4813-91e1-56966377342d',seats:4},
			{id:'9f56fad6-e1e3-4db0-a580-9cb5f7838f4f',seats:4}
		],
		data_user: [
			{id:'20264261-9cfc-46e5-b311-2e3b4401712b',name:'Manuel',dni:'00647772T', avatar: faker.image.avatar(), renting:'70de64f3-daaa-42ef-84c3-82683b917901'},
			{id:'66b53013-ddf1-4176-8e43-09084294c0eb',name:'Yaye',dni:'33047950D', avatar: faker.image.avatar(), renting:'b148f319-2ff1-41f6-8599-fc011874befe'},
		],
	},
	parameters: {},
};
export default meta;


const mock = (apiMock: MockAdapter) => {
	apiMock.onAny('/rent').reply(200, 
		[
			{
				id:'70de64f3-daaa-42ef-84c3-82683b917901',
				vehicleId: '5a8b2fd4-a26a-4813-91e1-56966377342d',
				userId: '20264261-9cfc-46e5-b311-2e3b4401712b',
				endTime: '2023-07-27 16:07:32',
				returnTime: '2023-07-27 16:07:32'
			},
			{
				id:'b148f319-2ff1-41f6-8599-fc011874befe',
				vehicleId: '9f56fad6-e1e3-4db0-a580-9cb5f7838f4f',
				userId: '66b53013-ddf1-4176-8e43-09084294c0eb',
				endTime: '2023-07-27 16:07:32',
				returnTime: '2023-07-27 16:07:32'
			}
		]
	)
};

type Story = StoryObj<typeof UserList>;
export const Primary: Story = { 
	render: (args:any) => 
	<>
		<Provider store={store}>
			<AddUsersToList data={args.data_user} label="Add users"/>
			<AddVehicleToList data={args.data_car} label="Add vehicles"/>
			<AxiosMock mock={mock}>
				<RentList/>
			</AxiosMock>
		</Provider>
	</>
}