import { useRef, useState } from "react";

import produce from "immer";

// 1건에 대한 타입
interface FeedState {
  id: number;
  memo: string | undefined;
  createTime: number;
  
}

const getTimeString = (unixtime: number) => {
  // Locale: timezone, currency 등
  // js에서는 브라우저의 정보를 이용함
  const dateTime = new Date(unixtime);
  return `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`;
};

const Feed = () => {

  // todo 여러건에 대한 state
  // 참고) new Date().getTime() -> unix time 생성됨
  const [feedList, setFeedList] = useState<FeedState[]>([
    { id: 2, memo: "Typescript", createTime: new Date().getTime() },
    { id: 1, memo: "React State 연습", createTime: new Date().getTime() },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);

  const add = () => {
    const feed: FeedState = {
      id: feedList.length > 0 ? feedList[0].id + 1 : 1,
      memo: inputRef.current?.value,
      createTime: new Date().getTime(),
    };
    setFeedList(
      produce((state) => {
        state.unshift(feed);
      })
    );

    // 입력값 초기화
    formRef.current?.reset();
  };

  const del = (id: number, index: number) => {
    // 불변성 때문에 splice를 사용할 수 없음
    // 주로 filter 함수를 사용
    // filter 함수로 해당 id를 제외하고 새로운 배열로 리턴함.
    setFeedList(feedList.filter((item) => item.id !== id));
  };

  return (
    <>
      <form
        className="mt-5"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <textarea
          className="form-control mb-1 w-100"
          placeholder="Leave a post here"
        ></textarea>
        <div className="d-flex">
          <input
            type="file" 
            className="form-control me-1"
            accept="image/png, image/jpeg, video/mp4"
          />
          <button  
            className="btn btn-primary text-nowrap" 
            type="button"
            onClick={() => {
              add();
            }}
            >
            입력
          </button>
        </div>
        
      </form>
      <ul id="ul-list" className="list-group list-group-flush mt-3" ref={ulRef}>
        {/* 데이터와 UI요소 바인딩 */}
        {feedList.map((item, index) => (
          <li className="list-group-item d-flex" key={item.id}>
            <div className="w-100">
              <span className="me-1">{item.memo}</span>
              <span style={{ fontSize: "0.75rem" }}>
                - {getTimeString(item.createTime)}
              </span>
            </div>
            <button
              className="btn btn-outline-secondary btn-sm text-nowrap"
              onClick={() => {
                del(item.id, index);
              }}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Feed;