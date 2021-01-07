export type FieldSelector<T> = {
    [P in keyof T]?: boolean
}
