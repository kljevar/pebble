import type { Preview } from '@storybook/react';
import { useEffect } from 'react';
import '../src/styles/tokens.css';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Color theme',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun',  title: 'Light' },
          { value: 'dark',  icon: 'moon', title: 'Dark'  },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = (context.globals.theme as string) ?? 'light';

      useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        document.body.style.setProperty('background', theme === 'dark' ? '#1c1917' : '#fafaf9', 'important');
        return () => {
          document.documentElement.removeAttribute('data-theme');
          document.body.style.background = '';
        };
      }, [theme]);

      return <Story />;
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
  },
};

export default preview;
