export const userLevel = (correctAnswers) => {
    let level;

    if (correctAnswers >= 25) {
        level = Math.floor(correctAnswers / 25);
    } else {
        level = 1;
    }

    return level;
}