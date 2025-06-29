# Langkah-langkah Deploy ke NPM

## 1. Persiapan Awal

### Buat akun NPM
1. Kunjungi [npmjs.com](https://www.npmjs.com)
2. Daftar akun baru atau login
3. Verifikasi email Anda

### Setup lokal
```bash
# Login ke npm dari terminal
npm login

# Atau jika menggunakan 2FA
npm login --auth-type=web
```

## 2. Konfigurasi Package

### Update package.json
- **name**: Gunakan format `@username/package-name` untuk scoped package
- **version**: Mulai dari `1.0.0` atau `0.1.0`
- **main**: Entry point untuk CommonJS
- **module**: Entry point untuk ES modules
- **types**: File definisi TypeScript
- **files**: Array file yang akan dipublish
- **repository**: URL repository GitHub
- **keywords**: Kata kunci untuk pencarian

### Pastikan nama package tersedia
```bash
npm view @username/package-name
# Jika error "404", nama tersedia
```

## 3. Development & Testing

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build package
npm run build
```

## 4. Pre-publish Checklist

- [ ] Tests passing
- [ ] Build berhasil
- [ ] README.md lengkap
- [ ] LICENSE file ada
- [ ] .npmignore configured
- [ ] Version number correct

## 5. Publish ke NPM

### Publish pertama kali
```bash
# Untuk scoped package (public)
npm publish --access public

# Untuk regular package
npm publish
```

### Update version dan publish
```bash
# Patch version (1.0.0 -> 1.0.1)
npm version patch

# Minor version (1.0.0 -> 1.1.0)
npm version minor

# Major version (1.0.0 -> 2.0.0)
npm version major

# Publish update
npm publish
```

## 6. Verifikasi

```bash
# Cek package di npm
npm view @username/package-name

# Test install di project lain
npm install @username/package-name
```

## 7. Maintenance

### Unpublish (hanya dalam 72 jam)
```bash
npm unpublish @username/package-name@version
```

### Deprecate version
```bash
npm deprecate @username/package-name@version "Reason for deprecation"
```

### Update package info
```bash
npm owner add <username> @username/package-name
npm owner rm <username> @username/package-name
```

## Tips Penting

1. **Semantic Versioning**: Gunakan semver (major.minor.patch)
2. **Testing**: Selalu test sebelum publish
3. **Documentation**: README yang jelas sangat penting
4. **Security**: Jangan include sensitive data
5. **Size**: Keep package size minimal
6. **Dependencies**: Hati-hati dengan dependencies

## Troubleshooting

### Error: Package name already exists
- Gunakan scoped package: `@username/package-name`
- Atau pilih nama yang unik

### Error: 403 Forbidden
- Pastikan sudah login: `npm whoami`
- Untuk scoped package: `npm publish --access public`

### Error: Version already exists
- Update version: `npm version patch`
- Atau manual edit package.json

## Automation dengan GitHub Actions

Buat file `.github/workflows/publish.yml`:

```yaml
name: Publish to NPM

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm test
      - run: npm run build
      - run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```