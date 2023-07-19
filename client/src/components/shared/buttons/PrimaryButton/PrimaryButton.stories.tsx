import type { Meta, StoryObj } from '@storybook/react';

import { PrimaryButton } from './PrimaryButton';

const meta: Meta<typeof PrimaryButton> = {
  component: PrimaryButton,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof PrimaryButton>;

export const Primary: Story = {
  args: {
    // intent: 'button1',
    children: 'Click me',
  },
};
