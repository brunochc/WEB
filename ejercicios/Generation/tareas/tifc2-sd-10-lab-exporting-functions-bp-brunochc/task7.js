export function rubricPerfect(score) {
    if (score === 11) {
        return 'Perfect';
    }
    if (score >= 9) {
        return 'Excellent';
    }
    return score >= 5 ? 'Pass' : 'Fail';
}