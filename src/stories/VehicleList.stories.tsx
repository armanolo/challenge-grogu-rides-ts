import { type Meta, type StoryObj } from '@storybook/react';
import { VehicleList } from '../components/vehicles/VehicleList.tsx';
import { store } from '../store/index.ts'
import { Provider } from 'react-redux';
import { AddVehicleToList } from './AddVehiclesToList.tsx';

const meta: Meta<typeof VehicleList> = {
	title: 'Vehicles/VehicleList',
	component: VehicleList,
	tags: ['autodocs'],
	argTypes: {
		data: {
			name: 'Data',
		  	control: 'array'
		},
		label:{
			name:'Text',
			control: 'text'
		}
	},
	args: {
		data: [
			{id:'20264261-9cfc-46e5-b311-2e3b4401712b',seats:2},
			{id:'edc13646-27a5-4c18-a0c5-0093cbaf95cd',seats:4},
			{id:'430eb634-58f5-44cf-9037-5b111ed96348',seats:3}
		],
		label: "Add vehicles"
	},
	parameters: {},
};
export default meta;

type Story = StoryObj<typeof VehicleList>;
export const Primary: Story = { 
	render: (args:any) => 
	<>
		<Provider store={store}>
			<AddVehicleToList data={args.data} label={args.label}/>
			<VehicleList/>
		</Provider>
	</>
}