export interface IReactEditorHandle {
  getContent: () => string;
  setContent: (val: string) => void;
}