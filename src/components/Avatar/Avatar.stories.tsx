import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarGroup } from './Avatar';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    status: { control: 'select', options: ['online', 'offline', 'busy', 'away'] },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithInitials: Story = {
  args: { name: 'Klaudija Ljevar', size: 'md' },
};

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=32',
    alt: 'User avatar',
    name: 'Alex Smith',
    size: 'md',
  },
};

export const WithStatus: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar name="Alice Brown" status="online" size="md" />
      <Avatar name="Bob Jones" status="away" size="md" />
      <Avatar name="Carol Lee" status="busy" size="md" />
      <Avatar name="Dan Kim" status="offline" size="md" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Avatar name="A B" size="xs" />
      <Avatar name="A B" size="sm" />
      <Avatar name="A B" size="md" />
      <Avatar name="A B" size="lg" />
      <Avatar name="A B" size="xl" />
    </div>
  ),
};

export const Fallback: Story = {
  args: { size: 'md', alt: 'No image' },
};

export const Group: Story = {
  render: () => (
    <AvatarGroup max={4} size="md">
      <Avatar name="Alice Brown" status="online" />
      <Avatar name="Bob Jones" status="away" />
      <Avatar name="Carol Lee" />
      <Avatar name="Dan Kim" status="offline" />
      <Avatar name="Eve Wang" />
      <Avatar name="Frank Liu" />
    </AvatarGroup>
  ),
};
