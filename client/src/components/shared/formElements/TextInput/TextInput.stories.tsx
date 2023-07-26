import type { Meta, StoryObj } from '@storybook/react';

import { TextInput } from './TextInput';

const meta: Meta<typeof TextInput> = {
  component: TextInput,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TextInput>;

export const Primary: Story = {
  args: {
    name: 'feedbackTitle',
    label: 'Feedback Title',
    description: 'Add a short, descriptive headline',
    width: 'w-[28.5rem]',
  },
};
