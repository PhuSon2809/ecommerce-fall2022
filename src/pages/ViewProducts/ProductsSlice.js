
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

// export const login = createAsyncThunk(
//     'account/login',
//     async(payload) => {
//         //call api login
//         const data = await accountApi.login(payload);

//         //save data to localStorage
//         localStorage.setItem(StorageKeys.TOKEN, data.data.token)
//         localStorage.setItem(StorageKeys.ACCOUNT, JSON.stringify(data.data))

//         //return user data
//         return data.user;
//     }
// )

export const getListProducts = createAsyncThunk(
    'products/getList',
    // async(payload) => {
    //     const data = await
    // }
)

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
    },
    reducers: {
    },
    extraReducers: {
        [getListProducts.fulfilled]: (state, action) => {
            state.current = action.payload;
        }
    }
})

const { actions, reducer } = productsSlice;

// export const {logout} = actions;
export default reducer;