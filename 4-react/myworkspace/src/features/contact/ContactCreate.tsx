import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { requestAddContact } from "./contactSaga";
import { addContact, ContactItem } from "./ContactSlice";

const ContactCreate = () => {
 
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const descText = useRef<HTMLTextAreaElement>(null);

  const contactData = useSelector((state: RootState) => state.contact.data);

  const dispatch = useDispatch<AppDispatch>();

  const history = useHistory();

  const handleAddClick = () => {
    // console.log(nameRef.current?.value);
    const item: ContactItem = {
       id: contactData.length ? contactData[0].id + 1 : 1,
       name: nameRef.current ? nameRef.current.value : "",
       email: emailRef.current ? emailRef.current.value : "",
       phone: phoneRef.current ? phoneRef.current.value : "",
       memo: descText.current? descText.current.value : "",
       createdTime: new Date().getTime(),
    };

        console.log(item);

        // dispatch(addContact(item));

        dispatch(requestAddContact(item));

        history.push("/contact");
      };


  return (
    <div style={{ width: "40vw" }} className="mx-auto">
      <h2 className="text-center">Contact Create</h2>
      <form>
      <table className="table table-striped">
        <tbody>
          <tr>
            <th>이름</th>
            <td><input className="form-control" type="text" ref={nameRef} /></td>
           </tr>
          <tr>
            <th>전화번호</th>
            <td><input className="form-control" type="text" ref={phoneRef} /></td>
          </tr>
          <tr>
             <th>이메일</th>
             <td><input className="form-control" type="text" ref={emailRef} /></td>
          </tr>
        <tr>
         <th>메모</th>
          <td>
           <textarea
            className="form-control"
            style={{ height: "40vh" }}
            ref={descText}
           ></textarea>
          </td>
         </tr>
         </tbody>
      </table>
      </form>

      <div>
        <button
          className="btn btn-secondary float-start"
          onClick={() => {
            history.push("/contact");
          }}
        >
          <i className="bi bi-grid-3x3-gap me-1"></i>
          목록
        </button>
        <button
          className="btn btn-primary float-end"
          onClick={() => {
            handleAddClick();
          }}
        >
          <i className="bi bi-check" />
          저장
        </button>
      </div>
    </div>
  );
      
};

export default ContactCreate;