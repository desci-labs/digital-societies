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
      details: string;
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
  message: never;
  txHash?: never;
  txInfo?: never;
  details?: never;
};

export type BroadcastStage = {
  step: Step.broadcast;
  message: never;
  txHash: never;
  txInfo?: never;
  details?: never;
  previewLink?: PreviewLink;
};

export type SuccessLink = { url: string; description: string }
export type PreviewLink = { href: string; caption: string }
export type SuccessStage = {
  step: Step.success;
  message: never;
  txHash: never;
  txInfo?: never;
  details?: never;
  successLink?: SuccessLink;
  previewLink?: PreviewLink;
};

export type ErrorStage = {
  step: Step.error;
  message: never;
  txHash?: never;
  txInfo?: never;
  details?: never;
  successLink?: SuccessLink;
  previewLink?: PreviewLink;
};

export type Stage = InitialStage | SubmitStage | BroadcastStage | SuccessStage | ErrorStage;

export type StageUpdator = (update: Stage) => void;