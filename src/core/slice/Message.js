// import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
// import axios, {HttpStatusCode} from 'axios';
// import {BASE_URL} from '../Constants';
// import {appSelectors} from './App';

// const initialState = {
//     conversations: [],
//     messages: {},
//     lastListConversationIndex: 0,
//     listConversationCount: 10,
//     lastMessageIndex: 0,
//     messageCount: 10,
// };

// const message = createSlice({name: 'message', initialState, reducers: {}});

// export const messageActions = message.actions;

// const getRoot = state => state.notification;

// export const messageSelectors = {
//     getListConversations: state => getRoot(state).conversations,
//     getLastListConversationIndex: state => getRoot(state).lastListConversationIndex,
//     getListConversationCount: state => getRoot(state).listConversationCount,
// };

// export const messageOperations = {
//     fetchGetListConversations: createAsyncThunk(
//         'post/fetchGetListConversations',
//         async (data, thunkParams) => {
//             const {reloadFlag} = data;
//             const state = thunkParams.getState();
//             const token = appSelectors.getToken(state);
//             const lastIndex = messageSelectors.getLastListConversationIndex(state);
//             const count = messageSelectors.getListConversationCount(state);
//             const lastList = messageSelectors.getListConversations(state);
//             if (reloadFlag) {
//                 return {
//                     response: await messageApi.getListConversations(token, 0, 10),
//                     reloadFlag: true,
//                 };
//             }
//         },
//     ),
// };
// export const messageApi = {
//     getListConversations: async (token, index, count) => {
//         const requestBody = {token: token, index: index, count};
//         const response = await axios.post(BASE_URL + '/it4788/get_list_conversation', requestBody);
//         return response;
//     },
//     getConversation: async (token, partnerId, conversationId, index, count) => {
//         const requestBody = {
//             token: token,
//             partner_id: partnerId,
//             conversation_id: conversationId,
//             index: index,
//             count,
//         };
//         const response = await axios.post(BASE_URL + '/it4788/get_conversation', requestBody);
//         return response;
//     },
//     deleteMessage: async (token, messageId, partnerId, conversationId) => {
//         const requestBody = {
//             token: token,
//             message_id: messageId,
//             partner_id: partnerId,
//             conversation_id: conversationId,
//         };
//         const response = await axios.post(BASE_URL + '/it4788/delete_message', requestBody);
//         return response;
//     },
// };

// export const messageReducer = message.reducer;
