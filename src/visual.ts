/**
 * Vibe Visual - Professional SVG Bar Chart for Power BI
 * 
 * A modern, open-source Power BI custom visual that renders interactive bar charts
 * using pure SVG. Features include customizable colors, smooth animations, hover effects,
 * cross-filtering support, and responsive design.
 * 
 * @module VibeVisual
 * @author Ravi Chandu
 * @license MIT
 */

import powerbi from "powerbi-visuals-api";

import IVisual = powerbi.extensibility.visual.IVisual;
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import ISelectionManager = powerbi.extensibility.ISelectionManager;
import ISelectionId = powerbi.extensibility.ISelectionId;
import DataView = powerbi.DataView;
import DataViewObjects = powerbi.DataViewObjects;
import DataViewCategorical = powerbi.DataViewCategorical;
import IVisualHost = powerbi.extensibility.visual.IVisualHost;
import FormattingModel = powerbi.visuals.FormattingModel;
import FormattingCard = powerbi.visuals.FormattingCard;
import FormattingGroup = powerbi.visuals.FormattingGroup;
import FormattingSlice = powerbi.visuals.FormattingSlice;

/**
 * Represents a single data point in the bar chart.
 * 
 * @interface BarChartDataPoint
 * @property {string} category - The category label (X-axis)
 * @property {number} value - The numeric value (Y-axis height)
 * @property {ISelectionId} selectionId - Power BI selection identifier for cross-filtering
 */
interface BarChartDataPoint {
    category: string;
    value: number;
    selectionId: ISelectionId;
}

/**
 * Visual formatting settings extracted from Power BI format pane.
 * 
 * @interface VisualSettings
 * @property {string} barColor - Fill color for bars (hex format)
 * @property {string} axisColor - Color for axes and labels (hex format)
 * @property {number} fontSize - Font size in pixels for axis and labels
 * @property {boolean} showDataLabels - Whether to display value labels on bars
 * @property {string} backgroundColor - Canvas background color (hex format)
 */
interface VisualSettings {
    barColor: string;
    axisColor: string;
    fontSize: number;
    showDataLabels: boolean;
    backgroundColor: string;
}

/**
 * Chart margins for proper spacing around the plot area.
 * 
 * @interface Margins
 * @property {number} top - Top margin in pixels (space for labels)
 * @property {number} right - Right margin in pixels
 * @property {number} bottom - Bottom margin in pixels (space for X-axis labels)
 * @property {number} left - Left margin in pixels (space for Y-axis labels)
 */
interface Margins {
    top: number;
    right: number;
    bottom: number;
    left: number;
}

/** SVG namespace for creating SVG elements */
const SVG_NS = "http://www.w3.org/2000/svg";

/**
 * Main visual class implementing the Power BI IVisual interface.
 * 
 * Renders an interactive SVG bar chart with customizable formatting,
 * animations, hover effects, and cross-filtering capabilities.
 * 
 * @export
 * @class Visual
 * @implements {IVisual}
 */
export class Visual implements IVisual {
    private readonly host: IVisualHost;
    private readonly selectionManager: ISelectionManager;

    private root: HTMLElement;
    private svg: SVGSVGElement;
    private backgroundRect: SVGRectElement;
    private axesGroup: SVGGElement;
    private barsGroup: SVGGElement;
    private labelsGroup: SVGGElement;
    private noDataText: SVGTextElement;

    private settings: VisualSettings = {
        barColor: "#01B8AA",
        axisColor: "#5F6B6D",
        fontSize: 12,
        showDataLabels: true,
        backgroundColor: "#FFFFFF"
    };

    // Chart margins: optimized for readability with various font sizes
    // Top: 24px for potential title space, Bottom: 48px for category labels
    // Left: 60px for Y-axis values, Right: 16px for visual padding
    private margins: Margins = { top: 24, right: 16, bottom: 48, left: 60 };
    private viewportWidth: number = 0;
    private viewportHeight: number = 0;
    private isFirstRender: boolean = true;
    private currentSelectionIds: ISelectionId[] = [];

