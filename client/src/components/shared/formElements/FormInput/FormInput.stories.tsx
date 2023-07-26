import type { Meta, StoryObj } from '@storybook/react';

import FormExample from '@/tests/FormExample';

export default {
  component: FormExample,
  tags: ['autodocs'],
} as Meta;

type Story = StoryObj<typeof FormExample>;

export const Default: Story = {};
