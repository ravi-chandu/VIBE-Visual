/**
 * Vibe Visual - Formatting Settings Model
 * 
 * Defines the formatting settings structure for the Power BI format pane.
 * Organizes settings into cards for data points, labels, axis, and background.
 *
 * Copyright (c) 2026 Ravi Chandu
 * Licensed under the MIT License
 * 
 * Original template structure based on Power BI Visuals Tools
 * Copyright (c) Microsoft Corporation
 * MIT License
 */

"use strict";

import { formattingSettings } from "powerbi-visuals-utils-formattingmodel";

import FormattingSettingsCard = formattingSettings.SimpleCard;
import FormattingSettingsSlice = formattingSettings.Slice;
import FormattingSettingsModel = formattingSettings.Model;

/**
 * Data Point Formatting Card
 */
class DataPointCardSettings extends FormattingSettingsCard {
    barColor = new formattingSettings.ColorPicker({
        name: "barColor",
        displayName: "Bar color",
        value: { value: "" }
    });

    name: string = "dataPoint";
    displayName: string = "Data colors";
    slices: Array<FormattingSettingsSlice> = [this.barColor];
}

/**
 * Labels Formatting Card
 */
class LabelsCardSettings extends FormattingSettingsCard {
    showValueLabels = new formattingSettings.ToggleSwitch({
        name: "showValueLabels",
        displayName: "Show value labels",
        value: true
    });

    fontSize = new formattingSettings.NumUpDown({
        name: "fontSize",
        displayName: "Font size",
        value: 11
    });

    name: string = "labels";
    displayName: string = "Labels";
    slices: Array<FormattingSettingsSlice> = [
        this.showValueLabels,
        this.fontSize
    ];
}

/**
 * Axis Formatting Card
 */
class AxisCardSettings extends FormattingSettingsCard {
    showXAxis = new formattingSettings.ToggleSwitch({
        name: "showXAxis",
        displayName: "Show X axis",
        value: true
    });

    showYAxis = new formattingSettings.ToggleSwitch({
        name: "showYAxis",
        displayName: "Show Y axis",
        value: true
    });

    showGridlines = new formattingSettings.ToggleSwitch({
        name: "showGridlines",
        displayName: "Show gridlines",
        value: true
    });

    axisColor = new formattingSettings.ColorPicker({
        name: "axisColor",
        displayName: "Axis color",
        value: { value: "" }
    });

    fontSize = new formattingSettings.NumUpDown({
        name: "fontSize",
        displayName: "Axis font size",
        value: 10
    });

    name: string = "axis";
    displayName: string = "Axis";
    slices: Array<FormattingSettingsSlice> = [
        this.showXAxis,
        this.showYAxis,
        this.showGridlines,
        this.axisColor,
        this.fontSize
    ];
}

/**
 * Background Formatting Card
 */
class BackgroundCardSettings extends FormattingSettingsCard {
    backgroundColor = new formattingSettings.ColorPicker({
        name: "backgroundColor",
        displayName: "Background color",
        value: { value: "" }
    });

    name: string = "background";
    displayName: string = "Background";
    slices: Array<FormattingSettingsSlice> = [this.backgroundColor];
}

/**
* visual settings model class
*
*/
export class VisualFormattingSettingsModel extends FormattingSettingsModel {
    // Create formatting settings model formatting cards
    dataPointCard = new DataPointCardSettings();
    labelsCard = new LabelsCardSettings();
    axisCard = new AxisCardSettings();
    backgroundCard = new BackgroundCardSettings();

    cards = [this.dataPointCard, this.labelsCard, this.axisCard, this.backgroundCard];
}