    /**
     * Creates an instance of the Visual.
     * Initializes the SVG container, creates groups for different visual elements,
     * and sets up click handlers for selection clearing.
     * 
     * @param {VisualConstructorOptions} options - Power BI constructor options
     */
    constructor(options: VisualConstructorOptions) {
        this.host = options.host;
        this.selectionManager = this.host.createSelectionManager();

        this.root = options.element;
        this.svg = document.createElementNS(SVG_NS, "svg");
        this.svg.setAttribute("width", "0");
        this.svg.setAttribute("height", "0");
        this.svg.style.display = "block";

        this.backgroundRect = document.createElementNS(SVG_NS, "rect");
        this.backgroundRect.setAttribute("x", "0");
        this.backgroundRect.setAttribute("y", "0");
        this.backgroundRect.setAttribute("width", "0");
        this.backgroundRect.setAttribute("height", "0");
        this.svg.appendChild(this.backgroundRect);

        this.axesGroup = document.createElementNS(SVG_NS, "g");
        this.barsGroup = document.createElementNS(SVG_NS, "g");
        this.labelsGroup = document.createElementNS(SVG_NS, "g");
        this.noDataText = document.createElementNS(SVG_NS, "text");

        this.svg.appendChild(this.axesGroup);
        this.svg.appendChild(this.barsGroup);
        this.svg.appendChild(this.labelsGroup);
        this.svg.appendChild(this.noDataText);

        this.root.appendChild(this.svg);

        // Clear selection when clicking empty space
        this.svg.addEventListener("click", (ev) => {
            if (ev.target === this.svg || ev.target === this.backgroundRect) {
                this.selectionManager.clear();
                this.currentSelectionIds = [];
                this.applySelectionState();
            }
        });
    }

    /**
     * Updates the visual when data, size, or formatting changes.
     * Called by Power BI framework whenever a refresh is needed.
     * 
     * @param {VisualUpdateOptions} options - Update options containing data view and viewport
     * @public
     */
    public update(options: VisualUpdateOptions): void {
        const dataView = options.dataViews && options.dataViews[0];
        this.viewportWidth = Math.max(0, options.viewport.width);
        this.viewportHeight = Math.max(0, options.viewport.height);

        this.settings = this.parseSettings(dataView);

        this.resizeSvg();
        this.clearGroups();

        const data = this.extractData(dataView);
        if (!data.length || this.viewportWidth === 0 || this.viewportHeight === 0) {
            this.renderNoData();
            return;
        }

        const layout = this.getLayout();
        const maxValue = this.getMaxValue(data);
        const safeMax = maxValue > 0 ? maxValue : 1;

        this.renderAxes(data, layout, safeMax);
        this.renderBars(data, layout, safeMax);
        this.renderLabels(data, layout, safeMax);

        this.isFirstRender = false;
    }

    /**
     * Builds the formatting model for the Power BI format pane.
     * Defines all customizable properties organized into cards and groups.
     * 
     * @returns {FormattingModel} The formatting model with cards for bars, axis, labels, and background
     * @public
     */
    public getFormattingModel(): FormattingModel {
        const cards: FormattingCard[] = [];

        const barGroup: FormattingGroup = {
            displayName: "Bars",
            uid: "barsGroup",
            slices: [
                this.createColorSlice("Bar color", "dataPoint", "barColor", this.settings.barColor)
            ]
        };

        const axisGroup: FormattingGroup = {
            displayName: "Axis",
            uid: "axisGroup",
            slices: [
                this.createColorSlice("Axis color", "axis", "axisColor", this.settings.axisColor),
                this.createNumberSlice("Font size", "axis", "fontSize", this.settings.fontSize)
            ]
        };

        const labelsGroup: FormattingGroup = {
            displayName: "Labels",
            uid: "labelsGroup",
            slices: [
                this.createToggleSlice("Show value labels", "labels", "showValueLabels", this.settings.showDataLabels),
                this.createNumberSlice("Font size", "labels", "fontSize", this.settings.fontSize)
            ]
        };

        const backgroundGroup: FormattingGroup = {
            displayName: "Background",
            uid: "backgroundGroup",
            slices: [
                this.createColorSlice("Background color", "background", "backgroundColor", this.settings.backgroundColor)
            ]
        };

        cards.push({
            displayName: "Bars",
            uid: "barsCard",
            groups: [barGroup]
        });

        cards.push({
            displayName: "Axis",
            uid: "axisCard",
            groups: [axisGroup]
        });

        cards.push({
            displayName: "Labels",
            uid: "labelsCard",
            groups: [labelsGroup]
        });

        cards.push({
            displayName: "Background",
            uid: "backgroundCard",
            groups: [backgroundGroup]
        });

        return { cards };
    }

    // -----------------------------
    // Data extraction
    // -----------------------------
    
