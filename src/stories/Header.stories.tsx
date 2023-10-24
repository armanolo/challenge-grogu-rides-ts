import type { Meta, StoryObj } from '@storybook/react';

import { Header } from '../components/Header';

const meta = {
	title: 'General/Header',
	component: Header,
	tags: ['autodocs'],
	parameters:{
		//fetchMock: {}
		url:"http://localhost"
	}
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Primary: Story = {};