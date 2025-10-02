Adding component classes
Use the components layer for any more complicated classes you want to add to your project that you'd still like to be able to override with utility classes.

Traditionally these would be classes like card, btn, badge — that kind of thing.

@layer components {
  .card {
    background-color: var(--color-white);
    border-radius: var(--radius-lg);
    padding: --spacing(6);
    box-shadow: var(--shadow-xl);
  }
}
By defining component classes in the components layer, you can still use utility classes to override them when necessary:

HTML
<!-- Will look like a card, but with square corners -->
<div class="card rounded-none">
  <!-- ... -->
</div>
Using Tailwind you probably don't need these types of classes as often as you think. Read our guide on managing duplication for our recommendations.

The components layer is also a good place to put custom styles for any third-party components you're using:

CSS
@layer components {
  .select2-dropdown {
    /* ... */
  }
}