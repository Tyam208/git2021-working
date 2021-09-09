import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { modifyContact } from "./ContactSlice";

const ContactEdit = () => {
  // ------ 데이터를 가져오거나 변수를 선언하는 부분 --------
  const { id } = useParams<{ id: string }>();

  const contactItem = useSelector((state: RootState) =>
    state.contact.data.find((item) => item.id === +id)
  );

  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();

  // const [url, setUrl] = useState<string | undefined>(contactItem?.contactUrl);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const telRef = useRef<HTMLInputElement>(null);
  const descTxta = useRef<HTMLTextAreaElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  

  const handleSaveClick = () => {
    if (fileInput.current?.files?.length) {
      const imageFile = fileInput.current.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        if (contactItem) {
          // 기존 데이터 카피
          const item = { ...contactItem };
          // 변경할 속성만 대입
          item.name = nameRef.current ? nameRef.current.value : "";
          item.email = emailRef.current ? emailRef.current.value : "";
          item.tel = telRef.current ? telRef.current.value : "";
          item.memo = descTxta.current?.value;
          // item.photoUrl = reader.result ? reader.result.toString() : "";
          // item.fileType = imageFile.type;
          // item.fileName = imageFile.name;

          // reducer로 state 수정 및 목록으로 이동
          dispatch(modifyContact(item));
          history.push("/contact");
        }
      };
    }
  };

  return (
    <div style={{ width: "40vw" }} className="mx-auto">
      <h2 className="text-center">Photo Edit</h2>
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
              <th>설명</th>
              <td>
                <textarea
                  className="form-control"
                  style={{ height: "40vh" }}
                  defaultValue={contactItem?.memo}
                  ref={descTxta}
                ></textarea>
              </td>
            </tr>
            <tr>
              <th>이미지</th>
              <td>
                
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