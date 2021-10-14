import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../features/profile/profileSlice";
import photoReduer from "../features/photo/photoSlice";
import contactReducer from "../features/contact/ContactSlice";
import progressReducer from "../components/progress/progressSlice";
import alertReducer from "../components/alert/alertSlice";

// 최상위 사가
import rootSaga from "../saga";
import createSagaMiddleware from "@redux-saga/core";


const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  // 각 state별로 처리할 reducer 목록
  reducer: {
    // state이름: reducer이름
    // profile state 처리하는 reducer를 등록
    profile: profileReducer,
    // photo state를 처리하는 reducer를 등록
    photo: photoReduer,
    contact: contactReducer,
    progress: progressReducer,
    alert: alertReducer,
  },
  
  middleware: [sagaMiddleware],
  devTools: true, // 개발툴 사용여부
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;