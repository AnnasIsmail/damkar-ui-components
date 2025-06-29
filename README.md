# Package Name

Deskripsi singkat tentang package Anda.

## Instalasi

```bash
npm install @username/package-name
```

## Penggunaan

```javascript
import { greet, add, multiply } from '@username/package-name';

// Atau menggunakan CommonJS
const { greet, add, multiply } = require('@username/package-name');

console.log(greet('World')); // Hello, World!
console.log(add(2, 3)); // 5
console.log(multiply(4, 5)); // 20
```

## API

### `greet(name: string): string`

Mengembalikan pesan sapaan.

### `add(a: number, b: number): number`

Menambahkan dua angka.

### `multiply(a: number, b: number): number`

Mengalikan dua angka.

## Development

```bash
# Install dependencies
npm install

# Build package
npm run build

# Run tests
npm test

# Development mode
npm run dev
```

## License

MIT