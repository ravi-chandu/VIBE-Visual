# Examples and Testing Data

This directory contains sample data and usage examples for testing Vibe Visual.

## 📊 Sample Data Files

### sample-data.csv

A basic dataset for testing the bar chart with various categories and values. Use this to:
- Test basic rendering
- Verify data labels
- Test cross-filtering
- Check hover effects

**Data Structure:**
- **Category**: Text field for X-axis categories
- **Value**: Numeric field for Y-axis values

## 🧪 How to Test with Sample Data

### Option 1: Using CSV in Power BI Desktop

1. Open Power BI Desktop
2. Click **Get Data** → **Text/CSV**
3. Select `sample-data.csv` from this directory
4. Load the data
5. Build the visual with the sample data:
   - **Category Data**: Drag the "Category" field
   - **Measure Data**: Drag the "Value" field

### Option 2: Enter Data Manually

1. In Power BI Desktop, click **Enter Data**
2. Create a table with these columns:
   - Category (Text)
   - Value (Number)
3. Copy data from the sample files
4. Use the created table in your visual

## 🎯 Test Scenarios

### Basic Functionality
- ✅ Visual renders with sample data
- ✅ Bars display proportionally to values
- ✅ Category labels appear on X-axis
- ✅ Value labels appear on Y-axis

### Formatting Options
- ✅ Change bar color → Verify bars update
- ✅ Change axis color → Verify axes and labels update
- ✅ Toggle data labels → Verify labels show/hide
- ✅ Adjust font size → Verify text size changes
- ✅ Change background color → Verify canvas background updates

### Interactions
- ✅ Click a bar → Other visuals filter
- ✅ Click empty space → Filters clear
- ✅ Hover over bars → Opacity changes

### Edge Cases
Test with these scenarios:
- **Empty data**: Remove all data → Should show "No data to display"
- **Single bar**: Use only one data point → Should render correctly
- **Many bars**: Use 50+ categories → Should handle gracefully
- **Large values**: Use values > 1,000,000 → Should format with commas
- **Zero values**: Include zero values → Should show zero-height bars
- **Negative values**: Include negatives → Should handle appropriately
- **Long labels**: Use very long category names → Should truncate with ellipsis
- **Special characters**: Use Unicode, emojis in categories → Should display

### Performance Testing
- Large dataset (100+ rows)
- Rapid resizing
- Quick formatting changes
- Multiple cross-filter selections

## 📸 Screenshots

Add your own screenshots here to document visual appearance:

```
examples/
├── screenshots/
│   ├── default-view.png
│   ├── custom-colors.png
│   ├── with-labels.png
│   ├── hover-state.png
│   └── cross-filter-demo.gif
```

## 💡 Usage Tips

### Creating Test Reports

1. **Basic Report**: Single visual with sample data
2. **Interactive Report**: Multiple visuals to test cross-filtering
3. **Formatted Report**: Showcase different color schemes

### Recommended Test Data Variations

- **Sales by Region**: Geographic categories with revenue values
- **Products by Quantity**: Product names with inventory counts
- **Monthly Trends**: Time periods (though line chart is better for this)
- **Category Comparison**: Any categorical comparison use case

## 🐛 Found an Issue?

If you find problems while testing:
1. Document the exact steps to reproduce
2. Note your Power BI Desktop version
3. Capture screenshots or screen recordings
4. [Open an issue](https://github.com/YOUR_GITHUB_USERNAME/vibevisual/issues/new?template=bug_report.md)

## 🤝 Contributing Examples

Have a great use case or example? We'd love to include it!

1. Create your example data file (CSV format)
2. Add screenshots showing the visual
3. Document the use case in this README
4. Submit a pull request

---

**Need help?** Check the [main README](../README.md) or [open an issue](https://github.com/YOUR_GITHUB_USERNAME/vibevisual/issues).
