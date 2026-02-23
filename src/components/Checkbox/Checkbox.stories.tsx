import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
    disabled: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
};

export const Checked: Story = {
  args: {
    label: 'Subscribe to newsletter',
    defaultChecked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Select all',
    indeterminate: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Marketing emails',
    helperText: "We'll send you product updates and promotions. Unsubscribe anytime.",
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Checkbox label="Disabled unchecked" disabled />
      <Checkbox label="Disabled checked" disabled defaultChecked />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Checkbox size="sm" label="Small checkbox" defaultChecked />
      <Checkbox size="md" label="Medium checkbox" defaultChecked />
    </div>
  ),
};

export const GroupExample: Story = {
  render: () => {
    const options = ['Design', 'Engineering', 'Product', 'Marketing'];
    const [selected, setSelected] = useState<Set<string>>(new Set(['Design']));

    const allChecked = selected.size === options.length;
    const someChecked = selected.size > 0 && !allChecked;

    const toggleAll = () => {
      setSelected(allChecked ? new Set() : new Set(options));
    };

    const toggle = (opt: string) => {
      const next = new Set(selected);
      if (next.has(opt)) next.delete(opt);
      else next.add(opt);
      setSelected(next);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Checkbox
          label={<strong>Select all teams</strong>}
          checked={allChecked}
          indeterminate={someChecked}
          onChange={toggleAll}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '26px' }}>
          {options.map((opt) => (
            <Checkbox
              key={opt}
              label={opt}
              checked={selected.has(opt)}
              onChange={() => toggle(opt)}
            />
          ))}
        </div>
      </div>
    );
  },
};
