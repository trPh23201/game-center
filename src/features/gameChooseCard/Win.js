import { createSlice } from '@reduxjs/toolkit'

export const Win = createSlice({
  name: 'Win',
  initialState: false,
  reducers: {
    setWin: ( state, action) =>{
      return action.payload;  
    }
  },
})


// Action creators are generated for each case reducer function
export const { setWin } = Win.actions

export default Win.reducer