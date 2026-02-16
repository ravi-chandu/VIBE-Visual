# Vibe Visual 🎨

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Power BI](https://img.shields.io/badge/Power%20BI-Custom%20Visual-yellow.svg)](https://powerbi.microsoft.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.4-blue.svg)](https://www.typescriptlang.org/)

> Modern open-source Power BI custom visual for creating beautiful, interactive SVG bar charts with customizable colors, animations, and cross-filtering support. Built with AI vibe coding.

## 📸 Screenshots

_Screenshots coming soon! Help us improve by adding visual examples._

<!-- 
Add your screenshots here:
![Visual in Power BI](examples/screenshots/vibevisual-demo.gif)
-->

## ✨ Features

- **Pure SVG Rendering** - Clean, scalable vector graphics with no DOM overhead
- **Customizable Colors** - Full control over bar colors, axis colors, and background
- **Interactive Data Labels** - Toggle value labels on/off with configurable font sizes
- **Smooth Animations** - Eye-catching initial render animations for better UX
- **Hover Effects** - Visual feedback with opacity changes on hover
- **Cross-Filtering Support** - Click bars to filter other visuals, click empty space to clear
- **Responsive Design** - Automatically adjusts to viewport size
- **Smart Label Truncation** - Long category names are truncated with ellipsis
- **Accessible Axes** - Clear X and Y axes with tick marks and properly formatted values
- **Performance Optimized** - Efficient rendering even with large datasets

## 🚀 Installation

### Prerequisites

- **Node.js** >= 18.0.0 (LTS recommended)
- **npm** >= 8.0.0
- **Power BI Custom Visuals Tools** (pbiviz CLI)

Install Power BI Custom Visuals Tools globally:

```bash
npm install -g powerbi-visuals-tools
```

### Setup

1. Clone this repository:

```bash
git clone https://github.com/ravi-chandu/VIBE-Visual.git
cd VIBE-Visual
```

2. Install dependencies:

```bash
npm install
```

3. Trust the development certificate (first time only):

```bash
pbiviz --install-cert
```

## 💻 Development

### Start Development Server

Run the visual in development mode with live reload:

```bash
npm start
```

The visual will be available at `https://localhost:8080/assets/status`. Enable developer mode in Power BI Desktop and add the visual from the "Developer visual" icon.

### Build Package

Create a `.pbiviz` package file for distribution:

```bash
npm run package
```

The package will be created in the `dist/` folder.

### Linting

Check code quality:

```bash
npm run lint
```

## 📦 Usage in Power BI

### Import Visual

1. Open **Power BI Desktop**
2. Click **Insert** → **Get more visuals** → **Import from file**
3. Select the `.pbiviz` file from the `dist/` folder
4. Accept the import prompt

### Add Data

1. **Category Data** - Drag a categorical field (e.g., Product Name, Region)
2. **Measure Data** - Drag a numeric measure (e.g., Sales Amount, Quantity)

### Configure Formatting

Open the **Format** pane to customize:

| Setting | Description | Type |
|---------|-------------|------|
| **Bar Color** | Color of the bars | Color picker |
| **Axis Color** | Color of axes and labels | Color picker |
| **Axis Font Size** | Size of axis labels | Number (px) |
| **Show Data Labels** | Toggle value labels on bars | Boolean |
| **Label Font Size** | Size of data labels | Number (px) |
| **Background Color** | Canvas background color | Color picker |

### Interactions

- **Click a bar** - Apply cross-filter to other visuals on the page
- **Click empty space** - Clear all selections
- **Hover over bars** - Visual feedback with opacity change

## 🏗️ Project Structure

```
vibevisual/
├── src/
│   ├── visual.ts          # Main visual implementation (IVisual interface)
│   └── settings.ts        # Formatting settings model
├── style/
│   └── visual.less        # Minimal styles
├── assets/
│   └── icon.png          # Visual icon (20x20 to 200x200 px)
├── .github/              # GitHub templates and workflows
├── examples/             # Sample data and usage examples
├── capabilities.json     # Visual capabilities and data roles
├── pbiviz.json          # Visual metadata and configuration
├── package.json         # npm dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── LICENSE              # MIT License
```

## 🛠️ Technical Stack

- **TypeScript 5.5.4** - Type-safe development
- **Power BI Visuals API 5.3.0** - Official Power BI SDK
- **D3.js 7.9.0** - Data transformation utilities
- **Power BI Utils** - Formatting model and utilities
- **ESLint** - Code quality and consistency

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting PRs.

### Quick Start for Contributors

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit with clear messages: `git commit -m 'Add amazing feature'`
5. Push to your fork: `git push origin feature/amazing-feature`
6. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Power BI Custom Visuals Tools](https://github.com/microsoft/PowerBI-visuals-tools)
- Powered by [D3.js](https://d3js.org/)
- Uses [Power BI Visuals Utilities](https://github.com/microsoft/powerbi-visuals-utils-formattingmodel)

## 📧 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/ravi-chandu/VIBE-Visual/issues)
- **Discussions**: [GitHub Discussions](https://github.com/ravi-chandu/VIBE-Visual/discussions)
- **Author**: Ravi Chandu

## 🗺️ Roadmap

Future enhancements being considered:

- [ ] Horizontal bar chart orientation option
- [ ] Gradient color fills for bars
- [ ] Conditional formatting based on thresholds
- [ ] Multiple measure support (grouped/stacked bars)
- [ ] Export to image functionality
- [ ] Tooltips with additional context
- [ ] Accessibility improvements (ARIA labels, keyboard navigation)
- [ ] Localization support for multiple languages

Feel free to suggest features through [GitHub Issues](https://github.com/ravi-chandu/VIBE-Visual/issues)!

---

**Made with ❤️ using AI vibe coding**
