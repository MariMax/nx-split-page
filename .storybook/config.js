import {configure, addDecorator} from '@storybook/angular';
import {withOptions} from '@storybook/addon-options';

addDecorator(
  withOptions({
    name: 'Storybook',
    url: '#',
    goFullScreen: false,
    showStoriesPanel: true,
    showAddonPanel: true,
    showSearchBox: false,
    addonPanelInRight: true,
    sortStoriesByKind: false,
    hierarchySeparator: null,
    hierarchyRootSeparator: null,
    sidebarAnimations: true,
    selectedAddonPanel: undefined, // The order of addons in the "Addon panel" is the same as you import them in 'addons.js'. The first panel will be opened by default as you run Storybook
    enableShortcuts: false, // true by default
  }),
);

function loadStories() {
  require('../src/stories/index.ts');
}

configure(loadStories, module);
