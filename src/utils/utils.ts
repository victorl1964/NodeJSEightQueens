export function isAnInteger(input) {
    return !isNaN(input) && (input % 1 === 0);
}
