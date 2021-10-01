import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { requestFetchContacts } from "./contactSaga";

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
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if(!contact.isFetched) {
      dispatch(requestFetchContacts());
    }
  }, [dispatch, contact.isFetched]);

  return (
    <>
      <h2 className="text-center my-5">Contact</h2>
      <div className="d-flex justify-content-end mb-2">
        <button className="btn btn-secondary me-2"
          onClick={() => {
          dispatch(requestFetchContacts());
        }}>
          <i className="bi bi-arrow-clockwise"></i>
          새로고침
        </button>
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
      <table className="table table-striped">
        <thead >
        <tr>
          <th>#</th>
          <th >이름</th>
          <th >전화번호</th>
          <th >이메일</th>
          <th >작성일시</th>
        </tr>
        </thead>
        {contact.data.map((item,index) => (
          <tbody key={`contact-item-${index}`} >
            <tr style={{ cursor: "pointer" }}
              onClick={() => {
              history.push(`/Contact/detail/${item.id}`);
            }}>
              <td className="px-4" >{item.id}</td>
              <td className="px-4">{item.name}</td>
              <td className="px-4">{item.email}</td>
              <td className="px-4">{item.phone}</td>
              <td className="px-4">{getTimeString(item.createdTime)}</td>
            </tr>
          </tbody>
        ))}
        </table>
      </form>
    </>
  );
};

export default Contact;



