export const hueToColor = (hue: number, saturation = 100, lightness = 95) => `hsl(${360 * hue}, ${saturation}%, ${lightness}%)`
