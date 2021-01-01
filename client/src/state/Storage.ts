export function saveOrUpdate(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
} 

export function getByKey(key: string) {
    return JSON.parse(localStorage.getItem(key) || '');
}
