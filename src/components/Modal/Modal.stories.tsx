import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import type { ModalSize } from './Modal';
import { Button } from '../Button/Button';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    isOpen: false,
    onClose: () => {},
    children: 'Modal content',
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

const ModalDemo = ({
  size = 'md' as ModalSize,
  title = 'Modal title',
  description = 'This is an optional description for more context.',
  withFooter = true,
}: {
  size?: ModalSize;
  title?: string;
  description?: string;
  withFooter?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title={title}
        description={description}
        size={size}
        footer={
          withFooter ? (
            <>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Confirm</Button>
            </>
          ) : undefined
        }
      >
        <p style={{ margin: 0, color: 'var(--pb-stone-600)', lineHeight: 1.6 }}>
          This is the modal body. You can place any content here — forms, details,
          confirmations, or rich media. The modal scrolls independently when its
          content overflows.
        </p>
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: () => <ModalDemo />,
};

export const Small: Story = {
  render: () => <ModalDemo size="sm" title="Confirm action" description="This cannot be undone." />,
};

export const Large: Story = {
  render: () => <ModalDemo size="lg" title="Detailed view" />,
};

export const NoFooter: Story = {
  render: () => <ModalDemo withFooter={false} title="Information" />,
};

export const DeleteConfirm: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="danger" onClick={() => setOpen(true)}>
          Delete account
        </Button>
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Delete account?"
          description="This will permanently delete your account and all associated data. This action cannot be undone."
          size="sm"
          footer={
            <>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={() => setOpen(false)}>
                Yes, delete
              </Button>
            </>
          }
        >
          <p style={{ margin: 0, fontSize: '14px', color: 'var(--pb-stone-600)' }}>
            Please make sure you have backed up any important data before proceeding.
          </p>
        </Modal>
      </>
    );
  },
};
