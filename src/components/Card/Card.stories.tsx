import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'elevated', 'bordered', 'flat'] },
    hoverable: { control: 'boolean' },
    clickable: { control: 'boolean' },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card style={{ width: '320px' }}>
      <Card.Header>Card header</Card.Header>
      <Card.Body>
        This is the card body. Use it to present content, data, or actions in
        a structured way.
      </Card.Body>
      <Card.Footer>
        <Button size="sm" variant="secondary">Cancel</Button>
        <Button size="sm">Save</Button>
      </Card.Footer>
    </Card>
  ),
};

export const Elevated: Story = {
  render: () => (
    <Card variant="elevated" style={{ width: '320px' }}>
      <Card.Body>
        <p style={{ margin: 0 }}>
          An elevated card floats above the page surface, ideal for drawing
          attention to key content.
        </p>
      </Card.Body>
    </Card>
  ),
};

export const Hoverable: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      {['Design', 'Engineering', 'Product'].map((team) => (
        <Card key={team} hoverable style={{ width: '180px' }}>
          <Card.Body>
            <strong style={{ fontSize: '14px' }}>{team}</strong>
            <p style={{ margin: '4px 0 0', color: 'var(--pb-stone-500)', fontSize: '13px' }}>
              12 members
            </p>
          </Card.Body>
        </Card>
      ))}
    </div>
  ),
};

export const ProductCard: Story = {
  render: () => (
    <Card variant="elevated" style={{ width: '280px' }}>
      <div
        style={{
          height: '140px',
          background: 'linear-gradient(135deg, var(--pb-primary-100), var(--pb-primary-200))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '48px',
        }}
      >
        🪨
      </div>
      <Card.Body>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <strong style={{ fontSize: '15px' }}>Pebble Pro</strong>
          <Badge variant="success">New</Badge>
        </div>
        <p style={{ margin: '0 0 12px', color: 'var(--pb-stone-500)', fontSize: '13px', lineHeight: 1.5 }}>
          The complete design system starter kit for your next project.
        </p>
        <Button fullWidth size="sm">
          Get started
        </Button>
      </Card.Body>
    </Card>
  ),
};

export const Bordered: Story = {
  render: () => (
    <Card variant="bordered" style={{ width: '320px' }}>
      <Card.Header>Settings</Card.Header>
      <Card.Body>
        Configure your workspace preferences and notification settings.
      </Card.Body>
    </Card>
  ),
};

export const Flat: Story = {
  render: () => (
    <Card variant="flat" style={{ width: '320px' }}>
      <Card.Body>
        A flat card blends into the background — great for subtle grouping or
        section containers.
      </Card.Body>
    </Card>
  ),
};
