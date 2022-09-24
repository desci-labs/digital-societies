import { Transaction } from "ethers";

export enum Step {
  form = "form",
  submit = "submit",
  broadcast = "broadcast",
  success = "success",
  error = "error",
}

export type FormError =
  | {
      title: string;
      details?: string;
    }
  | string;

export type State = {
  form_loading: boolean;
  form_error: FormError;
  stage: Stage;
};

export type InitialStage = {
  step: Step.form;
  message?: never;
  txHash?: never;
  txInfo?: never;
  details?: never;
};

export type SubmitStage = {
  step: Step.submit;
  message: string;
  txHash?: never;
  txInfo?: never;
  details?: never;
};

export type BroadcastStage = {
  step: Step.broadcast;
  message: string;
  txHash: string;
  txInfo?: never;
  details?: never;
  previewLink?: PreviewLink;
};

export type SuccessLink = { url: string; description: string }
export type PreviewLink = { href: string; caption: string; }
export type SuccessStage = {
  step: Step.success;
  message: string;
  txHash: string;
  txInfo?: Transaction;
  successLink?: SuccessLink;
  previewLink?: PreviewLink;
};

export type ErrorStage = {
  step: Step.error;
  message: string;
  txHash?: string;
  txInfo?: never;
  details?: never;
};

export type Stage = InitialStage | SubmitStage | BroadcastStage | SuccessStage | ErrorStage;

export type StageUpdator = (update: Stage) => void;