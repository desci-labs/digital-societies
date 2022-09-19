/* eslint-disable react-hooks/exhaustive-deps */
import useKeyPress from "hooks/useKeyPress";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Handlers, Opener, Props } from "./types";

export default function ModalProvider(props: Props) {
  const [Content, setContent] = useState<ReactNode>();
  const ref = useRef<HTMLDivElement>();
  const [backdropDismiss, setBackdropDismiss] = useState(true);
  const escKeyPressed = useKeyPress("Escape");


  const dismissModal = (event: any) => {
    const path = event.path || (event.composedPath && event.composedPath());

    if (path[0] === ref.current) {
      closeModal();
    }
  };

  useEffect(() => {
    if (escKeyPressed) {
      closeModal();
    }
  }, [escKeyPressed]);

  useEffect(() => {
    return () => ref.current?.removeEventListener("click", dismissModal);
  }, []);

  const handleRef = useCallback(
    (node: HTMLDivElement) => {
      if (node !== null && backdropDismiss) {
        ref.current = node;
        ref.current?.addEventListener("click", dismissModal);
      }
    },
    [backdropDismiss]
  );


  const showModal: Opener = (Content, props) => {
    setBackdropDismiss(props.isDismissDisabled ?? true);
    setContent(<Content {...props} />);
    toggleBodyScroll(false);
  };

  const toggleBodyScroll = (scroll: boolean) => {
    const body = document.body;
    if (scroll && body.classList.contains('modal-open')) {
      body.classList.remove('modal-open')
    } else if (!scroll) {
      body.classList.add('modal-open')
    }
  }

  function closeModal() {
    toggleBodyScroll(true);
    setContent(undefined);
    setBackdropDismiss(true);
  }

  return (
    <setContext.Provider
      value={{
        showModal,
        hideModal: closeModal,
      }}
    >
      {!!Content && (
        <>
          <div ref={handleRef} className={props.classes}>
            {Content}
          </div>
        </>
      )}

      {props.children}
    </setContext.Provider>
  );
}
const setContext = createContext<Handlers>({
  showModal: () => { },
  hideModal: () => { },
});

export const useModalContext = () => useContext(setContext);
