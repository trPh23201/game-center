import { createSlice } from '@reduxjs/toolkit'

export const Live = createSlice({
  name: 'Live',
  initialState: null,
  reducers: {
    setLive: ( state, action) =>{
      return action.payload;  
    }
  },
})


// Action creators are generated for each case reducer function
export const { setLive } = Live.actions

export default Live.reducer