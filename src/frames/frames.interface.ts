export interface FrameDataItem {
  id: number;
  heading: string;
  subheading: string;
  text: string;
  selected: boolean;
  hasInput: boolean;
  imageUrl: string;
  inputLabel?: string;
  contentImageUrl: string;
}

export type FrameData = FrameDataItem[];
