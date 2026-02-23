import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'danger', 'info'],
    },
    size: { control: 'select', options: ['sm', 'md'] },
    dot: { control: 'boolean' },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'Default', variant: 'default' },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Badge size="sm" variant="primary">Small</Badge>
      <Badge size="md" variant="primary">Medium</Badge>
    </div>
  ),
};

export const DotBadges: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--pb-font-sans)', fontSize: '14px', color: 'var(--pb-stone-700)' }}>
        <Badge dot variant="success" />Online
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--pb-font-sans)', fontSize: '14px', color: 'var(--pb-stone-700)' }}>
        <Badge dot variant="warning" />Away
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--pb-font-sans)', fontSize: '14px', color: 'var(--pb-stone-700)' }}>
        <Badge dot variant="danger" />Busy
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--pb-font-sans)', fontSize: '14px', color: 'var(--pb-stone-700)' }}>
        <Badge dot variant="default" />Offline
      </div>
    </div>
  ),
};

export const InContext: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontFamily: 'var(--pb-font-sans)' }}>
      {[
        { label: 'Deployment', status: 'Success', variant: 'success' as const },
        { label: 'API Gateway', status: 'Warning', variant: 'warning' as const },
        { label: 'Database', status: 'Error', variant: 'danger' as const },
        { label: 'CDN', status: 'Healthy', variant: 'success' as const },
      ].map(({ label, status, variant }) => (
        <div
          key={label}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 14px',
            borderRadius: '8px',
            border: '1.5px solid var(--pb-stone-200)',
            fontSize: '14px',
            color: 'var(--pb-stone-700)',
          }}
        >
          {label}
          <Badge variant={variant}>{status}</Badge>
        </div>
      ))}
    </div>
  ),
};
