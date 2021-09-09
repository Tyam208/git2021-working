import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface ContactItem {
  id: number;
  name: string;
  email: string;
  tel: string;
  memo?: string;
  createdTime: number;
}

interface ContactState {
  data: ContactItem[];
  isFetched: boolean;
}

const initialState: ContactState = {
  data: [
    {
      id: 1,
      name: "Noh YooJung",
      email:"yj90208@naver.com",
      tel:"010-1234-5678",
      memo: "메모",
      createdTime: new Date().getTime(),
    },
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
      // id에 해당하는 아이템의 index를 찾고 그 index로 splice를 한다.
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
        contactItem.tel = modifyItem.tel;
        contactItem.memo = modifyItem.memo;
        contactItem.createdTime= modifyItem.createdTime;
      }
    },
  },
});

export const { addContact, removeContact, modifyContact } = contactSlice.actions;

export default contactSlice.reducer;