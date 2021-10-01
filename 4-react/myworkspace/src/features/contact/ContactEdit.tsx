import { useRef } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { modifyContact } from "./ContactSlice"

const ContactEdit = () => {
  const { id } = useParams<{ id: string }>();

  const contactItem = useSelector((state: RootState) =>
    state.contact.data.find((item) => item.id === +id)
  );

  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const descText = useRef<HTMLTextAreaElement>(null);


  const handleSaveClick = () => {
    console.log("change");
    if (contactItem) {
    const item = { ...contactItem };

    item.name = nameRef.current ? nameRef.current.value : "";
    item.email = emailRef.current ? emailRef.current.value : "";
    item.phone = phoneRef.current ? phoneRef.current.value : "";
    item.memo = descText.current?.value;

    dispatch(modifyContact(item));
    history.push("/contact");
    }
    };
    

  return (
    <div style={{ width: "40vw" }} className="mx-auto">
      <h2 className="text-center">Contact Edit</h2>
      <form>
        <table className="table">
          <tbody>
            <tr>
              <th>연락처 입력</th>
              <td>
                <input
                  className="form-control"
                  type="text"
                  defaultValue={contactItem?.name}
                  ref={nameRef}
                />
              </td>
            </tr>
            <tr>
              <th>전화번호</th>
              <td>
                <input
                  className="form-control"
                  defaultValue={contactItem?.phone}
                  ref={phoneRef}
                ></input>
              </td>
            </tr>
            <tr>
              <th>전화번호</th>
              <td>
                <input
                  className="form-control"
                  defaultValue={contactItem?.email}
                  ref={emailRef}
                ></input>
              </td>
            </tr>
            <tr>
            <th>메모</th>
              <td>
                <textarea
                  className="form-control"
                  style={{ height: "40vh" }}
                  defaultValue={contactItem?.memo}
                  ref={descText}
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <div>
        <button
          className="btn btn-secondary me-1 float-start"
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
            handleSaveClick();
          }}
        >
          <i className="bi bi-check" />
          저장
        </button>
      </div>
    </div>
  );
};

export default ContactEdit;