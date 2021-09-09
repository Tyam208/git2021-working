// import { ReactChild, ReactFragment, ReactPortal, useRef, useState } from "react";
// import Alert from "./base/Alert";
// import produce from "immer";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "../../store";

const getTimeString = (unixtime: number) => {
  const day = 24 * 60 * 60 * 1000;
  const dateTime = new Date(unixtime);

  return unixtime - new Date().getTime() >= day
    ? dateTime.toLocaleDateString()
    : dateTime.toLocaleTimeString();
};

const Contact = () => {
  
  const contact = useSelector((state: RootState) => state.contact);
  const history = useHistory();

  return (
    <>
      <h2 className="text-center my-5">Contact</h2>
      <div className="d-flex justify-content-end mb-2">
        <button
          className="btn btn-primary text-nowrap"
          onClick={() => {
            history.push("/contact/create");
          }}
        >
          <i className="bi bi-plus"></i>
          추가
        </button>
      </div>
        <form>
        <table className="table table-striped w-100">
          <thead>
          <tr>
            <th >#</th>
            <th >이름</th>
            <th >전화번호</th>
            <th >이메일</th>
            <th >작성일시</th>
          </tr>
          </thead>
        {contact.data.map((item,index) => (
          <tbody  key={`contact-item-${index}`}>
            <tr>
              <td className="px-4" >{item.id}</td>
              <td className="px-4">{item.name}</td>
              <td className="px-4">{item.email}</td>
              <td className="px-4">{item.tel}</td>
              <td className="px-4">{getTimeString(item.createdTime)}</td>
            </tr>
            <div
              onClick={() => {
              history.push(`/Contact/detail/${item.id}`);
            }}
          >
        </div>
            </tbody>
        ))}
        
        </table>
      </form>
    </>
       
        
  );
        
};

export default Contact;



