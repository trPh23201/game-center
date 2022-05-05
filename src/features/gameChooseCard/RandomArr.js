import { createSlice } from '@reduxjs/toolkit'

export const RandomArr = createSlice({
  name: 'RandomArr',
  initialState: [],
  reducers: {
    setRandomArr: ( state, action) =>{
      return action.payload;  
    }
  },
})


// Action creators are generated for each case reducer function
export const { setRandomArr } = RandomArr.actions

export default RandomArr.reducer