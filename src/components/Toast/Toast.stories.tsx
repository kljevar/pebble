import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ToastProvider } from './ToastContext';
import { useToast } from './useToast';
import type { ToastVariant, ToastPosition } from './Toast.types';

// ─── Storybook meta ───────────────────────────────────────────────────────────

const meta = {
  title: 'Components/Toast',
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <ToastProvider position="top-right">
        <Story />
      </ToastProvider>
    ),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Helper trigger buttons ───────────────────────────────────────────────────

const btnStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '8px 18px',
  borderRadius: 9999,
  border: 'none',
  cursor: 'pointer',
  fontFamily: 'var(--pb-font-sans)',
  fontSize: '14px',
  fontWeight: 600,
  letterSpacing: '-0.01em',
};

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: () => {
    const { addToast } = useToast();
    return (
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          style={{ ...btnStyle, background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: '#fff' }}
          onClick={() =>
            addToast({ variant: 'success', title: 'Changes saved', message: 'Your project has been updated successfully.' })
          }
        >
          Success
        </button>
        <button
          style={{ ...btnStyle, background: 'linear-gradient(135deg, #f43f5e, #be123c)', color: '#fff' }}
          onClick={() =>
            addToast({ variant: 'error', title: 'Upload failed', message: 'The file could not be uploaded. Please try again.' })
          }
        >
          Error
        </button>
        <button
          style={{ ...btnStyle, background: 'linear-gradient(135deg, #f59e0b, #b45309)', color: '#fff' }}
          onClick={() =>
            addToast({ variant: 'warning', title: 'Storage almost full', message: 'You are using 92% of your storage quota.' })
          }
        >
          Warning
        </button>
        <button
          style={{ ...btnStyle, background: 'linear-gradient(135deg, #0ea5e9, #0369a1)', color: '#fff' }}
          onClick={() =>
            addToast({ variant: 'info', title: 'Update available', message: 'Version 2.4.0 is ready to install.' })
          }
        >
          Info
        </button>
      </div>
    );
  },
};

export const WithAction: Story = {
  render: () => {
    const { addToast } = useToast();
    return (
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          style={{ ...btnStyle, background: 'linear-gradient(135deg, #6366f1, #a855f7)', color: '#fff' }}
          onClick={() =>
            addToast({
              variant: 'info',
              title: 'New message',
              message: 'Jamie sent you a message in #design.',
              action: { label: 'View', onClick: () => alert('Navigating to #design…') },
            })
          }
        >
          With action
        </button>
        <button
          style={{ ...btnStyle, background: 'linear-gradient(135deg, #f43f5e, #be123c)', color: '#fff' }}
          onClick={() =>
            addToast({
              variant: 'error',
              message: 'Something went wrong while saving your draft.',
              action: { label: 'Retry', onClick: () => alert('Retrying…') },
            })
          }
        >
          Error + retry
        </button>
        <button
          style={{ ...btnStyle, background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: '#fff' }}
          onClick={() =>
            addToast({
              variant: 'success',
              title: 'File deleted',
              message: 'report-q4.pdf was moved to Trash.',
              action: { label: 'Undo', onClick: () => alert('File restored.') },
            })
          }
        >
          Success + undo
        </button>
      </div>
    );
  },
};

export const NoDismiss: Story = {
  render: () => {
    const { addToast } = useToast();
    return (
      <button
        style={{ ...btnStyle, background: 'linear-gradient(135deg, #f59e0b, #b45309)', color: '#fff' }}
        onClick={() =>
          addToast({
            variant: 'warning',
            title: 'Unsaved changes',
            message: 'You have unsaved changes. This toast will not auto-dismiss.',
            duration: 0,
            dismissible: true,
          })
        }
      >
        No auto-dismiss
      </button>
    );
  },
};

export const LongDuration: Story = {
  render: () => {
    const { addToast } = useToast();
    return (
      <button
        style={{ ...btnStyle, background: 'linear-gradient(135deg, #0ea5e9, #0369a1)', color: '#fff' }}
        onClick={() =>
          addToast({
            variant: 'info',
            title: 'Syncing…',
            message: 'Your data is being synced across all devices. This may take a moment.',
            duration: 8000,
          })
        }
      >
        8 s duration
      </button>
    );
  },
};

export const Stacked: Story = {
  render: () => {
    const { addToast, clearAll } = useToast();

    const variants: ToastVariant[] = ['success', 'error', 'warning', 'info'];
    const messages = [
      { title: 'Deployment complete', message: 'v2.1.0 is live on production.' },
      { title: 'Build failed',        message: 'ESLint errors detected in src/auth.' },
      { title: 'API rate limit',      message: 'Approaching rate limit — slow down requests.' },
      { title: 'New comment',         message: 'Taylor left a comment on your PR.' },
    ];

    return (
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <button
          style={{ ...btnStyle, background: 'linear-gradient(135deg, #6366f1, #a855f7)', color: '#fff' }}
          onClick={() => {
            variants.forEach((variant, i) => {
              setTimeout(() => addToast({ variant, ...messages[i] }), i * 120);
            });
          }}
        >
          Stack 4 toasts
        </button>
        <button
          style={{ ...btnStyle, background: 'rgba(0,0,0,0.08)', color: 'var(--pb-stone-700)', border: '1px solid var(--pb-stone-300)' }}
          onClick={clearAll}
        >
          Clear all
        </button>
      </div>
    );
  },
};

export const Positions: Story = {
  decorators: [
    (Story) => (
      // Override provider with a neutral one — each button creates its own provider
      <Story />
    ),
  ],
  render: () => {
    const positions: ToastPosition[] = [
      'top-left', 'top-center', 'top-right',
      'bottom-left', 'bottom-center', 'bottom-right',
    ];

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
        {positions.map((pos) => (
          <ToastProvider key={pos} position={pos}>
            <PositionButton position={pos} />
          </ToastProvider>
        ))}
      </div>
    );
  },
};

const PositionButton = ({ position }: { position: ToastPosition }) => {
  const { addToast } = useToast();
  return (
    <button
      style={{ ...btnStyle, background: 'rgba(99,102,241,0.1)', color: 'var(--pb-primary-600)', border: '1px solid rgba(99,102,241,0.25)', justifyContent: 'center' }}
      onClick={() =>
        addToast({ variant: 'info', message: `Toast at ${position}` })
      }
    >
      {position}
    </button>
  );
};

export const MessageOnly: Story = {
  render: () => {
    const { addToast } = useToast();
    return (
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
        {(['success', 'error', 'warning', 'info'] as ToastVariant[]).map((v) => (
          <button
            key={v}
            style={{ ...btnStyle, background: 'rgba(0,0,0,0.07)', color: 'var(--pb-stone-700)', border: '1px solid var(--pb-stone-200)' }}
            onClick={() => addToast({ variant: v, message: `This is a ${v} message without a title.` })}
          >
            {v}
          </button>
        ))}
      </div>
    );
  },
};
