import {DataType} from "./schema";

export function required(type: string) {
    return {
        type: type,
        required: true
    };
}

export function optional(type: string) {
    return {
        type: type,
        required: false
    };
}

export function getParamsWithUuid(type: DataType) {
    return {
        id: required(type)
    };
}
