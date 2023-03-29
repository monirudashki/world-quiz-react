import { createSlice } from "@reduxjs/toolkit";

const gameInitialState = {
    questions: [],
    currentQuestion: {},
    earnCoins: 0,
    gameFinish: false,
    correctAnswers: 0,
    questionNumber: 1,
    showFiftyFifty: false,
    showCallFriendJoker: false,
    showPublicJoker: false
};

export const gameSlice = createSlice({
    name: 'game',
    initialState: gameInitialState,
    reducers: {
        gameQuestions: (state, { payload }) => {
            state.questions = payload;
        },
        gameCurrentQuestion: (state, { payload }) => {
            state.currentQuestion = payload
        },
        gameEarnCoins: (state, { payload }) => {
            state.earnCoins = payload;
        },
        gameFinishToggle: (state, { payload }) => {
            state.gameFinish = payload;
        },
        gameAddCorrectAnswer: (state) => {
            state.correctAnswers = state.correctAnswers + 1
        },
        gameNextQuestion: (state) => {
            state.questionNumber = state.questionNumber + 1
        },
        gameShowFiftyFiftyToggle: (state, { payload }) => {
            state.showFiftyFifty = payload;
        },
        gameShowCallFriendJokerToggle: (state, { payload }) => {
            state.showCallFriendJoker = payload;
        },
        gameShowPublicJokerToggle: (state, { payload }) => {
            state.showPublicJoker = payload;
        },
        gameResetState: (state) => {
            Object.assign(state, gameInitialState)
        }
    }
});

export const {
    gameQuestions,
    gameCurrentQuestion,
    gameEarnCoins,
    gameFinishToggle,
    gameAddCorrectAnswer,
    gameNextQuestion,
    gameShowFiftyFiftyToggle,
    gameShowCallFriendJokerToggle,
    gameShowPublicJokerToggle,
    gameResetState
}
    = gameSlice.actions

export default gameInitialState;