import { createSlice } from '@reduxjs/toolkit'

export const Time = createSlice({
  name: 'Time',
  initialState: null,
  reducers: {
    setTime: ( state, action) =>{
      return action.payload;  
    }
  },
})


// Action creators are generated for each case reducer function
export const { setTime } = Time.actions

export default Time.reducer