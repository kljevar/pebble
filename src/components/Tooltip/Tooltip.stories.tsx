import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button/Button';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
    },
    content: { control: 'text' },
  },
  args: {
    content: 'Tooltip text',
    children: <Button variant="secondary" size="sm">Hover me</Button>,
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    placement: 'top',
    children: <Button variant="secondary">Hover me</Button>,
  },
};

export const AllPlacements: Story = {
  args: {
    content: 'Tooltip text',
    children: <Button variant="secondary" size="sm">Hover me</Button>,
  },
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, auto)',
        gap: '48px',
        padding: '64px',
        placeItems: 'center',
      }}
    >
      <div />
      <Tooltip content="Tooltip on top" placement="top">
        <Button variant="secondary" size="sm">Top</Button>
      </Tooltip>
      <div />

      <Tooltip content="Tooltip on left" placement="left">
        <Button variant="secondary" size="sm">Left</Button>
      </Tooltip>
      <div />
      <Tooltip content="Tooltip on right" placement="right">
        <Button variant="secondary" size="sm">Right</Button>
      </Tooltip>

      <div />
      <Tooltip content="Tooltip on bottom" placement="bottom">
        <Button variant="secondary" size="sm">Bottom</Button>
      </Tooltip>
      <div />
    </div>
  ),
};

export const WithLongText: Story = {
  args: {
    content: 'This tooltip contains a longer description to explain a feature in more detail.',
    placement: 'top',
    children: <Button variant="ghost" size="sm">What's this?</Button>,
  },
};
