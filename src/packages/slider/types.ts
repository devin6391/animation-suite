export interface ISliderChildStyles {
  width: number;
  height: number;
  transition: number;
}

export const enum ISliderDirection {
  MoveLeft,
  MoveRight,
  MoveUp,
  MoveDown
}

export interface IWrapperStyles {
  transform: string;
  transition: string;
  opacity: number;
}

export type TransitionStateTypes =
  | "enter"
  | "entering"
  | "entered"
  | "exit"
  | "exiting"
  | "exited";
