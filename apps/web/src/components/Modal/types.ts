import { ReactNode, FC } from "react";

export type Handler = () => void;
export type Opener = <T = {}>(
  Content: FC<T>,
  props: T & { isDismissDisabled?: false }
) => void;
export type Handlers = {
  showModal: Opener;
  hideModal: Handler;
};
export interface Props {
  classes: string;
  children: ReactNode;
}
