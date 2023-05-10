/* eslint-disable prettier/prettier */
const {createSlice} = require('@reduxjs/toolkit');

const initialState = {
  token: null,
  id: null,
  image: '',
  role: null,
  phone: null,
  isloading: false,
  isRejected: false,
  isFulfilled: false,
  err: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authLogin: (prevState, action) => {
      console.log(action.payload);
      return {
        ...prevState,
        id: action.payload.dataUser.id,
        image: action.payload.dataUser.profile_picture,
        token: action.payload.token,
        role: action.payload.dataUser.role_id,
        phone: action.payload.dataUser.phone,
      };
    },
    authLogout: () => {
      return initialState;
    },
  },
});

export const userAction = {...userSlice.actions};
export default userSlice.reducer;
