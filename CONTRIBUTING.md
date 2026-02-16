# Contributing to Vibe Visual

First off, thank you for considering contributing to Vibe Visual! 🎉

It's people like you that make this Power BI custom visual better for everyone. We welcome contributions from the community and are excited to work with you.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Guidelines](#coding-guidelines)
- [Submitting Changes](#submitting-changes)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior through GitHub issues.

## 🤝 How Can I Contribute?

### Reporting Bugs 🐛

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** (screenshots, GIFs, or data samples)
- **Describe the behavior you observed** and what you expected
- **Include details about your environment**:
  - Power BI Desktop version
  - Operating system
  - Browser (if using Power BI Service)
  - Visual version

Use our [Bug Report Template](.github/ISSUE_TEMPLATE/bug_report.md) when available.

### Suggesting Features 💡

Feature suggestions are welcome! Before creating a feature request:

- Check if the feature has already been suggested
- Consider if it aligns with the project's scope and goals
- Provide a clear use case and expected behavior

Use our [Feature Request Template](.github/ISSUE_TEMPLATE/feature_request.md) when available.

### Pull Requests 🔀

We actively welcome your pull requests:

1. Fork the repo and create your branch from `main`
2. Make your changes following our coding guidelines
3. Test your changes thoroughly in Power BI Desktop
4. Update documentation if needed
5. Ensure the linter passes
6. Submit a pull request!

## 🛠️ Development Setup

### Prerequisites

- **Node.js** >= 18.0.0 (LTS recommended) and **npm** >= 8.0.0
- **Power BI Desktop** (latest version recommended)
- **Power BI Custom Visuals Tools** (pbiviz CLI)

### Installation

1. **Clone your fork:**

```bash
git clone https://github.com/YOUR_USERNAME/VIBE-Visual.git
cd VIBE-Visual
```

2. **Install dependencies:**

```bash
npm install
```

3. **Install developer certificate** (first time only):

```bash
pbiviz --install-cert
```

Accept the certificate installation prompts. This allows you to test the visual in Power BI Desktop.

### Development Workflow

#### Start Development Server

```bash
npm start
```

This starts the visual in developer mode at `https://localhost:8080/assets/status`.

#### Test in Power BI Desktop

1. Open Power BI Desktop
2. Go to **Settings** → **Options** → **Security**
3. Enable **Developer mode** under Custom Visuals
4. In your report, insert the visual using the **Developer Visual** icon
5. The visual will automatically reload when you make changes

#### Build Package

```bash
npm run package
```

Creates a `.pbiviz` file in the `dist/` folder that you can import into Power BI.

#### Run Linter

```bash
npm run lint
```

Always run the linter before committing to catch code quality issues.

## 📝 Coding Guidelines

### TypeScript Style

- **Use TypeScript** for all source files
- **Enable strict mode** - follow `tsconfig.json` settings
- **Define types explicitly** - avoid `any` where possible
- **Use interfaces** for complex data structures
- **Add JSDoc comments** for public methods and interfaces

### Code Formatting

- **Indentation**: 4 spaces
- **Line length**: Aim for 120 characters max
- **Naming conventions**:
  - `camelCase` for variables and functions
  - `PascalCase` for classes and interfaces
  - `UPPER_SNAKE_CASE` for constants
- **No trailing whitespace**
- **End files with a newline**

### Power BI Visual Best Practices

- **Performance**: Minimize DOM manipulation, reuse elements when possible
- **Responsiveness**: Handle viewport changes smoothly
- **Data handling**: Always validate data from `DataView`
- **Error handling**: Fail gracefully with user-friendly messages
- **Accessibility**: Use semantic SVG elements where applicable
- **Cross-filtering**: Implement SelectionManager properly

### File Organization

- **src/visual.ts** - Main visual implementation (IVisual interface)
- **src/settings.ts** - Formatting settings model
- **capabilities.json** - Visual capabilities and properties
- **style/visual.less** - Minimal styling only

### Comments

- Write clear, concise comments explaining **why**, not **what**
- Use JSDoc for public APIs and complex logic
- Avoid obvious comments like `// increment i`
- Document magic numbers with meaningful explanations

Example:
```typescript
/**
 * Calculates optimal label step to prevent overcrowding.
 * 
 * @param bandwidth - Available width per category
 * @returns Label step (show every Nth label)
 */
private getLabelStep(bandwidth: number): number {
    const minLabelWidth = 40; // Minimal readable label width in pixels
    return Math.max(1, Math.ceil(minLabelWidth / Math.max(1, bandwidth)));
}
```

## 🚀 Submitting Changes

### Branch Naming

Use descriptive branch names:
- `feature/add-horizontal-bars`
- `fix/selection-manager-memory-leak`
- `docs/improve-readme-examples`
- `refactor/extract-rendering-logic`

### Commit Messages

Write clear commit messages:

```
Add gradient fill option for bars

- Implement gradient color picker in formatting pane
- Update renderBars() to apply linear gradients
- Add tests for gradient rendering
- Update documentation with gradient examples

Closes #42
```

**Format:**
- First line: Short summary (50 chars or less)
- Blank line
- Detailed description if needed
- Reference related issues

### Pull Request Checklist

Before submitting your PR, ensure:

- [ ] Code follows the style guidelines
- [ ] JSDoc comments added for new methods
- [ ] Linter passes (`npm run lint`)
- [ ] Package builds successfully (`npm run package`)
- [ ] Tested in Power BI Desktop with sample data
- [ ] No console errors or warnings
- [ ] Documentation updated if needed (README, capabilities, etc.)
- [ ] CHANGELOG.md updated with your changes
- [ ] PR description clearly explains the changes

### Code Review Process

1. At least one maintainer will review your PR
2. Address any feedback or requested changes
3. Once approved, a maintainer will merge your PR
4. Your contribution will be included in the next release!

## 🧪 Testing

### Manual Testing Checklist

Before submitting, test your changes:

- [ ] Visual renders correctly with sample data
- [ ] Formatting pane controls work as expected
- [ ] Resizing the visual works smoothly
- [ ] Cross-filtering works (click bars, click empty space)
- [ ] Hover effects function properly
- [ ] No errors in browser console
- [ ] Works with empty data (shows "No data" message)
- [ ] Handles null/undefined values gracefully
- [ ] Large datasets render efficiently

### Test Data

Use the sample data in `examples/sample-data.csv` or create your own test dataset with:
- Various category lengths (short, long, special characters)
- Different value ranges (negative, zero, very large)
- Edge cases (single data point, hundreds of points)

## 📚 Additional Resources

- [Power BI Visuals Documentation](https://learn.microsoft.com/en-us/power-bi/developer/visuals/)
- [Power BI Visuals SDK](https://github.com/microsoft/PowerBI-visuals-tools)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [D3.js Documentation](https://d3js.org/)

## ❓ Questions?

Don't hesitate to ask questions! You can:

- Open an issue with the `question` label
- Start a discussion in [GitHub Discussions](https://github.com/ravi-chandu/VIBE-Visual/discussions)
- Comment on existing issues or pull requests

## 🏆 Recognition

Contributors will be recognized in:
- GitHub's automatic contributor list
- Future release notes
- Project documentation

Thank you for contributing to Vibe Visual! 🎨✨
