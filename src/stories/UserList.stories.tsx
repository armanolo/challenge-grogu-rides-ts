import { type Meta, type StoryObj } from '@storybook/react';
import { store } from '../store/index.ts'
import { Provider } from 'react-redux';
import { UserList } from '../components/users/UserList.tsx';
import { AddUsersToList } from './AddUsersToList.tsx';
import MockAdapter from 'axios-mock-adapter'
import AxiosMock from './AxiosMock.ts'
import { faker } from '@faker-js/faker';
import { ToastContainer } from 'react-toastify';
import { AddVehicleToList } from './AddVehiclesToList.tsx';


const meta: Meta<typeof UserList> = {
	title: 'Users/UserList',
	component: UserList,
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
				{id:'caf85f4b-69d9-49f6-906d-7af8d10f3f78',seats:4}
			],
			data_user: [
				{id:'20264261-9cfc-46e5-b311-2e3b4401712b',name:'Manuel',dni:'00647772T', avatar: faker.image.avatar(), toOrder:'20264261-9cfc-46e5-b311-2e3b4401712b'},
				{id:'edc13646-27a5-4c18-a0c5-0093cbaf95cd',name:'Miguel',dni:'66427920X', avatar: faker.image.avatar(), renting:'1799b0cb-0c58-49e7-b838-8ca23cfd9c3c'},
				{id:'430eb634-58f5-44cf-9037-5b111ed96348',name:'Yaye',dni:'33047950D', avatar: faker.image.avatar(), toOrder:'430eb634-58f5-44cf-9037-5b111ed96348'},
			],
	},
	parameters: {},
};
export default meta;




const mock = (apiMock: MockAdapter) => {
	apiMock.onPost('/rent',
	{
		asymmetricMatch: function ({userId}:any) {
			 return userId === "20264261-9cfc-46e5-b311-2e3b4401712b"
		  	//return true;// ["computer", "phone"].includes(actual["type"]);
		},
	}
	).reply(200, 
		{
			id:'af20972c-8da4-4fc3-9b53-359d64aa69fa',
			vehicleId: 'caf85f4b-69d9-49f6-906d-7af8d10f3f78',
			userId: '20264261-9cfc-46e5-b311-2e3b4401712b',
			endTime: '2023-07-27 16:07:32',
			returnTime: '2023-07-27 16:07:32'
		}
	).onPost('/rent/af20972c-8da4-4fc3-9b53-359d64aa69fa/drop-off').reply(200);
  };

type Story = StoryObj<typeof UserList>;
export const Primary: Story = { 
	render: (args:any) => 
	<>
		<Provider store={store}>
			<AddUsersToList data={args.data_user} label="Add users"/>
			<AddVehicleToList data={args.data_car} label="Add vehicles"/>
			<AxiosMock mock={mock}>
				<UserList/>
			</AxiosMock>
			<ToastContainer /> 
		</Provider>
	</>
}