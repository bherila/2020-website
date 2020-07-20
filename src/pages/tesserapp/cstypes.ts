import {Argument, IEntity} from "./schema";

const csTypes: Record<string, string> = {
    text: 'string',
    int: 'int?',
    string: "string",
    uuid: "Guid?",
    number: "int?",
    decimal: "decimal?",
    bool: "bool?",
    boolean: "bool?",
    timestamp: "DateTime?"
};

export function gCsType(model: IEntity, mp: Argument) {
    let typ = csTypes[mp.type] || 'Object';
    if (!!mp.required && typ.endsWith('?')) {
        typ = typ.substr(0, typ.length - 1);
    }
    if ('collection' in mp) {
        switch (mp.collection) {
            case "list":
                typ = `ImmutableList<${typ}>`;
                break;
            case "set":
                typ = `ImmutableHashSet<${typ}>`;
                break;
            default:
                throw `Collection type ${mp.collection} is not supported.`;
        }
    }
    return typ;
}
