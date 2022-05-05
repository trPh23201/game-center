import { createSlice } from '@reduxjs/toolkit'

export const Card2 = createSlice({
  name: 'Card2',
  initialState: null,
  reducers: {
    setCard2: ( state, action) =>{
      return action.payload;  
    },
    removeCard2: (state, action)=>{
        return null;
    }
  },
})


// Action creators are generated for each case reducer function
export const { setCard2, removeCard2 } = Card2.actions

export default Card2.reducer