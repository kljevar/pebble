# Pebble Design System

A compact, thoughtfully designed React component library built with TypeScript and CSS Modules.

## Installation

Install directly from GitHub:

```bash
npm install kljevar/pebble
```

Or pin to a specific tag/commit:

```bash
npm install kljevar/pebble#v0.1.0
```

> **Note:** The package builds automatically during install via the `prepare` script. Node >=18 is required.

## Usage

Import components and the stylesheet:

```tsx
import { Button, Input, Badge } from 'pebble-design-system';
import 'pebble-design-system/styles';
```

---

## Components

### Button

Variants: `primary` | `secondary` | `ghost` | `danger` | `outline`
Sizes: `sm` | `md` | `lg`

```tsx
<Button variant="primary">Save changes</Button>

<Button variant="secondary">Cancel</Button>

<Button variant="danger" size="sm">Delete</Button>

<Button variant="ghost" leftIcon={<PlusIcon />}>Add item</Button>

<Button isLoading>Saving…</Button>

<Button fullWidth variant="primary">Submit</Button>
```

---

### Input

```tsx
<Input
  label="Email"
  placeholder="you@example.com"
  helperText="We'll never share your email."
/>

<Input
  label="Username"
  errorText="Username is already taken."
/>

<Input
  label="Search"
  size="sm"
  leftIcon={<SearchIcon />}
/>
```

---

### Textarea

```tsx
<Textarea
  label="Message"
  placeholder="Write your message here…"
  rows={5}
/>

<Textarea
  label="Bio"
  helperText="Max 200 characters."
  resize="none"
/>

<Textarea
  label="Notes"
  errorText="This field is required."
/>
```

---

### Select

```tsx
<Select label="Country" placeholder="Choose a country">
  <option value="us">United States</option>
  <option value="uk">United Kingdom</option>
  <option value="ca">Canada</option>
</Select>

<Select label="Size" size="sm" defaultValue="md">
  <option value="sm">Small</option>
  <option value="md">Medium</option>
  <option value="lg">Large</option>
</Select>

<Select label="Status" errorText="Please select a status." />
```

---

### Checkbox

```tsx
<Checkbox label="Accept terms and conditions" />

<Checkbox
  label="Subscribe to newsletter"
  helperText="You can unsubscribe at any time."
  defaultChecked
/>

<Checkbox label="Select all" indeterminate />

<Checkbox label="Disabled option" disabled />
```

---

### Modal

```tsx
function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Confirm deletion"
        description="This action cannot be undone."
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={() => setOpen(false)}>Delete</Button>
          </>
        }
      >
        <p>Are you sure you want to delete this item?</p>
      </Modal>
    </>
  );
}
```

Sizes: `sm` | `md` | `lg` | `full`. Set `closeOnBackdrop={false}` to prevent closing on backdrop click.

---

### Card

Variants: `default` | `elevated` | `bordered` | `flat`

```tsx
<Card>
  <Card.Header>Card title</Card.Header>
  <Card.Body>Main content goes here.</Card.Body>
  <Card.Footer>Footer actions</Card.Footer>
</Card>

<Card variant="elevated" hoverable>
  <Card.Body>Elevated card with hover effect.</Card.Body>
</Card>

<Card variant="bordered" clickable onClick={() => {}}>
  <Card.Body>Clickable card.</Card.Body>
</Card>
```

---

### Badge

Variants: `default` | `primary` | `success` | `warning` | `danger` | `info`

```tsx
<Badge variant="success">Active</Badge>

<Badge variant="warning">Pending</Badge>

<Badge variant="danger">Failed</Badge>

<Badge variant="info" size="sm">Beta</Badge>

{/* Dot indicator — no label */}
<Badge variant="success" dot />
```

---

### Avatar

Sizes: `xs` | `sm` | `md` | `lg` | `xl`
Status: `online` | `offline` | `busy` | `away`

```tsx
{/* With image */}
<Avatar src="/avatar.jpg" alt="Jane Doe" size="md" />

{/* Initials fallback */}
<Avatar name="Jane Doe" size="lg" />

{/* With status indicator */}
<Avatar name="John Smith" status="online" />

{/* Generic icon fallback */}
<Avatar size="sm" />
```

---

### AvatarGroup

```tsx
<AvatarGroup max={3}>
  <Avatar name="Alice Martin" />
  <Avatar name="Bob Chen" />
  <Avatar name="Carol White" />
  <Avatar name="Dan Brown" />
  <Avatar name="Eva Green" />
</AvatarGroup>
{/* Renders 3 avatars + "+2" overflow bubble */}
```

---

### Tooltip

Placement: `top` | `right` | `bottom` | `left`

```tsx
<Tooltip content="Save your changes">
  <Button variant="ghost">Save</Button>
</Tooltip>

<Tooltip content="More info" placement="right">
  <span>Hover me</span>
</Tooltip>

<Tooltip content={<strong>Rich content</strong>} placement="bottom">
  <Button variant="outline">Details</Button>
</Tooltip>
```

---

### Spinner

Sizes: `xs` | `sm` | `md` | `lg` | `xl`

```tsx
<Spinner />

<Spinner size="lg" label="Loading data…" />

<Spinner size="sm" />
```

---

### Toast

Variants: `success` | `error` | `warning` | `info`
Positions: `top-left` | `top-center` | `top-right` | `bottom-left` | `bottom-center` | `bottom-right`

Wrap your app root with `<ToastProvider>`, then call `useToast()` anywhere inside it.

```tsx
// 1. Wrap your app
import { ToastProvider } from 'pebble-design-system';

function App() {
  return (
    <ToastProvider position="top-right">
      <YourApp />
    </ToastProvider>
  );
}

// 2. Trigger toasts from any component
import { useToast } from 'pebble-design-system';

function SaveButton() {
  const { addToast } = useToast();

  return (
    <Button
      onClick={() =>
        addToast({
          variant: 'success',
          title: 'Changes saved',
          message: 'Your project has been updated.',
        })
      }
    >
      Save
    </Button>
  );
}
```

**With an action button:**

```tsx
addToast({
  variant: 'error',
  title: 'Upload failed',
  message: 'The file could not be uploaded.',
  action: { label: 'Retry', onClick: () => retryUpload() },
});
```

**No auto-dismiss:**

```tsx
addToast({
  variant: 'warning',
  message: 'You have unsaved changes.',
  duration: 0, // stays until manually dismissed
});
```

**Programmatic control:**

```tsx
const { addToast, removeToast, clearAll } = useToast();

const id = addToast({ variant: 'info', message: 'Processing…' });
// later:
removeToast(id);
clearAll();
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'success' \| 'error' \| 'warning' \| 'info'` | — | Visual style and icon |
| `message` | `string` | — | Body text (required) |
| `title` | `string` | — | Optional bold heading |
| `duration` | `number` | `4000` | Auto-dismiss in ms; `0` = no auto-dismiss |
| `dismissible` | `boolean` | `true` | Show close button |
| `action` | `{ label: string; onClick: () => void }` | — | Optional action button |

`<ToastProvider>` accepts `position` (default `'top-right'`) and `maxToasts` (default `5`).

---

## Design Tokens

Pebble exposes all design tokens as CSS custom properties prefixed with `--pb-*`. You can override them to theme the library:

```css
:root {
  --pb-primary-500: #4f46e5; /* indigo */
  --pb-radius-md: 6px;
}
```

---

## Development

```bash
# Install dependencies
npm install

# Start Storybook
npm run dev

# Build library
npm run build

# Build Storybook docs
npm run build:storybook
```

## Requirements

- React >=18
- Node >=18

## License

MIT
