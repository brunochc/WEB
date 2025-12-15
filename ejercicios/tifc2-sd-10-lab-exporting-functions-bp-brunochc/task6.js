
export function rubricExcellent(score) {
    if (score >= 9) {
        return 'Excellent';
    }
    return score >= 5 ? 'Pass' : 'Fail';
}