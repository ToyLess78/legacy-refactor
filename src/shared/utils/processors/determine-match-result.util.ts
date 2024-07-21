export const determineMatchResult = (score: string): string => {
    const [w1, w2] = score.split(':').map(Number);

    if (w1 === w2) {
        return 'x';
    }
    return w1 > w2 ? 'w1' : 'w2';
};