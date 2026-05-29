# font-size

Utilities for controlling the font size of an element.

| Class                             | font-size                                | line-height                                              |
| --------------------------------- | ---------------------------------------- | -------------------------------------------------------- |
| `text-xs`                         | `var(--text-xs); /* 0.75rem (12px) */`   | `var(--text-xs--line-height); /* calc(1 / 0.75) */`      |
| `text-sm`                         | `var(--text-sm); /* 0.875rem (14px) */`  | `var(--text-sm--line-height); /* calc(1.25 / 0.875) */`  |
| `text-base`                       | `var(--text-base); /* 1rem (16px) */`    | `var(--text-base--line-height); /* calc(1.5 / 1) */`     |
| `text-lg`                         | `var(--text-lg); /* 1.125rem (18px) */`  | `var(--text-lg--line-height); /* calc(1.75 / 1.125) */`  |
| `text-xl`                         | `var(--text-xl); /* 1.25rem (20px) */`   | `var(--text-xl--line-height); /* calc(1.75 / 1.25) */`   |
| `text-2xl`                        | `var(--text-2xl); /* 1.5rem (24px) */`   | `var(--text-2xl--line-height); /* calc(2 / 1.5) */`      |
| `text-3xl`                        | `var(--text-3xl); /* 1.875rem (30px) */` | `var(--text-3xl--line-height); /* calc(2.25 / 1.875) */` |
| `text-4xl`                        | `var(--text-4xl); /* 2.25rem (36px) */`  | `var(--text-4xl--line-height); /* calc(2.5 / 2.25) */`   |
| `text-5xl`                        | `var(--text-5xl); /* 3rem (48px) */`     | `var(--text-5xl--line-height); /* 1 */`                  |
| `text-6xl`                        | `var(--text-6xl); /* 3.75rem (60px) */`  | `var(--text-6xl--line-height); /* 1 */`                  |
| `text-7xl`                        | `var(--text-7xl); /* 4.5rem (72px) */`   | `var(--text-7xl--line-height); /* 1 */`                  |
| `text-8xl`                        | `var(--text-8xl); /* 6rem (96px) */`     | `var(--text-8xl--line-height); /* 1 */`                  |
| `text-9xl`                        | `var(--text-9xl); /* 8rem (128px) */`    | `var(--text-9xl--line-height); /* 1 */`                  |
| `text-(length:<custom-property>)` | `var(<custom-property>);`                | —                                                        |
| `text-[<value>]`                  | `<value>;`                               | —                                                        |

## [Default theme variable reference](https://tailwindcss.com/docs/theme#default-theme-variable-reference)

### Text related default theme variables

For reference, here's a complete list of the theme variables included by default
when you import Tailwind CSS into your project:

```css
--text-xs: 0.75rem;
--text-xs--line-height: calc(1 / 0.75);
--text-sm: 0.875rem;
--text-sm--line-height: calc(1.25 / 0.875);
--text-base: 1rem;
--text-base--line-height: calc(1.5 / 1);
--text-lg: 1.125rem;
--text-lg--line-height: calc(1.75 / 1.125);
--text-xl: 1.25rem;
--text-xl--line-height: calc(1.75 / 1.25);
--text-2xl: 1.5rem;
--text-2xl--line-height: calc(2 / 1.5);
--text-3xl: 1.875rem;
--text-3xl--line-height: calc(2.25 / 1.875);
--text-4xl: 2.25rem;
--text-4xl--line-height: calc(2.5 / 2.25);
--text-5xl: 3rem;
--text-5xl--line-height: 1;
--text-6xl: 3.75rem;
--text-6xl--line-height: 1;
--text-7xl: 4.5rem;
--text-7xl--line-height: 1;
--text-8xl: 6rem;
--text-8xl--line-height: 1;
--text-9xl: 8rem;
--text-9xl--line-height: 1;

--text-shadow-2xs: 0px 1px 0px rgb(0 0 0 / 0.15);
--text-shadow-xs: 0px 1px 1px rgb(0 0 0 / 0.2);
--text-shadow-sm:
  0px 1px 0px rgb(0 0 0 / 0.075), 0px 1px 1px rgb(0 0 0 / 0.075),
  0px 2px 2px rgb(0 0 0 / 0.075);
--text-shadow-md:
  0px 1px 1px rgb(0 0 0 / 0.1), 0px 1px 2px rgb(0 0 0 / 0.1),
  0px 2px 4px rgb(0 0 0 / 0.1);
--text-shadow-lg:
  0px 1px 2px rgb(0 0 0 / 0.1), 0px 3px 2px rgb(0 0 0 / 0.1),
  0px 4px 8px rgb(0 0 0 / 0.1);

--font-weight-thin: 100;
--font-weight-extralight: 200;
--font-weight-light: 300;
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
--font-weight-extrabold: 800;
--font-weight-black: 900;

--tracking-tighter: \-0.05em;
--tracking-tight: \-0.025em;
--tracking-normal: 0em;
--tracking-wide: 0.025em;
--tracking-wider: 0.05em;
--tracking-widest: 0.1em;

--leading-tight: 1.25;
--leading-snug: 1.375;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
--leading-loose: 2;
```
