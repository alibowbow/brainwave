## 2024-05-24 - Routine Library Search Input UX Improvement
**Learning:** Adding a custom clear search button (X) to an `<input type="search">` creates a duplicate icon if the browser's native webkit cancel button is not explicitly hidden. The `appearance-none` class is often not enough; `display: none` (like Tailwind's `hidden`) on the `::-webkit-search-cancel-button` pseudo-element is required.
**Action:** Always include `[&::-webkit-search-cancel-button]:hidden` when designing a custom clear button for a search input to ensure a clean UI.
