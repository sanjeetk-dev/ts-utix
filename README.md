# UTIX
# Utility Functions Collection

A set of useful utility functions for formatting numbers, strings, dates, and generating UUIDs.

## Installation

```bash
npm install ts-utix
```

## Usage

```javascript
import { formatNumber, kebabCase, UUID, relativeTime } from 'ts-utix';
```

## API Reference

### `formatNumber(num: number, unit?: "K" | "M" | "B" | "") => string`

Formats numbers with optional unit suffixes (K, M, B).

```javascript
formatNumber(1500);       // "1.5K"
formatNumber(2500000);    // "2.5M"
formatNumber(3140000000); // "3.1B"
formatNumber(900, "K");   // "900" (doesn't reach 1K)
formatNumber(2500, "K");  // "2.5K"
```

### `kebabCase(str: string) => string`

Converts strings to kebab-case format.

```javascript
kebabCase("HelloWorld");     // "hello-world"
kebabCase("someMixed_string"); // "some-mixed-string"
kebabCase("GET_DATA_FROM_API"); // "get-data-from-api"
```

### `UUID() => string`

Generates RFC 4122 compliant UUID v4.

```javascript
UUID(); // e.g. "f47ac10b-58cc-4372-a567-0e02b2c3d479"
```

### `relativeTime(date: Date) => string`

Returns human-readable relative time strings.

```javascript
const yesterday = new Date(Date.now() - 86400000);
relativeTime(yesterday); // "1 day ago"

const nextWeek = new Date(Date.now() + 604800000);
relativeTime(nextWeek);  // "in 7 days"
```

## Features

- Zero dependencies
- TypeScript support
- Browser and Node.js compatible
- Comprehensive type definitions
- 100% test coverage

## Requirements

- ECMAScript 2015 (ES6) or newer
- Node.js 20+ or modern browser