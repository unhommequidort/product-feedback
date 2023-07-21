import type { Meta, StoryObj } from '@storybook/react';

import { Upvote } from './Upvote';

const meta: Meta<typeof Upvote> = {
  component: Upvote,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Upvote>;

export const Primary: Story = {
  args: {
    value: 99,
    onClick: () => console.log('Upvote clicked'),
  },
};
