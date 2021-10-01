import { useRef, useState } from "react";
import { FeedItemState } from "./type";

interface ModalProp {
  item: FeedItemState;
  onClose: () => void;
  onSave: (editItem: FeedItemState) => void; 
}


const FeedEditModal = ({ item, onClose, onSave }: ModalProp) => {

  const [isEdit, setIsEdit] = useState(false);
  const [url,setUrl] = useState<string | undefined>();

  const fileRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  
  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        setUrl(reader.result?.toString());
      };

      reader.readAsDataURL(file);
    }
  };

  const save = () => { 
    const feed: FeedItemState = {
      id: item.id,
      content: textRef.current?.value, 
      dataUrl: item.dataUrl,
      fileType: item.fileType,
      createTime: item.createTime,
    };

    onSave(feed);
  };

  return (
    <div
      className="modal d-block"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onClick={() => {
        onClose();
      }}
    >
      <div className="modal-dialog">
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h5 className="modal-title">EDIT FEED</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => {
                onClose();
              }}
            ></button>
          </div>
          <div className="modal-body">
          <textarea
            className="form-control mb-1"
            placeholder="Leave a post here"
            ref={textRef}
            style={{ height: "15vh", boxSizing: "border-box"}}
          ></textarea>
          <div className="d-flex">
          <input
            type="file"
            className="form-control me-1"
            accept="image/png, image/jpeg, video/mp4"
            ref={fileRef}
          />
          </div>
          {isEdit && (
              <>
                
                <input
                  type="file"
                  className="form-control form-control-sm me-1"
                  accept="image/png, image/jpeg"
                  onChange={(e) => {
                    change(e);
                  }}
                />
                
              </>
            )}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                onClose();
              }}
            >
              닫기
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                save();
              }}
            >
              저장
            </button>
          </div>
        </div>
      </div>
     </div>
    </div>
  );
};

export default FeedEditModal;