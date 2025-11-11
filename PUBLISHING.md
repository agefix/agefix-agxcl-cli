# AGXCL CLI Publishing Guide

## 🚀 Publishing to NPM

### Prerequisites

1. **NPM Account**: Ensure you have an NPM account with publishing permissions for `@agefix` scope
2. **Authentication**: Log in to NPM: `npm login`
3. **Build Ready**: Ensure TypeScript compilation is successful

### Publishing Steps

#### 1. Pre-Publishing Checks
```bash
cd sdk/agxcl-cli

# Install dependencies
npm install

# Build TypeScript
npm run build

# Run tests (if any)
npm test

# Lint code
npm run lint
```

#### 2. Version Management
```bash
# Update version (choose one)
npm version patch  # Bug fixes (1.0.0 -> 1.0.1)
npm version minor  # New features (1.0.0 -> 1.1.0)
npm version major  # Breaking changes (1.0.0 -> 2.0.0)
```

#### 3. Publish to NPM
```bash
# Dry run (test what would be published)
npm publish --dry-run

# Publish to NPM
npm publish --access public
```

#### 4. Verify Publication
```bash
# Check if package is available
npm info @agefix/agxcl-cli

# Test installation globally
npm install -g @agefix/agxcl-cli

# Test CLI functionality
agxcl version
agxcl --help
```

### 📋 Publishing Checklist

- [ ] Dependencies properly declared in package.json
- [ ] TypeScript compilation successful (`npm run build`)
- [ ] Binary executable (`bin/agxcl.js`) is executable
- [ ] README.md includes comprehensive documentation
- [ ] LICENSE file is present
- [ ] Version number updated appropriately
- [ ] All files listed in `files` array of package.json
- [ ] NPM authentication configured
- [ ] Scope `@agefix` permissions verified

### 🔧 Troubleshooting

#### Permission Issues
```bash
# If you get permission errors
npm whoami  # Verify logged in user
npm org:list agefix  # Check organization access
```

#### Binary Not Executable
```bash
# Make binary executable
chmod +x bin/agxcl.js
```

#### Scoped Package Issues
```bash
# Ensure public access for scoped packages
npm publish --access public
```

### 🌐 Post-Publication

1. **Update Documentation**: Update references in AgeFix developer docs
2. **Test Installation**: Verify CLI works on fresh installations
3. **Announce**: Update developer community about new CLI availability
4. **Monitor**: Watch for issues and user feedback

### 📊 Package Statistics

After publishing, monitor:
- Download statistics: https://www.npmjs.com/package/@agefix/agxcl-cli
- Usage patterns and user feedback
- Bug reports and feature requests

### 🔄 Maintenance

#### Regular Updates
- Security patches
- Dependency updates
- Feature enhancements
- Bug fixes

#### Deprecation (if needed)
```bash
# Deprecate specific version
npm deprecate @agefix/agxcl-cli@1.0.0 "Please upgrade to v1.1.0"

# Unpublish (only within 72 hours)
npm unpublish @agefix/agxcl-cli@1.0.0
```

---

## 📞 Support

For publishing issues, contact:
- AgeFix Development Team
- NPM Support for package-specific issues