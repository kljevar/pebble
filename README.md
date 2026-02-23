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

### Example

```tsx
import { Button, Badge, Card } from 'pebble-design-system';
import 'pebble-design-system/styles';

function App() {
  return (
    <Card>
      <Badge variant="success">Live</Badge>
      <Button variant="primary" onClick={() => console.log('clicked')}>
        Get Started
      </Button>
    </Card>
  );
}
```

## Components

| Component | Description |
|-----------|-------------|
| `Button` | Primary action element with variants: `primary`, `secondary`, `ghost`, `danger` |
| `Input` | Text input with label and error state support |
| `Textarea` | Multi-line text input |
| `Select` | Dropdown selector |
| `Checkbox` | Checkbox input with label |
| `Modal` | Accessible dialog overlay |
| `Card` | Content container with optional padding variants |
| `Badge` | Status/label indicator with semantic variants |
| `Avatar` | User avatar with fallback initials |
| `AvatarGroup` | Stacked group of avatars |
| `Tooltip` | Hover tooltip |
| `Spinner` | Loading indicator |

## Design Tokens

Pebble exposes all design tokens as CSS custom properties prefixed with `--pb-*`. You can override them to theme the library:

```css
:root {
  --pb-primary-500: #4f46e5; /* indigo */
  --pb-radius-md: 6px;
}
```

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
