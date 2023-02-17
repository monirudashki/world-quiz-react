export function coinsForGame(answers) {
    if (answers < 10) {
        return 0;
    } else if (answers <= 15) {
        return 2000;
    } else if (answers <= 20) {
        return 3500;
    } else if (answers <= 25) {
        return 5000;
    }
}