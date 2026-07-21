export enum WidgetUserDataType {
    String = 1,
    Number = 2,
    Media = 3
}

export interface StringObject {
    type: WidgetUserDataType.String;
    name: string;
    value: string;
}

export interface NumberObject {
    type: WidgetUserDataType.Number;
    name: string;
    value: number;
}

export interface MediaObject {
    type: WidgetUserDataType.Media;
    name: string;
    value: { url: string; };
}

export type DynamicData = 
    | StringObject
    | NumberObject
    | MediaObject
;

export interface Data {
    data: { dynamic: DynamicData[]; };
}