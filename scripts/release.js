#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const packagePath = path.join(__dirname, '../package.json');
const package = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

function getCurrentVersion() {
  return package.version;
}

function updateVersion(type = 'patch') {
  console.log(`🚀 Creating ${type} release...`);
  
  try {
    // Run tests
    console.log('🧪 Running tests...');
    execSync('npm test', { stdio: 'inherit' });
    
    // Build library
    console.log('🔨 Building library...');
    execSync('npm run build:lib', { stdio: 'inherit' });
    
    // Update version
    console.log(`📦 Updating version (${type})...`);
    execSync(`npm version ${type}`, { stdio: 'inherit' });
    
    // Get new version
    const newPackage = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    const newVersion = newPackage.version;
    
    console.log(`✅ Version updated: ${getCurrentVersion()} → ${newVersion}`);
    
    // Publish
    console.log('📤 Publishing to NPM...');
    execSync('npm publish', { stdio: 'inherit' });
    
    console.log(`🎉 Successfully published v${newVersion}!`);
    
    // Create git tag
    console.log('🏷️  Creating git tag...');
    execSync(`git tag v${newVersion}`, { stdio: 'inherit' });
    
    console.log('📋 Next steps:');
    console.log('  - Push changes: git push origin main');
    console.log('  - Push tags: git push origin --tags');
    console.log(`  - Update CHANGELOG.md for v${newVersion}`);
    
  } catch (error) {
    console.error('❌ Release failed:', error.message);
    process.exit(1);
  }
}

// Get release type from command line argument
const releaseType = process.argv[2] || 'patch';

if (!['patch', 'minor', 'major'].includes(releaseType)) {
  console.error('❌ Invalid release type. Use: patch, minor, or major');
  process.exit(1);
}

updateVersion(releaseType);