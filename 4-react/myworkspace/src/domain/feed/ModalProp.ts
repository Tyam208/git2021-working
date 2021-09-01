import { FeedItemState } from "./type";

interface ModalProp {
  item: FeedItemState;
  onClose: () => void;
  onSave: (editItem: FeedItemState) => void; 
}

export type { ModalProp };
