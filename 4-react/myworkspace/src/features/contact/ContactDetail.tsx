import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { removeContact } from "./ContactSlice";

const ContactDetail = () => {
  const { id } = useParams<{ id: string }>();
  console.log(id);

  const contactItem = useSelector((state: RootState) =>
    state.contact.data.find((item) => item.id === +id)
  ); 
  console.log(contactItem);

  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();

  const handDeleteClick = () => {
    dispatch(removeContact(+id));
    history.push("/contact"); 
  };

  return (
    <div style={{ width: "40vw" }} className="mx-auto">
      <h2 className="text-center">Contact Detail</h2>
      {!contactItem && <div className="text-center my-5">데이터가 없습니다.</div>}
      {contactItem && (
        <table className="table">
          <tbody>
            <tr>
              <th>이름</th>
              <td>{contactItem.name}</td>
            </tr>
            <tr>
              <th>전화번호</th>
              <td>{contactItem.phone}</td>
            </tr>
            <tr>
              <th>이메일</th>
              <td>{contactItem.email}</td>
            </tr>
            <tr>
              <th>메모</th>
              <td>{contactItem.memo}</td>
            </tr>
            <tr></tr>
          </tbody>
        </table>
      )}

      <div className="d-flex">
        <div style={{ width: "50%" }}>
          <button
            className="btn btn-secondary me-1"
            onClick={() => {
              history.push("/contact");
            }}
          >
            <i className="bi bi-grid-3x3-gap me-1"></i>
            목록
          </button>
        </div>
        <div style={{ width: "50%" }} className="d-flex justify-content-end">
          <button
            className="btn btn-primary me-1"
            onClick={() => {
              history.push(`/contact/edit/${id}`);
            }}
          >
            <i className="bi bi-pencil me-1" />
            수정
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              handDeleteClick();
            }}
          >
            <i className="bi bi-trash me-1" />
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactDetail;