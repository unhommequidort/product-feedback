import type { Meta, StoryObj } from '@storybook/react';

import { BackButton } from './BackButton';

const meta: Meta<typeof BackButton> = {
  component: BackButton,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof BackButton>;

export const Primary: Story = {
  args: {
    children: 'Go back',
  },
};
