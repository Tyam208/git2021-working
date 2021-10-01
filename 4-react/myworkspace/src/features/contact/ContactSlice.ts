import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface ContactItem {
  id: number;
  name: string;
  email: string;
  phone: string;
  memo?: string;
  createdTime: number;
}

interface ContactState {
  data: ContactItem[];
  isFetched: boolean;
}

const initialState: ContactState = {
  data: [
    // {
    //   id: 1,
    //   name: "Noh YooJung",
    //   email:"yj90208@naver.com",
    //   phone:"010-1234-5678",
    //   memo: "메모",
    //   createdTime: new Date().getTime(),
    // },
  ],
  isFetched: false,
}


const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    
    addContact: (state, action: PayloadAction<ContactItem>) => {
      const contact = action.payload;
      state.data.unshift(contact);
    },
   
    removeContact: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.data.splice(
        state.data.findIndex((item) => item.id === id),
        1
      );
    },
    modifyContact: (state, action: PayloadAction<ContactItem>) => {
      const modifyItem = action.payload;
      const contactItem = state.data.find((item) => item.id === modifyItem.id);
      if (contactItem) {
        contactItem.name = modifyItem.name;
        contactItem.email = modifyItem.email;
        contactItem.phone = modifyItem.phone;
        contactItem.memo = modifyItem.memo;
      }
    },
    initialContact: (state, action: PayloadAction<ContactItem[]>) => {
      const contacts = action.payload;
      state.data = contacts;
      state.isFetched = true;
    },
  },
});

export const { addContact, removeContact, modifyContact, initialContact } = contactSlice.actions;

export default contactSlice.reducer;