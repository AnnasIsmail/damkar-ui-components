#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function checkPackageExists(packageName) {
  try {
    const result = execSync(`npm view ${packageName} version`, { encoding: 'utf8' });
    return result.trim();
  } catch (error) {
    return null;
  }
}

function suggestAlternativeNames(baseName) {
  const alternatives = [
    `${baseName}-components`,
    `${baseName}-ui-kit`,
    `${baseName}-design-system`,
    `react-${baseName}`,
    `${baseName}-react`,
    `@${baseName.split('/')[1] || baseName}/ui`,
    `@${baseName.split('/')[1] || baseName}/components`,
    `@${baseName.split('/')[1] || baseName}/design-system`
  ];
  
  return alternatives;
}

function main() {
  const packagePath = path.join(__dirname, '../package.json');
  const package = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const packageName = package.name;
  
  console.log(`🔍 Checking package name: ${packageName}`);
  
  const existingVersion = checkPackageExists(packageName);
  
  if (existingVersion) {
    console.log(`📦 Package already exists with version: ${existingVersion}`);
    console.log(`📋 Current local version: ${package.version}`);
    
    if (package.version <= existingVersion) {
      console.log('⚠️  Local version is not higher than published version!');
      console.log('💡 Options:');
      console.log('  1. Update version number in package.json');
      console.log('  2. Use npm version command: npm version patch|minor|major');
      console.log('  3. Choose a different package name');
      
      console.log('\n🎯 Alternative package names:');
      const alternatives = suggestAlternativeNames(packageName);
      alternatives.forEach((alt, index) => {
        const altExists = checkPackageExists(alt);
        const status = altExists ? '❌ taken' : '✅ available';
        console.log(`  ${index + 1}. ${alt} ${status}`);
      });
    } else {
      console.log('✅ Local version is higher. Ready to publish!');
    }
  } else {
    console.log('✅ Package name is available!');
  }
}

main();