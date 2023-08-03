import type { Meta, StoryObj } from '@storybook/react';

import { Chip } from './Chip';

const meta: Meta<typeof Chip> = {
  component: Chip,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Chip>;

export const Primary: Story = {
  args: {
    value: 'UI',
    onClick: () => console.log('Upvote clicked'),
  },
};
