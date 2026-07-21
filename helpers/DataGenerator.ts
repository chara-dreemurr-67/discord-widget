import { type Data, type DynamicData, type MediaObject, type NumberObject, type StringObject, WidgetUserDataType } from "../types/Widget.json.js";
import fs from "fs";

class DynamicStringBuilder {
    private Name: string = "";
    private Value: string = "";

    public SetName(Name: string): this {
        this.Name = Name;
        return this;
    }

    public SetValue(Value: string): this {
        this.Value = Value;
        return this;
    }

    public ToObject(): StringObject {
        return {
            type: WidgetUserDataType.String,
            name: this.Name,
            value: this.Value
        }
    }
}

class DynamicNumberBuilder {
    private Name: string = "";
    private Value: number = 0;

    public SetName(Name: string): this {
        this.Name = Name;
        return this;
    }

    public SetValue(Value: number): this {
        this.Value = Value;
        return this;
    }

    public ToObject(): NumberObject {
        return {
            type: WidgetUserDataType.Number,
            name: this.Name,
            value: this.Value
        }
    }
}

class DynamicMediaBuilder {
    private Name: string = "";
    private Value: { url: string } = { url: "" };

    public SetName(Name: string): this {
        this.Name = Name;
        return this;
    }

    public SetUrl(Value: string): this {
        this.Value.url = Value;
        return this;
    }

    public ToObject(): MediaObject {
        return {
            type: WidgetUserDataType.Media,
            name: this.Name,
            value: this.Value
        }
    }
}

class DataGenerator {
    private readonly Data: DynamicData[] = [];
    
    private AddData(...Data: DynamicData[]): void {
        this.Data.push(...Data);
    }

    public AddString(F: (Builder: DynamicStringBuilder) => any): this {
        const Builder: DynamicStringBuilder = new DynamicStringBuilder();
        F(Builder);
        this.AddData(Builder.ToObject());
        return this;
    }

    public AddNumber(F: (Builder: DynamicNumberBuilder) => any): this {
        const Builder: DynamicNumberBuilder = new DynamicNumberBuilder();
        F(Builder);
        this.AddData(Builder.ToObject());
        return this;
    }

    public AddMedia(F: (Builder: DynamicMediaBuilder) => any): this {
        const Builder: DynamicMediaBuilder = new DynamicMediaBuilder();
        F(Builder);
        this.AddData(Builder.ToObject());
        return this;
    }

    public GetJSON(): string {
        fs.writeFileSync("test6.json", JSON.stringify({ data: { dynamic: this.Data } }), { encoding: "utf-8" });
        return JSON.stringify({ data: { dynamic: this.Data } });
    }

    public GetObject(): Data {
        return { data: { dynamic: this.Data } };
    }
}

export default DataGenerator;