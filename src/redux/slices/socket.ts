import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { socket } from "base/utils/socket";

interface SocketData {
  isConnected: boolean
}

const initialState: SocketData = {
  isConnected: socket.connected
}

export const socketSlice = createSlice({
  name: 'socket',
  initialState: initialState,
  reducers: {
    updateIsConnected(state, action: PayloadAction<boolean>) {
      state.isConnected = action.payload
    }
  }
})

export const { updateIsConnected } = socketSlice.actions
