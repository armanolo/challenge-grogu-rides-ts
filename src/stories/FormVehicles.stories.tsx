import { type Meta, type StoryObj } from '@storybook/react'
import { FormVehicles } from '../components/vehicles/FormVehicles'
import { store } from '../store/index.ts'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import MockAdapter from 'axios-mock-adapter'
import AxiosMock from './AxiosMock.ts'

const meta: Meta<typeof FormVehicles> = {
	title: 'Vehicles/FormVehicles',
	component: FormVehicles,
	tags: ['autodocs'],
	parameters: {},
};
export default meta;

const mock = (apiMock: MockAdapter) => {
	//apiMock.onPost('/vehicles').reply(200, {id: 1,title: 'A Meeting',});
	apiMock.onPost('/vehicles').reply(200);
  };

type Story = StoryObj<typeof FormVehicles>;
export const Primary: Story = { 
	render: () => 
	<>
		<Provider store={store}>
			<AxiosMock mock={mock}>
			<FormVehicles/>
			</AxiosMock>
			<ToastContainer /> 
		</Provider>
	</>
}

/*
export const Primary = () => {
	const mock = (apiMock: MockAdapter) => {
	  apiMock.onPost('/vehicles').reply(200, {
		id: 1,
		title: 'A Meeting',
	  });
	};
	return (
		<Provider store={store}>
			<AxiosMock mock={mock}>
				<FormVehicles/> 
			</AxiosMock>
			<ToastContainer /> 
		</Provider>
	);
  };
*/