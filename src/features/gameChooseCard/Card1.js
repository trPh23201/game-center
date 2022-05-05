import { createSlice } from '@reduxjs/toolkit'

export const Card1 = createSlice({
  name: 'Card1',
  initialState: null,
  reducers: {
    setCard1: ( state, action) =>{
      return action.payload;  
    },
    removeCard1: (state, action)=>{
        return null;
    }
  },
})


// Action creators are generated for each case reducer function
export const { setCard1, removeCard1 } = Card1.actions

export default Card1.reducer