import contactReducer, {addContact, initialContact} from "./ContactSlice";
import { createAction, PayloadAction } from "@reduxjs/toolkit";
import { ContactItem } from "./ContactSlice";
import { call, put, take, takeEvery, takeLatest } from "@redux-saga/core/effects";
import api,{ ContactItemRequest, ContactItemResponse } from "./contactApi";
import { AxiosResponse } from "axios";

export const requestAddContact = createAction<ContactItem>(
  `${contactReducer.name}/requestAddContact`
);

export const requestFetchContacts = createAction(
  `${contactReducer.name}/requestFetchContacts`
);

export const requestremoveContacts = createAction(
  `${contactReducer.name}/requestRemoveContacts`
)

function* addData(action: PayloadAction<ContactItem>) {
  yield console.log("--addData--");
  yield console.log(action);

  const contactItemPayload = action.payload;

  const contactItemRequest: ContactItemRequest = {
    name: contactItemPayload.name,
    email: contactItemPayload.email,
    phone: contactItemPayload.phone,
    memo: contactItemPayload.memo,
  };

  const result: AxiosResponse<ContactItemResponse> = yield call(
    api.add,
    contactItemRequest
  );

  const ContactItem: ContactItem = {
    id: result.data.id,
    name: result.data.name,
    email: result.data.email,
    phone: result.data.phone,
    memo: result.data.memo,
    createdTime: result.data.createdTime,
  };

  yield put(addContact(ContactItem));
}

function* fetchData() {
  yield console.log("--fetchData--");

  const result: AxiosResponse<ContactItemResponse[]> = yield call(api.fetch);

  const contacts = result.data.map(
    (item) =>
      ({
        id: item.id,
        name: item.name,
        email: item.email,
        phone: item.phone,
        memo: item.memo,
        createdTime: item.createdTime,
      } as ContactItem)
  );
  
    yield put(initialContact(contacts));
  }

  // function removeData() {
  //   yield console.log("--remove--");

  //   const result: 
  // }

  export default function* contactSaga() {
    yield takeEvery(requestAddContact,addData);
    
    yield takeLatest(requestFetchContacts, fetchData);
    // yield takeEvery(requestremoveContacts, removeData);
  }



