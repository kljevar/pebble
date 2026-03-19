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
        const lightBg = 'radial-gradient(ellipse at 15% 50%, rgba(139, 92, 246, 0.18) 0%, transparent 55%), radial-gradient(ellipse at 85% 20%, rgba(99, 102, 241, 0.14) 0%, transparent 50%), radial-gradient(ellipse at 60% 85%, rgba(236, 72, 153, 0.1) 0%, transparent 45%), #f0eef8';
        const darkBg = 'radial-gradient(ellipse at 15% 50%, rgba(139, 92, 246, 0.25) 0%, transparent 55%), radial-gradient(ellipse at 85% 20%, rgba(99, 102, 241, 0.2) 0%, transparent 50%), radial-gradient(ellipse at 60% 85%, rgba(168, 85, 247, 0.15) 0%, transparent 45%), #0f0d1a';
        document.body.style.setProperty('background', theme === 'dark' ? darkBg : lightBg, 'important');
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
