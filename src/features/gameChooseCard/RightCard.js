import { createSlice } from '@reduxjs/toolkit'

export const RightCard = createSlice({
    name: 'RightCard',
    initialState: [],
    reducers: {
        addRightCard: (state, action) => {
            state.push(action.payload);
        },
        removeRightCard: (state, action) => {
            state.length = 0;
        }
    },
})


// Action creators are generated for each case reducer function
export const { addRightCard, removeRightCard } = RightCard.actions

export default RightCard.reducer