    /**
     * Extracts and transforms categorical data from Power BI DataView.
     * Safely handles null/undefined values and mismatched array lengths.
     * 
     * @param {DataView} [dataView] - Power BI data view
     * @returns {BarChartDataPoint[]} Array of processed data points
     * @private
     */
    private extractData(dataView?: DataView): BarChartDataPoint[] {
        if (!dataView || !dataView.categorical) {
            return [];
        }

        const categorical: DataViewCategorical = dataView.categorical;
        const categories = categorical.categories && categorical.categories[0];
        const values = categorical.values && categorical.values[0];

        if (!categories || !values || !categories.values || !values.values) {
            return [];
        }

        const length = Math.min(categories.values.length, values.values.length);
        if (length === 0) {
            return [];
        }

        const data: BarChartDataPoint[] = new Array(length);
        for (let i = 0; i < length; i++) {
            const category = categories.values[i];
            const value = values.values[i];

            data[i] = {
                category: category == null ? "" : String(category),
                value: value == null || isNaN(Number(value)) ? 0 : Number(value),
                selectionId: this.host
                    .createSelectionIdBuilder()
                    .withCategory(categories, i)
                    .createSelectionId()
            };
        }

        return data;
    }

    private getMaxValue(data: BarChartDataPoint[]): number {
        let max = 0;
        for (let i = 0; i < data.length; i++) {
            if (data[i].value > max) {
                max = data[i].value;
            }
        }
        return max;
    }

    // -----------------------------
    // Layout
    // -----------------------------
    private getLayout() {
        const width = this.viewportWidth;
        const height = this.viewportHeight;

        const plotWidth = Math.max(0, width - this.margins.left - this.margins.right);
        const plotHeight = Math.max(0, height - this.margins.top - this.margins.bottom);

        return {
            width,
            height,
            plotWidth,
            plotHeight,
            plotX: this.margins.left,
            plotY: this.margins.top
        };
    }

    // -----------------------------
    // Rendering
    // -----------------------------
    private resizeSvg(): void {
        this.svg.setAttribute("width", `${this.viewportWidth}`);
        this.svg.setAttribute("height", `${this.viewportHeight}`);

        this.backgroundRect.setAttribute("width", `${this.viewportWidth}`);
        this.backgroundRect.setAttribute("height", `${this.viewportHeight}`);
        this.backgroundRect.setAttribute("fill", this.settings.backgroundColor);

        // Place groups with margins
        const transform = `translate(${this.margins.left}, ${this.margins.top})`;
        this.axesGroup.setAttribute("transform", transform);
        this.barsGroup.setAttribute("transform", transform);
        this.labelsGroup.setAttribute("transform", transform);
    }

    private clearGroups(): void {
        this.clearChildren(this.axesGroup);
        this.clearChildren(this.barsGroup);
        this.clearChildren(this.labelsGroup);
        this.noDataText.textContent = "";
    }

    private renderNoData(): void {
        this.noDataText.setAttribute("x", `${this.viewportWidth / 2}`);
        this.noDataText.setAttribute("y", `${this.viewportHeight / 2}`);
        this.noDataText.setAttribute("text-anchor", "middle");
        this.noDataText.setAttribute("fill", this.settings.axisColor);
        this.noDataText.setAttribute("font-size", `${this.settings.fontSize}`);
        this.noDataText.textContent = "No data to display";
    }

