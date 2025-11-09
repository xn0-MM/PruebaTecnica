export function cleanSpecialCharacters(string: string): string {
    return string.replace(/[-_'`]/g, '');
}