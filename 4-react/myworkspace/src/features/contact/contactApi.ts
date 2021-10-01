import axios from "axios";

export interface ContactItemResponse {
  id: number;
  name: string;
  email: string;
  phone: string;
  memo?: string;
  createdTime: number;
}

export interface ContactItemRequest {
  name: string;
  email: string;
  phone: string;
  memo?: string;
}

const contactApi = {
  fetch: () =>
    axios.get<ContactItemResponse[]>(`${process.env.REACT_APP_API_BASE}/contacts`),
  
  add:(contactItem: ContactItemRequest) =>
    axios.post<ContactItemResponse>(
      `${process.env.REACT_APP_API_BASE}/contacts`,
      contactItem
    ),

  remove: (id:number) => 
    axios.delete<boolean>(`${process.env.REACT_APP_API_BASE}/contacts/${id}`),

  modify: (id: number, contactItem: ContactItemRequest) =>
    axios.put<ContactItemResponse>(
      `${process.env.REACT_APP_API_BASE}/contacts/${id}`,
      contactItem
    ),

};


export default contactApi;