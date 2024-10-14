// import { State, createReducer, on } from "@ngrx/store"
// import { authActions } from "../../state/Actions/authActions"

// export interface authInterface{
//    registerSuccessMessage:string
//    registerErrorMeesage:string
//    registerLoading:boolean
//    loginsSuccessMessage:string
//    loginErrorMessage:string
//    loginLoading:boolean 
// }

// const initialState:authInterface={
//     registerSuccessMessage: "",
//     registerErrorMeesage: "",
//     registerLoading: false,
//     loginsSuccessMessage: "",
//     loginErrorMessage: "",
//     loginLoading: false
// }

// export const authReducer = createReducer(
//     initialState,
//     on(authActions.login, (state)=>{
//         return{
//             ...state,
//             loginErrorMessage:'',
//             loginLoading:true,
//             loginsSuccessMessage:''
//         }
//     }),
//     on(authActions.loginSuccess, (state, action)=>{
//         return{
//             ...state,
//             loginErrorMessage:'',
//             loginLoading:false,
//             loginsSuccessMessage:action.res.message,
    
//         }
//     }),
//     on(authActions.loginFail, (state, {message})=>{
//         return{
//             ...state,
//             loginErrorMessage:message,
//             loginLoading:false,
//             loginsSuccessMessage:''
//         }
//     }),
//     on(authActions.register, (state)=>{
//         return{
//             ...state,
//             registerSuccessMessage:'',
//             registerErrorMeesage:'',
//             registerLoading:true
//         }
//     }),
//     on(authActions.registerSuccess, (state, action)=>{
//         return{
//             ...state,
//             registerSuccessMessage:action.res.message,
//             registerErrorMeesage:'',
//             registerLoading:false
//         }
//     }),
//     on(authActions.registerFail, (state, {message})=>{
//         return{
//             ...state,
//             registerErrorMeesage:message,
//             registerSuccessMessage:'',
//             registerLoading:false
//         }
//     })
// )