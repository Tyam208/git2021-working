import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { addContact, ContactItem } from "./ContactSlice";

const ContactCreate = () => {
  // 입력 폼 ref 객체
 
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const telRef = useRef<HTMLInputElement>(null);
  const descTxta = useRef<HTMLTextAreaElement>(null);

  // 포토 데이터 배열 가져오기
  const contactData = useSelector((state: RootState) => state.contact.data);
  // 프로필 정보 가져오기
  // const profile = useSelector((state: RootState) => state.profile);

  // dispatch 함수 만들기
  const dispatch = useDispatch<AppDispatch>();

  // history 객체 가져오기
  const history = useHistory();

  const handleAddClick = () => {
    // console.log(nameRef.current?.value);
    console.log(descTxta.current?.value);
    if (nameRef.current?.files?.length && emailRef.current?.files?.length && telRef.current?.files?.length) {
      console.log(nameRef.current.files[0]);
    }

    if (nameRef.current?.files?.length && emailRef.current?.files?.length && telRef.current?.files?.length) {
      const reader = new FileReader();
      reader.onload = () => {
        // 추가할 객체 생성
        const item: ContactItem = {
          // 기존데이터의 id 중에서 가장 큰 것 + 1
          id: contactData.length ? contactData[0].id + 1 : 1,
          name: nameRef.current ? nameRef.current.value : "",
          email: emailRef.current ? emailRef.current.value : "",
          tel: telRef.current ? telRef.current.value : "",
          // 입력 정보
          memo: descTxta.current?.value,
          // 시스템 값(작성일시, 수정일시, 수정한사람....)
          createdTime: new Date().getTime(),
        };

        console.log(item);

        // state에 데이터 추가
        // 1. addPhoto함수에서 Action 객체를 생성함
        //    -> {type:"photo/addPhoto", payload:item}
        // 2. Action 객체를 Dispatcher에 전달함
        // 3. Dispatcher에서 Action.type에 맞는 리듀서 함수를 실행
        //    -> 기존 state와 action객체를 매개변수를 넣어주고 실행
        dispatch(addContact(item));

        // ** action creator를 사용하지 않고 아래 방법으로도 가능함
        // type: slice이름/reducer함수이름
        // payload: PayloadAction<페이로드타입>에 맞는 데이터 객체

        // 예)
        // type: photo/addPhoto
        // payload: item
        // dispatch({
        //   type: "photo/addPhoto",
        //   payload: item,
        // });

        // 목록 화면으로 이동
        history.push("/contact");
      };

      // reader.readAsDataURL(imageFile);
    }
  };

  return (
    <div style={{ width: "40vw" }} className="mx-auto">
      <h2 className="text-center">Photo Create</h2>
      <form>
      <table className="table table-striped w-100">
        <tbody>
          <tr>
            <th>이름</th>
            <td><input className="form-control" type="text" ref={nameRef} /></td>
           </tr>
          <tr>
            <th>전화번호</th>
            <td><input className="form-control" type="text" ref={telRef} /></td>
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
            ref={descTxta}
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