    private renderAxes(data: BarChartDataPoint[], layout: ReturnType<typeof this.getLayout>, maxValue: number): void {
        const { plotWidth, plotHeight } = layout;
        const axisColor = this.settings.axisColor;
        const fontSize = this.settings.fontSize;

        // Y axis line
        const yAxis = document.createElementNS(SVG_NS, "line");
        yAxis.setAttribute("x1", "0");
        yAxis.setAttribute("y1", "0");
        yAxis.setAttribute("x2", "0");
        yAxis.setAttribute("y2", `${plotHeight}`);
        yAxis.setAttribute("stroke", axisColor);
        yAxis.setAttribute("stroke-width", "1");
        this.axesGroup.appendChild(yAxis);

        // X axis line
        const xAxis = document.createElementNS(SVG_NS, "line");
        xAxis.setAttribute("x1", "0");
        xAxis.setAttribute("y1", `${plotHeight}`);
        xAxis.setAttribute("x2", `${plotWidth}`);
        xAxis.setAttribute("y2", `${plotHeight}`);
        xAxis.setAttribute("stroke", axisColor);
        xAxis.setAttribute("stroke-width", "1");
        this.axesGroup.appendChild(xAxis);

        // Y ticks and labels
        const tickCount = 5;
        for (let i = 0; i <= tickCount; i++) {
            const t = i / tickCount;
            const value = maxValue * (1 - t);
            const y = plotHeight * t;

            const tick = document.createElementNS(SVG_NS, "line");
            tick.setAttribute("x1", "-4");
            tick.setAttribute("y1", `${y}`);
            tick.setAttribute("x2", "0");
            tick.setAttribute("y2", `${y}`);
            tick.setAttribute("stroke", axisColor);
            tick.setAttribute("stroke-width", "1");
            this.axesGroup.appendChild(tick);

            const label = document.createElementNS(SVG_NS, "text");
            label.setAttribute("x", "-8");
            label.setAttribute("y", `${y + fontSize / 2.8}`); // Vertical centering adjustment (2.8 ≈ font baseline offset)
            label.setAttribute("text-anchor", "end");
            label.setAttribute("fill", axisColor);
            label.setAttribute("font-size", `${fontSize}`);
            label.textContent = this.formatNumber(value);
            this.axesGroup.appendChild(label);
        }

        // X labels (categories)
        const count = data.length;
        const band = count > 0 ? plotWidth / count : plotWidth;
        const labelStep = this.getLabelStep(band);

        for (let i = 0; i < count; i += labelStep) {
            const x = band * i + band / 2;
            const label = document.createElementNS(SVG_NS, "text");
            label.setAttribute("x", `${x}`);
            label.setAttribute("y", `${plotHeight + fontSize + 8}`);
            label.setAttribute("text-anchor", "middle");
            label.setAttribute("fill", axisColor);
            label.setAttribute("font-size", `${fontSize}`);
            label.textContent = this.truncateText(data[i].category, band, fontSize);
            this.axesGroup.appendChild(label);
        }
    }

    private renderBars(data: BarChartDataPoint[], layout: ReturnType<typeof this.getLayout>, maxValue: number): void {
        const { plotWidth, plotHeight } = layout;
        const count = data.length;

        const barColor = this.settings.barColor;
        const band = count > 0 ? plotWidth / count : plotWidth;
        const barPadding = Math.max(1, band * 0.2); // Bar spacing: 20% of bandwidth creates visual separation
        const barWidth = Math.max(1, band - barPadding);

        for (let i = 0; i < count; i++) {
            const dp = data[i];
            const barHeight = (dp.value / maxValue) * plotHeight;
            const x = band * i + barPadding / 2;
            const y = plotHeight - barHeight;

            const rect = document.createElementNS(SVG_NS, "rect");
            rect.setAttribute("x", `${x}`);
            rect.setAttribute("y", `${y}`);
            rect.setAttribute("width", `${barWidth}`);
            rect.setAttribute("height", `${barHeight}`);
            rect.setAttribute("fill", barColor);
            rect.setAttribute("opacity", "1");
            rect.style.transition = "opacity 120ms ease, height 400ms ease, y 400ms ease";

            rect.addEventListener("mouseover", () => rect.setAttribute("opacity", "0.7")); // Hover effect: 70% opacity for visual feedback
            rect.addEventListener("mouseout", () => rect.setAttribute("opacity", "1"));

            rect.addEventListener("click", (ev) => {
                ev.stopPropagation();
                this.selectionManager.select(dp.selectionId).then((ids) => {
                    this.currentSelectionIds = ids || [];
                    this.applySelectionState();
                });
            });

            this.barsGroup.appendChild(rect);

            // Initial animation
            if (this.isFirstRender) {
                rect.setAttribute("y", `${plotHeight}`);
                rect.setAttribute("height", "0");
                requestAnimationFrame(() => {
                    rect.setAttribute("y", `${y}`);
                    rect.setAttribute("height", `${barHeight}`);
                });
            }
        }

        // Apply selection state after bars are created
        this.applySelectionState();
    }

    private renderLabels(data: BarChartDataPoint[], layout: ReturnType<typeof this.getLayout>, maxValue: number): void {
        if (!this.settings.showDataLabels) {
            return;
        }

        const { plotWidth, plotHeight } = layout;
        const count = data.length;
        const band = count > 0 ? plotWidth / count : plotWidth;
        const fontSize = this.settings.fontSize;

        for (let i = 0; i < count; i++) {
            const dp = data[i];
            const barHeight = (dp.value / maxValue) * plotHeight;
            const x = band * i + band / 2;
            const y = plotHeight - barHeight - 6;

            const label = document.createElementNS(SVG_NS, "text");
            label.setAttribute("x", `${x}`);
            label.setAttribute("y", `${Math.max(0, y)}`);
            label.setAttribute("text-anchor", "middle");
            label.setAttribute("fill", this.settings.axisColor);
            label.setAttribute("font-size", `${fontSize}`);
            label.textContent = this.formatNumber(dp.value);
            this.labelsGroup.appendChild(label);
        }
    }

