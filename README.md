# Egydata

[![NPM Version](https://img.shields.io/npm/v/egydata.svg)](https://www.npmjs.com/package/egydata)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/ahmed-ashraf-dv/egydata/blob/main/LICENSE)

Structured Egyptian geographical and timezone data for Node.js and the browser.

Provides a complete, offline dataset of Egyptian governorates, cities, landline and mobile area codes, and timezone utilities — with zero dependencies.

[View on GitHub](https://github.com/ahmed-ashraf-dv/egydata) | [View on NPM](https://www.npmjs.com/package/egydata)

## Installation

```bash
npm install egydata
```

## Quick Start

```javascript
// CommonJS
const { governorates, cities, phoneArea, timezone } = require("egydata");

// ESM
import { governorates, cities, phoneArea, timezone } from "egydata";
```

## Usage

### Governorates

```javascript
const { governorates } = require("egydata");

// Get all 27 governorates
const all = governorates.getAll();
// [{ id: 1, code: 'CAI', name: 'القاهرة', nameEn: 'Cairo' }, ...]

// Find by code
const cairo = governorates.getByCode("CAI");
// { id: 1, code: 'CAI', name: 'القاهرة', nameEn: 'Cairo' }

// Find by id
const gov = governorates.getById(2);
// { id: 2, code: 'ALX', name: 'الإسكندرية', nameEn: 'Alexandria' }

// Search (Arabic or English, partial match)
const results = governorates.search("alex");
// [{ id: 2, code: 'ALX', name: 'الإسكندرية', nameEn: 'Alexandria' }]

const arResults = governorates.search("القاهرة");
// [{ id: 1, code: 'CAI', name: 'القاهرة', nameEn: 'Cairo' }]
```

### Cities

```javascript
const { cities } = require("egydata");

// Get cities by governorate code
const cairoCities = cities.getByGovernorate("CAI");
// [{ id: 1, name: 'مدينة نصر', nameEn: 'Nasr City', governorateCode: 'CAI' }, ...]

// Find by id
const city = cities.getById(131);
// { id: 131, name: 'شرم الشيخ', nameEn: 'Sharm El Sheikh', governorateCode: 'SIS' }

// Search cities (Arabic or English, partial match)
const found = cities.search("Maadi");
// [{ id: 3, name: 'المعادي', nameEn: 'Maadi', governorateCode: 'CAI' }]
```

### Phone Area Codes

```javascript
const { phoneArea } = require("egydata");

// Get all area codes (landline and mobile)
const all = phoneArea.getAll();
// [{ code: '02', region: 'القاهرة والجيزة', regionEn: 'Cairo & Giza' }, ...]

// Look up a region by code
const region = phoneArea.getRegion("03");
// { code: '03', region: 'الإسكندرية', regionEn: 'Alexandria' }

// Find area code by region name
const entry = phoneArea.getCode("Mansoura");
// { code: '050', region: 'الدقهلية (المنصورة)', regionEn: 'Dakahlia (Mansoura)' }
```

### Timezone

```javascript
const { timezone } = require("egydata");

console.log(timezone.name); // 'Africa/Cairo'
console.log(timezone.offset); // '+02:00'

const now = timezone.now(); // Current date/time in Egypt (Date object)
console.log(now.toISOString());

console.log(timezone.isDST()); // true or false depending on current date (Egypt resumed DST in 2023)
```

## API Reference

### `governorates`

| Method            | Parameters         | Returns                          | Description                                                  |
| ----------------- | ------------------ | -------------------------------- | ------------------------------------------------------------ |
| `getAll()`        | —                  | `Array<Governorate>`             | Returns all 27 Egyptian governorates                         |
| `getByCode(code)` | `string`           | `Governorate \| undefined`       | Find a governorate by its code (e.g. `'CAI'`)                |
| `getById(id)`     | `number \| string` | `Governorate \| undefined`       | Find a governorate by its numeric id                         |
| `search(query)`   | `string`           | `Array<Governorate>`             | Search by Arabic or English name (partial, case-insensitive) |

**Governorate shape:** `{ id: number, code: string, name: string, nameEn: string }`

### `cities`

| Method                      | Parameters         | Returns                 | Description                                                  |
| --------------------------- | ------------------ | ----------------------- | ------------------------------------------------------------ |
| `getByGovernorate(govCode)` | `string`           | `Array<City>`           | Get all cities in a governorate                              |
| `getById(id)`               | `number \| string` | `City \| undefined`     | Find a city by its numeric id                                |
| `search(query)`             | `string`           | `Array<City>`           | Search by Arabic or English name (partial, case-insensitive) |

**City shape:** `{ id: number, name: string, nameEn: string, governorateCode: string }`

### `phoneArea`

| Method                | Parameters | Returns                    | Description                                             |
| --------------------- | ---------- | -------------------------- | ------------------------------------------------------- |
| `getAll()`            | —          | `Array<AreaCode>`          | Returns all Egyptian landline and mobile area codes     |
| `getRegion(code)`     | `string`   | `AreaCode \| undefined`    | Look up region info by area code                        |
| `getCode(regionName)` | `string`   | `AreaCode \| undefined`    | Find area code entry by region name (Arabic or English) |

**AreaCode shape:** `{ code: string, region: string, regionEn: string }`

### `timezone`

| Property / Method | Returns          | Description                                         |
| ----------------- | ---------------- | --------------------------------------------------- |
| `name`            | `'Africa/Cairo'` | IANA timezone identifier                            |
| `offset`          | `'+02:00'`       | UTC offset                                          |
| `now()`           | `Date`           | Current date/time in Egypt                          |
| `isDST(date?)`    | `boolean`        | Whether DST is active (optionally for a given date) |

## Data Coverage

- **27** governorates with Arabic and English names
- **389** cities and districts across all governorates
- **30** landline and mobile area codes
- Full timezone support for `Africa/Cairo`

## License

[MIT](LICENSE)
