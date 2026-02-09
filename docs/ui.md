# UI Coding Standards

## Component Library

**shadcn/ui is the ONLY component library permitted in this project.**

- All UI must be built exclusively with [shadcn/ui](https://ui.shadcn.com/) components.
- **Do NOT create custom components.** Use shadcn/ui primitives and compose them as needed.
- Add new shadcn/ui components via the CLI: `npx shadcn@latest add <component>`
- Components are installed to `src/components/ui/` and utilities to `src/lib/utils.ts`.

### Configuration

- **Style:** new-york
- **Icon library:** lucide-react
- **CSS variables:** enabled (neutral base color)
- **RSC compatible:** yes

## Date Formatting

All dates must be formatted using [date-fns](https://date-fns.org/).

### Required Format

Dates must use ordinal day, abbreviated month, and full year:

```
1st Sep 2025
2nd Aug 2025
3rd Jan 2026
4th Jun 2024
```

### Implementation

```ts
import { format } from "date-fns";

function formatDate(date: Date): string {
  const day = format(date, "d");
  const suffix = getOrdinalSuffix(Number(day));
  return `${day}${suffix} ${format(date, "MMM yyyy")}`;
}

function getOrdinalSuffix(day: number): string {
  if (day >= 11 && day <= 13) return "th";
  switch (day % 10) {
    case 1: return "st";
    case 2: return "nd";
    case 3: return "rd";
    default: return "th";
  }
}
```

## Summary

| Concern | Standard |
| --- | --- |
| UI components | shadcn/ui only, no custom components |
| Icons | lucide-react |
| Date formatting | date-fns with ordinal format (`1st Sep 2025`) |
