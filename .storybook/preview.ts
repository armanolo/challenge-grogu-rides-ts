import type { Preview } from "@storybook/react";
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;