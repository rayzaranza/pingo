export interface FigmaColor {
  colorSpace: string;
  components: number[];
  alpha: number;
  hex: string;
}

export interface FigmaExtensions {
  "com.figma.variableId": string;
  "com.figma.scopes": string[];
  "com.figma.aliasData": {
    targetVariableId: string;
    targetVariableName: string;
    targetVariableSetId: string;
    targetVariableSetName: string;
  };
}

export interface FigmaTokenObject {
  $type: string;
  $value: string | number | FigmaColor;
  $description?: string;
  $extensions: FigmaExtensions;
  [key: string]:
    | string
    | number
    | FigmaTokenObject
    | FigmaColor
    | FigmaExtensions
    | undefined;
}
