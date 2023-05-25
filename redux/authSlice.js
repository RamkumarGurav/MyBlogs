/* eslint-disable */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { HYDRATE } from "next-redux-wrapper";
//--------------------------------------------------------

//--------------------------------------------------------
// export const registerUser = createAsyncThunk(
//   "auth/registerUser",
//   async ({ formValue, navigate }, { rejectWithValue }) => {
//     try {
//       const response = await api.registerUser(formValue);
//       // toast.success("Registed Successfully");
//       console.log("Registed Successfully");
//       navigate("/");
//       return response.data;
//     } catch (error) {
//       // toast.error(error.response.data.message);
//       console.error(error.response.data.message);

//       return rejectWithValue(error.response.data);
//     }
//   }
// );
// //--------------------------------------------------------

// //--------------------------------------------------------
// export const login = createAsyncThunk(
//   "auth/login",
//   async ({ formValue, navigate, toast }, { rejectWithValue }) => {
//     try {
//       const response = await api.login(formValue);
//       console.log("Login Successfully");
//       navigate("/");
//       return response.data;
//     } catch (error) {
//       // toast.error(error.response.data.message);
//       console.error(error.response.data.message);
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
// // //--------------------------------------------------------

// // //--------------------------------------------------------
// export const logout = createAsyncThunk(
//   "auth/logout",
//   async ({ router, toast }, { rejectWithValue }) => {
//     try {
//       const response = await api.logout();
//       toast.success("Successfully logged out");
//       router.push("/");
//       return response.data;
//     } catch (error) {
//       toast.err(error.response.data.message);
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
// //--------------------------------------------------------

// //--------------------------------------------------------
// export const getUser = createAsyncThunk(
//   "auth/getUser",
//   async ({ toast }, { rejectWithValue }) => {
//     try {
//       const response = await api.getUser();
//       return response.data;
//     } catch (error) {
//       toast.error(error.response.data.message);
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
// //--------------------------------------------------------

// //--------------------------------------------------------
// export const updateProfile = createAsyncThunk(
//   "auth/updateProfile",
//   async ({ formValue, toast, navigate }, { rejectWithValue }) => {
//     try {
//       const response = await api.updateProfile(formValue);
//       toast.success("Profile updated successfully");
//       navigate("/me/update");
//       return response.data;
//     } catch (error) {
//       toast.error(error.response.data.message);
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
// //--------------------------------------------------------

// //--------------------------------------------------------
// export const updateMyPassword = createAsyncThunk(
//   "auth/updateMyPassword",
//   async ({ formValue, toast, navigate }, { rejectWithValue }) => {
//     try {
//       const response = await api.updateMyPassword(formValue);
//       toast.success("Password Updated Successfully");
//       // navigate('/')
//       return response.data;
//     } catch (error) {
//       toast.error(error.response.data.message);
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
// //--------------------------------------------------------

// //--------------------------------------------------------
// export const forgotPassword = createAsyncThunk(
//   "auth/forgotPassword",
//   async ({ formValue, toast, navigate }, { rejectWithValue }) => {
//     try {
//       const response = await api.forgotPassword(formValue);
//       toast.success("Reset Password Link sent to Your Email Successfully");
//       // navigate('/')
//       return response.data;
//     } catch (error) {
//       toast.error(error.response.data.message);
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
// //--------------------------------------------------------

