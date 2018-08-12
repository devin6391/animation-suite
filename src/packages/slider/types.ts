export interface ISliderChildStyles {
  width: number;
  height: number;
  transition: number;
  enterTimingFunction?: string;
  exitTimingFunction?: string;
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
  transitionTimingFunction?: string;
}

export type TransitionStateTypes =
  | "enter"
  | "entering"
  | "entered"
  | "exit"
  | "exiting"
  | "exited";
