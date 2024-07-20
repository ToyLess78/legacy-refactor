export const toSnakeCase = (obj: any): any => {
    if (Array.isArray(obj)) {
        return obj.map(v => toSnakeCase(v));
    } else if (obj !== null && obj.constructor === Object) {
        return Object.keys(obj).reduce((result: any, key: string) => {
            const newKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
            result[newKey] = toSnakeCase(obj[key]);
            return result;
        }, {});
    }
    return obj;
};

export const toCamelCase = (obj: any): any => {
    if (Array.isArray(obj)) {
        return obj.map(v => toCamelCase(v));
    } else if (obj !== null && obj.constructor === Object) {
        return Object.keys(obj).reduce((result: any, key: string) => {
            const newKey = key.replace(/(_\w)/g, matches => matches[1].toUpperCase());
            result[newKey] = toCamelCase(obj[key]);
            return result;
        }, {});
    }
    return obj;
};
