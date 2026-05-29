# Play function


`Play` functions are small snippets of code executed after the story renders. They enable you to interact with your components and test scenarios that otherwise require user intervention.

## [Writing stories with the play function](https://storybook.js.org/docs/writing-stories/play-function#writing-stories-with-the-play-function)

Storybook's `play` functions are small code snippets that run once the story finishes rendering. Aided by the [interactions panel](https://storybook.js.org/docs/writing-tests/interaction-testing#debugging-interaction-tests), it allows you to build component interactions and test scenarios that were impossible without user intervention. For example, if you were working on a registration form and wanted to validate it, you could write the following story with the `play` function:

CSF 3CSF Next 🧪

RegistrationForm.stories.ts|tsx

Typescript

```tsx
// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, vue3-vite, etc.
import type { Meta, StoryObj } from '@storybook/your-framework';
 
import { RegistrationForm } from './RegistrationForm';
 
const meta = {
  component: RegistrationForm,
} satisfies Meta<typeof RegistrationForm>;
 
export default meta;
type Story = StoryObj<typeof meta>;
 
/*
 * See https://storybook.js.org/docs/writing-stories/play-function#working-with-the-canvas
 * to learn more about using the canvas to query the DOM
 */
export const FilledForm: Story = {
  play: async ({ canvas, userEvent }) => {
    const emailInput = canvas.getByLabelText('email', {
      selector: 'input',
    });
 
    await userEvent.type(emailInput, 'example-email@email.com', {
      delay: 100,
    });
 
    const passwordInput = canvas.getByLabelText('password', {
      selector: 'input',
    });
 
    await userEvent.type(passwordInput, 'ExamplePassword', {
      delay: 100,
    });
 
    const submitButton = canvas.getByRole('button');
    await userEvent.click(submitButton);
  },
};
```

💡

