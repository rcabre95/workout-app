export function lbsToKgs(weight: number): number {
    const kgs: number = weight * 0.453592;
    const roundedKgs: number = Math.round((kgs + Number.EPSILON) * 100) / 100;

    return roundedKgs
}

export function inchesToMeters(height: number): number {
    const meters: number = height * 0.0254;
    const roundedMeters: number = Math.round((meters + Number.EPSILON) * 100) / 100;

    return roundedMeters
}