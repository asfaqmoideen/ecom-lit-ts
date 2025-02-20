export function convertToPascalCase(...words: string[]): string {
        return words
            .join("") 
            .split(/[-_\s]+/) 
            .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
            .join(" "); 
}