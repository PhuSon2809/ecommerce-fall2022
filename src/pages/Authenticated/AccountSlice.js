import accountApi from "~/api/acccountApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: StorageKeys } = require("~/constants/storage-keys");



export const login = createAsyncThunk(
    'account/login',
    async(payload) => {
        //call api login
        const data = await accountApi.login(payload);

        //save data to localStorage
        localStorage.setItem(StorageKeys.TOKEN, data.data.token)
        localStorage.setItem(StorageKeys.ACCOUNT, JSON.stringify(data.data))

        //return user data
        return data.user;
    }
)

const accountSlice = createSlice({
    name: 'account',
    initialState: {
        current: JSON.parse(localStorage.getItem((StorageKeys.ACCOUNT))) || null,
    },
    reducers: {
        logout(state){
            localStorage.removeItem(StorageKeys.ACCOUNT);
            localStorage.removeItem(StorageKeys.TOKEN);

            state.current = {}
        }
    },
    extraReducers: {
        // 'user/login/fulfilled': () => {},
        [login.fulfilled]: (state, action) => {
            state.current = action.payload;
        }
    }
})

const { actions, reducer } = accountSlice;

export const {logout} = actions;
export default reducer;