See the [interaction testing documentation](https://storybook.js.org/docs/writing-tests/interaction-testing#writing-interaction-tests) for an overview of the available API events.

When Storybook finishes rendering the story, it executes the steps defined within the `play` function, interacting with the component and filling the form's information. All of this without the need for user intervention. If you check your `Interactions` panel, you'll see the step-by-step flow.

## 

[Working with the canvas](https://storybook.js.org/docs/writing-stories/play-function#working-with-the-canvas)

Part of the context passed to the `play` function is a `canvas` object. This object allows you to query the DOM of the rendered story. It provides a scoped version of the Testing Library queries, so you can use them as you would in a regular test.

CSF 3CSF Next 🧪

MyComponent.stories.ts|tsx

Typescript

```tsx
// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, vue3-vite, etc.
import type { Meta, StoryObj } from '@storybook/your-framework';
 
import { MyComponent } from './MyComponent';
 
const meta = {
  component: MyComponent,
} satisfies Meta<typeof MyComponent>;
export default meta;
 
type Story = StoryObj<typeof meta>;
 
export const ExampleStory: Story = {
  play: async ({ canvas, userEvent }) => {
    // Starts querying from the component's root element
    await userEvent.type(canvas.getByTestId('example-element'), 'something');
    await userEvent.click(canvas.getByRole('button'));
  },
};
```

If you need to query outside of the canvas (for example, to test a dialog that appears outside of the story root), you can use the `screen` object available from `storybook/test`.

CSF 3CSF Next 🧪

Dialog.stories.ts|tsx

Typescript

```tsx
// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, vue3-vite, etc.
import type { Meta, StoryObj } from '@storybook/your-framework';
import { screen } from 'storybook/test';
 
import { Dialog } from './Dialog';
 
const meta = {
  component: Dialog,
} satisfies Meta<typeof Dialog>;
export default meta;
 
type Story = StoryObj<typeof meta>;
 
export const Open: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Open dialog' }));
 
    // Starts querying from the document
    const dialog = screen.getByRole('dialog');
    await expect(dialog).toBeVisible();
  },
};
```

## [Composing stories](https://storybook.js.org/docs/writing-stories/play-function#composing-stories)

Thanks to the [Component Story Format](https://storybook.js.org/docs/api/csf), an ES6 module based file format, you can also combine your `play` functions, similar to other existing Storybook features (e.g., [args](https://storybook.js.org/docs/writing-stories/args)). For example, if you wanted to verify a specific workflow for your component, you could write the following stories:

CSF 3CSF Next 🧪

MyComponent.stories.ts|tsx

Typescript

```tsx
// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, vue3-vite, etc.
import type { Meta, StoryObj } from '@storybook/your-framework';
 
import { MyComponent } from './MyComponent';
 
const meta = {
  component: MyComponent,
} satisfies Meta<typeof MyComponent>;
export default meta;
 
type Story = StoryObj<typeof meta>;
 
/*
 * See https://storybook.js.org/docs/writing-stories/play-function#working-with-the-canvas
 * to learn more about using the canvas to query the DOM
 */
export const FirstStory: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByTestId('an-element'), 'example-value');
  },
};
 
export const SecondStory: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByTestId('other-element'), 'another value');
  },
};
 
export const CombinedStories: Story = {
  play: async ({ context, canvas, userEvent }) => {
    // Runs the FirstStory and Second story play function before running this story's play function
    await FirstStory.play(context);
    await SecondStory.play(context);
    await userEvent.type(canvas.getByTestId('another-element'), 'random value');
  },
};
```

By combining the stories, you're recreating the entire component workflow and can spot potential issues while reducing the boilerplate code you need to write.


## Sidebar & URLS

ReactVueAngularWeb ComponentsMore

Watch a video tutorial

Storybook’s sidebar lists all your stories grouped by component. When you have many components, you may also wish to group those components. To do so, you can add the `/` separator to the `title` of your CSF file, and Storybook will group the stories into groups based on common prefixes:

![Storybook sidebar anatomy](/docs-assets/10.3/configure/sidebar-anatomy.png)

We recommend using a nesting scheme that mirrors the filesystem path of the components. For example, if you have a file `components/modals/Alert.js`, name the CSF file `components/modals/Alert.stories.js` and title it `Components/Modals/Alert`.

### [Roots](https://storybook.js.org/docs/configure/user-interface/sidebar-and-urls#roots)

By default, Storybook will treat your top-level nodes as “roots”. Roots are displayed in the UI as “sections” of the hierarchy. Lower level groups will show up as folders:

![Storybook sidebar story roots](/docs-assets/10.3/configure/sidebar-roots.png)

If you’d prefer to show top-level nodes as folders rather than roots, you can set the `sidebar.showRoots` option to `false` in [`./storybook/manager.js`](https://storybook.js.org/docs/configure/user-interface/features-and-behavior):

./storybook/manager.js

```tsx
import { addons } from 'storybook/manager-api';
 
addons.setConfig({
  sidebar: {
    showRoots: false,
  },
});
```

## [Permalink to stories](https://storybook.js.org/docs/configure/user-interface/sidebar-and-urls#permalink-to-stories)

By default, Storybook generates an `id` for each story based on the component title and the story name. This `id` in particular is used in the URL for each story, and that URL can serve as a permalink (primarily when you [publish](https://storybook.js.org/docs/sharing/publish-storybook) your Storybook).

Consider the following story:

CSF 3CSF Next 🧪

FooBar.stories.ts|tsx

Typescript

```tsx
// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from '@storybook/your-framework';
 
import { Foo } from './Foo';
 
const meta = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/configure/#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Foo/Bar',
  component: Foo,
} satisfies Meta<typeof Foo>;
 
export default meta;
type Story = StoryObj<typeof meta>;
 
export const Baz: Story = {};
```

Storybook's ID-generation logic will give this the `id` `foo-bar--baz`, so the link would be `?path=/story/foo-bar--baz`.

It is possible to manually set the story's id, which is helpful if you want to rename stories without breaking permalinks. Suppose you want to change the position in the hierarchy to `OtherFoo/Bar` and the story name to `Moo`. Here's how to do that:

CSF 3CSF Next 🧪

FooBar.stories.ts|tsx

Typescript

```tsx
// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, vue3-vite, etc.
import type { Meta, StoryObj } from '@storybook/your-framework';
 
import { Foo } from './Foo';
 
const meta = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/configure/#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'OtherFoo/Bar',
  component: Foo,
  id: 'Foo/Bar', // Or 'foo-bar' if you prefer
} satisfies Meta<typeof Foo>;
 
export default meta;
type Story = StoryObj<typeof meta>;
 
export const Baz: Story = {
  name: 'Insert name here',
};
```

Storybook will prioritize the `id` over the title for ID generation if provided and prioritize the `story.name` over the export key for display.

## [CSF 3.0 auto-titles](https://storybook.js.org/docs/configure/user-interface/sidebar-and-urls#csf-30-auto-titles)

Storybook 6.4 introduced [CSF 3.0](https://storybook.js.org/blog/component-story-format-3-0/) as an experimental feature, allowing you to write stories more compactly. Suppose you're already using this format to write your stories. In that case, you can omit the `title` element from the meta (or default export) and allow Storybook automatically infer it based on the file's physical location. For example, given the following configuration and story:

CSF 3CSF Next 🧪

.storybook/main.ts

Typescript

```tsx
// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, vue3-vite, etc.
import type { StorybookConfig } from '@storybook/your-framework';
 
const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src'],
};
 
export default config;
```

When Storybook loads, the story can show up in the sidebar as `components/My Component`.

Auto-titles work with explicit titling options like the component's `title` and the story's `name`:

src/components/Button/Button.stories.ts|tsx

Typescript

```tsx
// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, vue3-vite, etc.
import type { Meta, StoryObj } from '@storybook/your-framework';
 
import { Button } from './Button';
 
const meta = {
  // Sets the name for the stories container
  title: 'components/Button',
  // The component name will be used if `title` is not set
  component: Button,
} satisfies Meta<typeof Button>;
 
export default meta;
type Story = StoryObj<typeof meta>;
 
// The story variable name will be used if `name` is not set
const Primary: Story = {
  // Sets the name for that particular story
  name: 'Primary',
  args: {
    label: 'Button',
  },
};
```

### [Auto-title filename case](https://storybook.js.org/docs/configure/user-interface/sidebar-and-urls#auto-title-filename-case)

Starting with Storybook 6.5, story titles generated automatically no longer rely on Lodash's [startCase](https://lodash.com/docs/#startCase). Instead, the file name casing is preserved, allowing additional control over the story title. For example, `components/My Component` will be defined as `components/MyComponent`.

If you need, you can revert to the previous pattern by adding the following configuration:

.storybook/manager.js

```
import { addons } from 'storybook/manager-api';
 
import startCase from 'lodash/startCase.js';
 
addons.setConfig({
  sidebar: {
    renderLabel: ({ name, type }) => (type === 'story' ? name : startCase(name)),
  },
});
```

### 

[Auto-title redundant filenames](https://storybook.js.org/docs/configure/user-interface/sidebar-and-urls#auto-title-redundant-filenames)

In addition to improvements to the story file name casing, a new heuristic was introduced, removing redundant names in case the filename has the same name as the directory name, or if it's called `index.stories.js|ts`. For example, before `components/MyComponent/MyComponent.stories.js` was defined as `Components/MyComponent/MyComponent` in the sidebar. Now it will be defined as `Components/MyComponent`.

If you need to preserve the naming scheme, you can add the `title` element to the meta (or default export). For example:

CSF 3CSF Next 🧪

components/MyComponent/MyComponent.stories.ts|tsx

Typescript

```tsx
// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, vue3-vite, etc.
import type { Meta, StoryObj } from '@storybook/your-framework';
 
import { MyComponent } from './MyComponent';
 
const meta = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/configure/#configure-story-loading
   * to learn how to generate automatic titles
   */
  component: MyComponent,
  title: 'components/MyComponent/MyComponent',
} satisfies Meta<typeof MyComponent>;
 
export default meta;
type Story = StoryObj<typeof meta>;
 
export const Basic: Story = {
  args: {
    something: 'Something else',
  },
};
```

### 

[Auto-title prefixes](https://storybook.js.org/docs/configure/user-interface/sidebar-and-urls#auto-title-prefixes)

Additionally, if you customize your Storybook to load your stories based on a [configuration object](https://storybook.js.org/docs/configure/index#with-a-configuration-object), including a `titlePrefix`, Storybook automatically prefixes all titles to matching stories. For example, assuming you have the following configuration:

CSF 3CSF Next 🧪

.storybook/main.ts

Typescript

```tsx
// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, vue3-vite, etc.
import type { StorybookConfig } from '@storybook/your-framework';
 
const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: [
    {
      directory: '../src',
      titlePrefix: 'Custom', // 👈 Configure the title prefix
    },
  ],
};
 
export default config;
```

#### When Storybook generates the titles for all matching stories, they'll retain the `Custom` prefix. 

[Story Indexers](https://storybook.js.org/docs/configure/user-interface/sidebar-and-urls#story-indexers)

[Story Indexers](https://storybook.js.org/docs/api/main-config/main-config-indexers) are a set of heuristics used by Storybook to crawl your filesystem based on a given glob pattern searching for matching stories, which is then used to generate an `index.json` (formerly `stories.json`) file responsible for populating the sidebar with the necessary information. By default, this heuristic will look for files that contain the following scheme `*.stories.@(js|jsx|mjs|ts|tsx)`.

You can provide your own indexer to include stories with a different naming convention, adjust the automatic title generation beyond a prefix, and many other use cases. For more information, see the [Story Indexers API reference](https://storybook.js.org/docs/api/main-config/main-config-indexers).