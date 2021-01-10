export type FieldSelector<T> = {
    [P in keyof T]?: boolean
}

export function objectToFormData(object: any) {
    const formData = new FormData();

    Object.keys(object)
        .forEach((key) => {
            const value = object[key];

            if (Array.isArray(value)) {
                value.forEach((v) => formData.append(key, v));
            } else {
                formData.set(key, value);
            }
        });

    return formData;
}
