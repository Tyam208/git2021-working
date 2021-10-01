import { useRef, useState } from "react";
import produce from "immer";

import FeedEditModal from "./FeedEditModal";
import { FeedItemState } from "./type";
import { ModalProp } from "./ModalProp";

const getTimeString = (unixtime: number) => {
  const dateTime = new Date(unixtime);
  return `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`;
};


const Feed = () => {
  const [feedList, setFeedList] = useState<FeedItemState[]>([]);

  const [isEdit, setIsEdit] = useState(false);
  

  const textRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const add = (e: React.KeyboardEvent<HTMLInputElement> | null) => {
    if (e) {
      if (e.code !== "Enter") return;
    }

    if (fileRef.current?.files?.length) {
      const file = fileRef.current?.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        post(reader.result?.toString(), file.type);
      };


      reader.readAsDataURL(file);

    } else {
      post(undefined, undefined);
    }
  };

  const post = (dataUrl: string | undefined, fileType: string | undefined) => {
    const feed: FeedItemState = {
      id: feedList.length > 0 ? feedList[0].id + 1 : 1,
      // optional chaning
      content: textRef.current?.value,
      dataUrl: dataUrl,
      fileType: fileType,
      createTime: new Date().getTime(),
    };

    setFeedList([feed, ...feedList]);

    formRef.current?.reset();
  };

  const del = (id: number) => {
    setFeedList(feedList.filter((item) => item.id !== id));
  };

  const editItem = useRef<FeedItemState>({ id: 0, content: "", createTime: 0 });

  const edit = (item: FeedItemState) => {
    // 수정할 todo객체
    editItem.current = item;
    // 모달 팝업을 보여주기
    setIsEdit(true);
  };

  const save = (editItem: FeedItemState) => {
    console.log(editItem);
    setFeedList(
      produce((state) => {
        const item = state.find((item) => item.id === editItem.id);
        if (item) {
          item.content = editItem.content;
        }
      })
    );

    // 모달창 닫기
    setIsEdit(false);
  };


  return (
    <>
      <h2  className="text-center my-5">Feeds</h2>
      {isEdit && (
        <FeedEditModal
          item={editItem.current}
          onClose={() => {
            setIsEdit(false);
          }}
          onSave={(editItem) => {
            save(editItem);
          }}
        />
      )}
      <form
        className="mt-5"
        onSubmit={(e) => {
          e.preventDefault();
        }}
        ref={formRef}
      >
        <textarea
          className="form-control mb-2"
          placeholder="Leave a post here"
          ref={textRef}
          style={{ height: "15vh" }}
        ></textarea>
        <div className="d-flex">
          <input
            type="file"
            className="form-control me-1"
            accept="image/png, image/jpeg, video/mp4"
            ref={fileRef}
          />
          <button
            className="btn btn-primary text-nowrap"
            type="button"
            onClick={() => {
              add(null);
            }}
          >
            입력
          </button>
        </div>
      </form>
      <div className="mt-3">
        {feedList.map((item) => (
          <div className="card mt-1" key={item.id}>
            {item.fileType &&
              (item.fileType?.includes("image") ? (
                <img
                  src={item.dataUrl}
                  className="card-img-top"
                  alt={item.content}
                />
              ) : (
                <video className="card-img-top" controls src={item.dataUrl} />
              ))}
            <div className="card-body">
              <p className="card-text">{item.content}</p>
              <div className="d-flex">
                <div className="w-100">
                  <span className="text-secondary">
                    {getTimeString(
                      item.modifyTime ? item.modifyTime : item.createTime
                    )}
                  </span>
                </div>
                <button
                  className="btn btn-outline-secondary btn-sm text-nowrap me-1"
                  onClick={() => {
                    // 수정 모달 팝업 띄우고 데이터 객체 넘겨주기
                    edit(item);
                  }}
                >
                  수정
                </button>
                <a
                  href="#!"
                  onClick={(e) => {
                    e.preventDefault();
                    del(item.id);
                  }}
                  className="link-secondary fs-6 text-nowrap"
                >
                  삭제
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Feed;