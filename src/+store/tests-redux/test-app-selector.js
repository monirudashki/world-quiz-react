import { mockGameData } from '../../testUtils/mockGameData'

const store = {
    game: mockGameData
}

export const testUseAppSelector = (f) => f(store);