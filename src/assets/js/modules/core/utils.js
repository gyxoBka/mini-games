export function capitalize(string) {
    if(!string || typeof string !== 'string')
        return '';

    return string[0].toUpperCase() + string.slice(1);
}

export function getRand(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
}