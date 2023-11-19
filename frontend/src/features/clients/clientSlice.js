import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
    clients: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const clientSlice = createSlice({
    name: "client",
    initialState,
    reducers: {
        reset: (state) => initialState
    }
})

export const { reset } = clientSlice.actions
export default clientSlice.reducer