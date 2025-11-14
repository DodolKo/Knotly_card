# Style System Architecture

## How the System Works

Due to Tailwind CSS v4 limitations with `@apply` referencing custom component classes, we use a **composition pattern**:

1. **Style files** (`default.css`, `custom.css`, etc.) contain the **source of truth** for styles
2. **`index.css`** copies the utilities from style files into component classes
3. **Components** use classes from `index.css` only

## How to Add New Style Files

1. **Create a new CSS file** in `/src/style/` directory (e.g., `custom.css`)

```css
@import "tailwindcss";

@layer components {
  .custom-button {
    @apply bg-blue-500 text-white px-4 py-2 rounded;
  }
  
  .custom-card {
    @apply bg-white shadow-lg p-6 rounded-lg;
  }
}
```

2. **Import it in `index.css`**:
```css
@import "./style/default.css";
@import "./style/custom.css";  /* Add your new file here */
```

3. **Copy the utilities** from your custom classes into `index.css` component classes:
```css
@layer components {
  .my-button {
    /* Copy utilities from .custom-button in custom.css */
    @apply bg-blue-500 text-white px-4 py-2 rounded;
    @apply hover:bg-blue-600;  /* Add additional styles */
  }
  
  .my-card {
    /* Copy utilities from .custom-card in custom.css */
    @apply bg-white shadow-lg p-6 rounded-lg;
  }
}
```

## Important Notes

- **Style files** (`default.css`, `custom.css`) are the **source of truth** and documentation
- **`index.css`** contains the actual component classes used by components
- **Components** should only use classes from `index.css` (not directly from style files)
- When updating styles, update both the style file AND `index.css`
- This keeps styles organized and maintainable while working within Tailwind v4 limitations

