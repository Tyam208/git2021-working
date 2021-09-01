import { useRef, useState } from "react";
// import Alert from "./base/Alert";
import produce from "immer";

interface ContactState {
  id: number;
  name?: string | undefined;
  email?: string | undefined;
  tel?: string | undefined;
}

const Contact = () => {

  const [contactList, setContactList] = useState<ContactState[]>([
    
  ]);

  const [isError, setIsError] = useState(false);
  
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const telRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const add = (e: React.KeyboardEvent<HTMLInputElement> | null) => {
    if (e) {
      if (e.code !== "Enter") return;
    }

    if (!nameRef.current?.value && emailRef.current?.value && telRef.current?.value) {
      setIsError(true);
      return;
    }

    const contact: ContactState = {
        id: contactList.length > 0 ? contactList[0].id + 1 : 1,
        // optional chaning
        name: nameRef.current?.value,
        email: emailRef.current?.value,
        tel: telRef.current?.value,
      };
  
      setContactList(
        produce((state) => {
          state.unshift(contact);
        })
      );
  
      formRef.current?.reset();
    };



  const del = (id: number, index: number) => {
    // console.log(id);
    setContactList(contactList.filter((item) => item.id !== id));

    setContactList(
      produce((state) => {
        state.splice(index, 0);
      })
    );
  };
  

  return (
    <>
      <h2 className="text-center my-5">할 일 관리</h2>
      <form
        className="d-flex"
        ref={formRef}
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          className="form-control me-2"
          placeholder="이름"
          ref={nameRef}
          onKeyPress={(e) => {
            add(e);
          }}
        />
        <input
          type="text"
          className="form-control me-2"
          placeholder="전화번호"
          ref={emailRef}
          onKeyPress={(e) => {
            add(e);
          }}
        />
        <input
          type="text"
          className="form-control me-2"
          placeholder="이메일"
          ref={telRef}
          onKeyPress={(e) => {
            add(e);
          }}
        />
        <button
          type="button"
          className="btn btn-primary text-nowrap"
          onClick={() => {
            add(null);
          }}
        >
          추가
        </button>
      </form>
      <form>
      <table className="table table-striped w-100">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">이름</th>
          <th scope="col">전화번호</th>
          <th scope="col">이메일</th>
          <th scope="col">작업</th>
        </tr>
        </thead>
      {contactList.map((item, index) => (
        <tbody>
        <tr key={item.id}>
          <td className="px-4" >{item.id}</td>
          <td className="px-4">{item.name}</td>
          <td className="px-4">{item.email}</td>
          <td className="px-4">{item.tel}</td>
          <td>
          <button 
            className="btn btn-outline-secondary btn-sm remove"
            onClick={(e) => {e.preventDefault();
              del(item.id, index);
            }}
            >
            삭제</button>
          </td>
        </tr>
        
        </tbody>
      ))}
      </table>
      </form>
      
    </>
  
  )
  
};

export default Contact;