import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    resize: { control: 'select', options: ['none', 'vertical', 'both'] },
    disabled: { control: 'boolean' },
    rows: { control: { type: 'number', min: 2, max: 20 } },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '360px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Message',
    placeholder: 'Write your message here…',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Tell us a bit about yourself…',
    helperText: 'Max 200 characters.',
    rows: 3,
  },
};

export const WithError: Story = {
  args: {
    label: 'Description',
    defaultValue: 'x',
    errorText: 'Description must be at least 20 characters.',
    rows: 4,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Notes',
    defaultValue: 'These notes are read-only.',
    disabled: true,
  },
};
