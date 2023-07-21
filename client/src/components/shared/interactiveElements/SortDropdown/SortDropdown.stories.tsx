import type { Meta, StoryObj } from '@storybook/react';

import { SortDropdownButton } from './SortDropdownButton';

const meta: Meta<typeof SortDropdownButton> = {
  component: SortDropdownButton,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SortDropdownButton>;

export const Primary: Story = {};