    private applySelectionState(): void {
        const selectedIds = this.currentSelectionIds;
        const hasSelection = selectedIds && selectedIds.length > 0;

        const children = this.barsGroup.children;
        for (let i = 0; i < children.length; i++) {
            const rect = children[i] as SVGRectElement;
            if (!hasSelection) {
                rect.setAttribute("opacity", "1");
                continue;
            }

            const dp = i < selectedIds.length ? selectedIds[i] : null;
            // Use selectionManager.isSelected if available
            const isSelected = (this.selectionManager as any).isSelected
                ? (this.selectionManager as any).isSelected(selectedIds[i])
                : false;

            rect.setAttribute("opacity", isSelected ? "1" : "0.3");
        }
    }

    // -----------------------------
    // Helpers
    // -----------------------------
    private clearChildren(node: Element): void {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }

    private parseSettings(dataView?: DataView): VisualSettings {
        const objects = dataView?.metadata?.objects;
        return {
            barColor: this.getValue(objects, "dataPoint", "barColor", this.settings.barColor),
            axisColor: this.getValue(objects, "axis", "axisColor", this.settings.axisColor),
            fontSize: this.getValue(objects, "axis", "fontSize", this.settings.fontSize),
            showDataLabels: this.getValue(objects, "labels", "showValueLabels", this.settings.showDataLabels),
            backgroundColor: this.getValue(objects, "background", "backgroundColor", this.settings.backgroundColor)
        };
    }

    private getValue<T>(objects: DataViewObjects | undefined, objectName: string, propertyName: string, defaultValue: T): T {
        if (!objects || !objects[objectName]) {
            return defaultValue;
        }
        const object = objects[objectName] as any;
        const value = object[propertyName];
        return value !== undefined && value !== null ? (value as T) : defaultValue;
    }

    /**
     * Formats a numeric value with locale-specific thousands separators.
     * 
     * @param {number} value - The numeric value to format
     * @returns {string} Formatted number string (e.g., "1,234.56")
     * @private
     */
    private formatNumber(value: number): string {
        if (value === null || value === undefined || isNaN(value)) {
            return "0";
        }
        return value.toLocaleString();
    }

    /**
     * Truncates long text labels to fit within available space.
     * Adds ellipsis (…) when text is shortened.
     * 
     * @param {string} text - The text to truncate
     * @param {number} maxWidth - Maximum width in pixels
     * @param {number} fontSize - Font size for width estimation
     * @returns {string} Truncated text with ellipsis if needed
     * @private
     */
    private truncateText(text: string, maxWidth: number, fontSize: number): string {
        if (!text) {
            return "";
        }
        const approxCharWidth = fontSize * 0.6; // Average character width ratio
        const maxChars = Math.max(1, Math.floor(maxWidth / approxCharWidth));
        if (text.length <= maxChars) {
            return text;
        }
        return `${text.substring(0, Math.max(1, maxChars - 1))}…`;
    }

    private getLabelStep(bandwidth: number): number {
        const minLabelWidth = 40; // Avoid magic numbers: minimal readable label width
        return Math.max(1, Math.ceil(minLabelWidth / Math.max(1, bandwidth)));
    }

    private createColorSlice(displayName: string, objectName: string, propertyName: string, value: string): FormattingSlice {
        return {
            displayName,
            uid: `${objectName}.${propertyName}`,
            control: {
                type: "ColorPicker",
                properties: {
                    descriptor: {
                        objectName,
                        propertyName
                    },
                    value: { value }
                }
            } as any
        };
    }

    private createNumberSlice(displayName: string, objectName: string, propertyName: string, value: number): FormattingSlice {
        return {
            displayName,
            uid: `${objectName}.${propertyName}`,
            control: {
                type: "NumUpDown",
                properties: {
                    descriptor: {
                        objectName,
                        propertyName
                    },
                    value
                }
            } as any
        };
    }

    private createToggleSlice(displayName: string, objectName: string, propertyName: string, value: boolean): FormattingSlice {
        return {
            displayName,
            uid: `${objectName}.${propertyName}`,
            control: {
                type: "ToggleSwitch",
                properties: {
                    descriptor: {
                        objectName,
                        propertyName
                    },
                    value
                }
            } as any
        };
    }
}