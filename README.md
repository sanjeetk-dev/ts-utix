# TS-UTIX
# Utility Functions Collection

A set of useful utility functions for formatting numbers, strings, dates, and generating UUIDs.

## Installation

```bash
npm install ts-utix
```

## Usage

```javascript
import { formatNumber, kebabCase, UUID, relativeTime, getEmails } from 'ts-utix';
```

## API Reference

## `1.` Numbers 

### `formatNumber(num: number, unit?: "K" | "M" | "B" | "") => string`

Formats numbers with optional unit suffixes (K, M, B).

```javascript
formatNumber(1500);       // "1.5K"
formatNumber(2500000);    // "2.5M"
formatNumber(3140000000); // "3.1B"
formatNumber(900, "K");   // "900" (doesn't reach 1K)
formatNumber(2500, "K");  // "2.5K"
```

## `2.` Stirngs

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

### `getEmails() => string[]`

Get all the emails from an text 

```javascript
getEmails(text: string, domains?: string[]) => string[]

const text = "Contact support@sanjeet.com and admin@gmail.com for help.";
console.log(getEmails(text)); // ["support@sanjeet.com", "admin@gmail.com"]
console.log(getEmails(text, ["sanjeet.com"]));
// ["support@sanjeet.com"]
console.log(getEmails(text, ["sanjeet.com", "gmail.com"]));
// ["support@sanjeet.com", "admin@gmail.com"]
```

## `3.` Date And Time

### `a. relativeTime(date: Date) => string`

Returns human-readable relative time strings.

```javascript
import { formatDate, timeAgo, isLeapYear, getDaysInMonth, addDays, timeDifference, timestampToDate } from 'ts-utix'
```

### `b. formatDate(date: Date | string | number , format: "YYYY-MM-DD HH-mm-ss") => string`

```javascript
console.log(formatDate("2025-03-02", "YYYY-MM-DD")); // "2025-03-02"
console.log(formatDate(new Date(), "DD/MM/YYYY HH:mm:ss")); // "02/03/2025 14:30:45" (example output)
```

### `c. timeAgo(input: Date | string | number) => string`

```javascript
console.log(timeAgo(new Date(Date.now() - 1000 * 60 * 60 * 24 * 2))); // "2 days ago"
console.log(timeAgo(new Date(Date.now() + 1000 * 60 * 60 * 5))); // "in 5 hours"
```

### `d. isLeapYear(input: Date | number)`

```javascript
console.log(isLeapYear(2024)); // true
console.log(isLeapYear(new Date)); // 2025 => false
```

### `e. getDaysInMonth(input : Date | number , month?: number ) => number`

```javascript
console.log(getDaysInMonth(2025, 2)); // 28 (February 2025)
console.log(getDaysInMonth(new Date(2025, 3, 15))); // 30 (April 2025)
console.log(getDaysInMonth(new Date())); // Returns days in the current getDaysInMonth
```

### `f. addDays(input: Date | string | number, days: number) => string | Date`

```javascript
console.log(addDays("2025-03-02", 10)); // "2025-03-12"
console.log(addDays(new Date(), -5)); // Date 5 days package-lock.json
```

### `g. timeDifference(input1: Date | string | number, input2: Date | string | number) => `

```javascript
console.log(timeDifference("2025-03-02", "2025-03-05")); // { days: 3, hours: 0, minutes: 0, seconds: 0 }
console.log(timeDifference(new Date(), new Date(Date.now() + 1000 * 60 * 60 * 24 * 7))); // { days: 7, hours: 0, minutes: 0, seconds: 0 }
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