# Changelog

All notable changes to Vibe Visual will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-02-16

### Added

#### Core Features
- **SVG Bar Chart Rendering** - Pure SVG implementation for crisp, scalable graphics
- **Interactive Data Visualization** - Display categorical data with numeric values
- **Responsive Design** - Automatically adapts to viewport size changes
- **Professional Layout** - Proper margins and spacing for readability

#### Formatting Options
- **Bar Color Customization** - Color picker for bar fill color
- **Axis Color Customization** - Color picker for axes and labels
- **Font Size Control** - Adjustable font size for axis labels and data labels
- **Data Labels Toggle** - Show/hide value labels on bars
- **Background Color** - Customizable canvas background color

#### Visual Enhancements
- **Smooth Animations** - Initial render animation for bars (height transition)
- **Hover Effects** - Opacity change on mouseover for visual feedback
- **Smart Label Truncation** - Long category labels truncated with ellipsis
- **Formatted Numbers** - Locale-aware number formatting with thousand separators

#### Interactions
- **Cross-Filtering Support** - Click bars to filter other visuals on the page
- **Selection Clearing** - Click empty space to clear all selections
- **Selection State Visualization** - Dimmed opacity for unselected bars

#### Data Handling
- **Safe Data Extraction** - Robust handling of null/undefined values
- **Empty State** - "No data to display" message when no data is available
- **Division-by-Zero Protection** - Guards against mathematical errors
- **Large Dataset Support** - Efficient rendering with minimal DOM manipulation

#### Axes & Labels
- **X-Axis** - Horizontal axis with category labels
- **Y-Axis** - Vertical axis with value scale and tick marks
- **Axis Labels** - Clear labeling with proper alignment
- **Smart Label Stepping** - Skip labels when overcrowded to maintain readability

#### Developer Experience
- **TypeScript** - Fully typed codebase for better tooling and safety
- **JSDoc Documentation** - Comprehensive inline documentation
- **ESLint Integration** - Code quality and consistency checks
- **Power BI API 5.3.0** - Built on stable Power BI Visuals API

#### Open Source Preparation
- **MIT License** - Permissive open source license
- **Comprehensive README** - Installation, usage, and development guide
- **Contributing Guidelines** - Clear process for community contributions
- **Code of Conduct** - Contributor Covenant for healthy community
- **GitHub Templates** - Issue and PR templates for structured collaboration
- **CI/CD Workflows** - Automated testing and release pipelines

### Technical Details
- Power BI Visuals API v5.3.0
- TypeScript 5.5.4
- D3.js 7.9.0 (utility functions)
- Power BI Visuals Utils (formatting model and utilities)

### Known Limitations
- Single measure support only (no grouped/stacked bars yet)
- Vertical orientation only (no horizontal bars)
- No tooltips (planned for future release)
- No conditional formatting (planned for future release)

---

## [Unreleased]

### Planned Features
- Horizontal bar chart orientation
- Gradient color fills
- Conditional formatting based on thresholds
- Multiple measure support (grouped/stacked bars)
- Tooltips with additional context
- Export to image functionality
- Accessibility improvements (ARIA labels, keyboard navigation)
- Localization support for multiple languages

---

## Version History Summary

- **v1.0.0** (2026-02-16) - Initial public release with core bar chart features

---

**Note**: This is the first public release of Vibe Visual. Future updates will be documented here following semantic versioning principles.
