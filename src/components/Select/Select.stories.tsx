import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '280px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Country',
    placeholder: 'Select a country…',
  },
  render: (args) => (
    <Select {...args}>
      <option value="us">United States</option>
      <option value="uk">United Kingdom</option>
      <option value="ca">Canada</option>
      <option value="au">Australia</option>
      <option value="de">Germany</option>
    </Select>
  ),
};

export const WithHelperText: Story = {
  render: () => (
    <Select label="Timezone" helperText="Used for scheduling notifications." defaultValue="utc">
      <option value="utc">UTC</option>
      <option value="est">Eastern Time (ET)</option>
      <option value="pst">Pacific Time (PT)</option>
      <option value="cet">Central European Time (CET)</option>
    </Select>
  ),
};

export const WithError: Story = {
  render: () => (
    <Select label="Role" errorText="Please select a role to continue." defaultValue="">
      <option value="" disabled>Pick a role…</option>
      <option value="admin">Admin</option>
      <option value="editor">Editor</option>
      <option value="viewer">Viewer</option>
    </Select>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Select label="Plan" disabled defaultValue="pro">
      <option value="free">Free</option>
      <option value="pro">Pro</option>
      <option value="enterprise">Enterprise</option>
    </Select>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Select size="sm" label="Small" defaultValue="a">
        <option value="a">Option A</option>
        <option value="b">Option B</option>
      </Select>
      <Select size="md" label="Medium" defaultValue="a">
        <option value="a">Option A</option>
        <option value="b">Option B</option>
      </Select>
      <Select size="lg" label="Large" defaultValue="a">
        <option value="a">Option A</option>
        <option value="b">Option B</option>
      </Select>
    </div>
  ),
};
