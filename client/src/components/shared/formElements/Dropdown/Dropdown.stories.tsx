import type { Meta, StoryObj } from '@storybook/react';

import { Dropdown } from './Dropdown';

const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Primary: Story = {
  args: {
    items: ['UI', 'UX', 'Enhancement', 'Bug', 'Feature'],
    width: 'w-[28.5rem]',
  },
};
