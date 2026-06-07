# Theme

This guide will help you customize the Express checkout button—covering themes, shapes, and text—to ensure a
seamless and trustworthy checkout experience, while leveraging Klarna’s strong brand to boost your
conversions.

Styling the Express checkout button is crucial for integrating it into your online store in a way that
complements your brand and encourages user engagement. To modify the style of the button, edit the source code
as explained in this guide.

The theme defines the button’s color. You can change the theme by setting the value of the `theme` attribute.

Apart from the default dark theme, you can apply the light theme to have the button displayed in white, or the
outlined theme to render the white button with an outline.

![An image showing shopping site prototypes with all available colors that can be selected for the Express checkout button theme: the default dark theme, the light theme, and the outlined theme.](/static/assets/KECThemePreview.jpeg)

_Apply custom styling to display Express checkout button in different colors, shapes, and sizes._

### Default theme (dark)

The button’s default theme color is dark. As the `theme` attribute is optional, the default theme is applied
both when you set the attribute to `default` or if you omit it from the source code altogether.

We recommend using the default theme as it’s widely recognized by Klarna customers and looks good on light
backgrounds.

![An image showing the Express checkout button in the default dark theme with a black background.](/static/assets/KEC-Default.jpeg)

_Express checkout button in the default dark theme._

```javascript
window.klarnaAsyncCallback =  () => {
  window.Klarna.Payments.Buttons.init(...).load(
    {
      container: "#container",
      theme: "default", // Used to set the theme of the button
      ...
  ):
};

```

Sample code to render the default Express checkout button.

### Light theme

Use the light theme to make the button visible on dark backgrounds. To apply the light theme, set the `theme`
attribute to `light`.

![An image showing the Express checkout button in the light theme with a white background.](/static/assets/KEC-Light.jpeg)

_The Express checkout button in the light theme._

```javascript
window.klarnaAsyncCallback =  () => {
  window.Klarna.Payments.Buttons.init(...).load(
    {
      container: "#container",
      theme: "light", // Used to set the theme of the button to light
      ...
  ):
};

```

Sample code to render a white Express Checkout button.

### Outlined theme

Use the outlined theme to make the button visible on all backgrounds. To apply the this theme, set the `theme`
attribute to `outlined`.

![An image showing the Express checkout button in the outlined theme with a black border and a white background.](/static/assets/KEC-Outline.jpeg)

_The Express checkout button in the outlined theme._

```javascript
window.klarnaAsyncCallback =  () => {
  window.Klarna.Payments.Buttons.init(...).load(
    {
      container: "#container",
      theme: "outlined", // Used to set the theme of the button
      ...
  ):
};

```

Sample code to render a white, outlined Express checkout button.

## Button shape

Customizing the shape of the button to match your site's look and feel is a key step in creating a visually
cohesive and engaging user experience. To control the button's shape, change the value of the `shape`
attribute.

There are three shapes available with the Express checkout button: default, rectangular, and pill.

![An image showing shopping site prototypes with all available shapes that can be applied to the Express checkout button: the default shape, the rectangular shape, and the pill shape.](/static/assets/Ronded-corners-styling.png)

_Apply styling to display the Express checkout button in different shapes._

### Rounded corners (default)

The default button shape is a rectangle with rounded corners. To apply the default shape, set the `shape`
attribute of the element to `default`.

![An image showing the Express checkout button in the default rectangular shape with rounded corners.](/static/assets/KEC-Default.jpeg)

_Express checkout button in the default shape._

```javascript
window.klarnaAsyncCallback =  () => {
  window.Klarna.Payments.Buttons.init(...).load(
    {
      container: "#container",
      shape: "default", // Used to define the shape of the button
      ...
  ):
};

```

Sample code to render the Express checkout button in the default shape.

### Rectangular shape

To apply the rectangular shape with square corners, set the `shape` attribute of the element to `rect`.

![](/static/assets/KEC-Rect.jpeg)

_The Express checkout button with square corners._

```javascript
window.klarnaAsyncCallback =  () => {
  window.Klarna.Payments.Buttons.init(...).load(
    {
      container: "#container",
      shape: "rect", // Used to style the button with a rectangular shape with square corners
      ...
  ):
};

```

Sample code to render the Express checkout button in the rectangle shape with square corners.

### Pill shape

To apply the pill shape, set the `shape` attribute of the element to `pill`.

![An image showing the Express checkout button in the pill shape.](/static/assets/KEC-Pill.jpeg)

_The Express checkout button in the pill shape._

```javascript
window.klarnaAsyncCallback =  () => {
  window.Klarna.Payments.Buttons.init(...).load(
    {
      container: "#container",
      shape: "pill", // Used to style the button in a pill shape
      ...
  ):
};

```

Sample code to render the Express checkout button in the pill shape. ⚛️React Not Detected React is not
detected on this page. Please ensure you're visiting a React application.