// //--------------------------------------------------------
// export const resetPassword = createAsyncThunk(
//   "auth/resetPassword",
//   async ({ formValue, token, toast, navigate }, { rejectWithValue }) => {
//     try {
//       const response = await api.resetPassword(formValue, token);
//       toast.success("Password Changed Successfully");
//       navigate("/");
//       return response.data;
//     } catch (error) {
//       toast.error(error.response.data.message);
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user:
      typeof window !== "undefined"
        ? localStorage.getItem("profile")
          ? JSON.parse(localStorage.getItem("profile"))
          : null
        : null,
    error: "",
    loading: false,
    btnLoading: false,
    isAuthenticated: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; //persist user data
      if (action.payload) {
        state.isAuthenticated = true;
      }
      localStorage.setItem("profile", JSON.stringify({ ...action.payload })); //storing user's data that is given by
    },
    setLogout: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.clear();
      Cookies.remove("loggedIn");
    },
    setAuthTrue: (state, action) => {
      state.isAuthenticated = true;
    },
    setAuthFalse: (state, action) => {
      state.isAuthenticated = false;
    },

    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload.auth,
        };
      },
    },
  },

  // extraReducers: (builder) => {
  //   builder
  //     .addCase(registerUser.pending, (state, action) => {
  //       state.loading = true;
  //       state.btnLoading = true;
  //     })
  //     .addCase(registerUser.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.btnLoading = false;
  //       state.isAuthenticated = true;
  //       state.user = action.payload; //here 'action.payload' equals to data that is returned from the api call
  //       localStorage.setItem("profile", JSON.stringify({ ...action.payload })); //storing user's data that is given by
  //     })
  //     .addCase(registerUser.rejected, (state, action) => {
  //       state.loading = false;
  //       state.btnLoading = false;
  //       state.error = action.payload.message; //storing error message of error that is send by api to axios call insider 'error' state
  //     });
  //   builder
  //     .addCase(login.pending, (state, action) => {
  //       state.loading = true;
  //       state.btnLoading = true;
  //     })
  //     .addCase(login.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.btnLoading = false;
  //       state.isAuthenticated = true;
  //       state.user = action.payload; //here 'action.payload' equals to data that is returned from the api call
  //       localStorage.setItem("profile", JSON.stringify({ ...action.payload })); //storing user's data that is given by
  //     })
  //     .addCase(login.rejected, (state, action) => {
  //       state.loading = false;
  //       state.btnLoading = false;
  //       state.error = action.payload.message; //storing error message of error that is send by api to axios call insider 'error' state
  //     });

  //   // builder
  //   //   .addCase(logout.pending, (state, action) => {
  //   //     state.loading = true;
  //   //   })
  //   //   .addCase(logout.fulfilled, (state, action) => {
  //   //     state.loading = false;
  //   //     localStorage.clear(); //storing user's data that is given by
  //   //     state.user = null; // setting user to null when user logged out
  //   //     state.isAuthenticated = false;
  //   //   })
  //   //   .addCase(logout.rejected, (state, action) => {
  //   //     state.loading = false;
  //   //     state.error = action.payload.message;
  //   //   });
  //   // builder
  //   //   .addCase(getUser.pending, (state, action) => {
  //   //     state.loading = true;
  //   //   })
  //   //   .addCase(getUser.fulfilled, (state, action) => {
  //   //     state.loading = false;
  //   //     state.isAuthenticated = true;
  //   //     state.user = action.payload; //here 'action.payload' equals to data that is returned from the api call
  //   //     localStorage.setItem("profile", JSON.stringify({ ...action.payload })); //storing user's data that is given by
  //   //   })
  //   //   .addCase(getUser.rejected, (state, action) => {
  //   //     state.loading = false;
  //   //     state.error = action.payload.message;
  //   //   });

  //   // builder
  //   //   .addCase(updateProfile.pending, (state, action) => {
  //   //     state.loading = true;
  //   //     state.btnLoading = true;
  //   //   })
  //   //   .addCase(updateProfile.fulfilled, (state, action) => {
  //   //     state.loading = false;
  //   //     state.btnLoading = false;
  //   //     state.user = action.payload;
  //   //     localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
  //   //   })
  //   //   .addCase(updateProfile.rejected, (state, action) => {
  //   //     state.loading = false;
  //   //     state.btnLoading = false;
  //   //     state.error = action.payload.message;
  //   //   });
  //   // builder
  //   //   .addCase(updateMyPassword.pending, (state, action) => {
  //   //     state.loading = true;
  //   //     state.btnLoading = true;
  //   //   })
  //   //   .addCase(updateMyPassword.fulfilled, (state, action) => {
  //   //     state.loading = false;
  //   //     state.btnLoading = false;
  //   //     state.user = action.payload;
  //   //     localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
  //   //   })
  //   //   .addCase(updateMyPassword.rejected, (state, action) => {
  //   //     state.loading = false;
  //   //     state.btnLoading = false;
  //   //     state.error = action.payload.message;
  //   //   });
  //   // builder
  //   //   .addCase(forgotPassword.pending, (state, action) => {
  //   //     state.loading = true;
  //   //     state.btnLoading = true;
  //   //   })
  //   //   .addCase(forgotPassword.fulfilled, (state, action) => {
  //   //     state.loading = false;
  //   //     state.btnLoading = false;
  //   //   })
  //   //   .addCase(forgotPassword.rejected, (state, action) => {
  //   //     state.loading = false;
  //   //     state.btnLoading = false;
  //   //     state.error = action.payload.message;
  //   //   });
  //   // builder
  //   //   .addCase(resetPassword.pending, (state, action) => {
  //   //     state.loading = true;
  //   //     state.btnLoading = true;
  //   //   })
  //   //   .addCase(resetPassword.fulfilled, (state, action) => {
  //   //     state.loading = false;
  //   //     state.btnLoading = false;
  //   //     state.user = action.payload;
  //   //     localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
  //   //     state.isAuthenticated = true;
  //   //   })
  //   //   .addCase(resetPassword.rejected, (state, action) => {
  //   //     state.loading = false;
  //   //     state.btnLoading = false;
  //   //     state.error = action.payload.message;
  //   //   });

  // },
});

export const { setUser, setLogout, setAuthTrue, setAuthFalse } =
  authSlice.actions; //persist user data even after reload /refres of page

// export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
// export const selectUser = (state) => state.auth.user;

export default authSlice;
