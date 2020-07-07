import React, { useReducer, useRef } from "react";
import cn from "classnames";
import useClickOutside from "../useClickOutside";
import s from "./index.module.css";

type State = {
  mouseOverToggle: boolean;
  mouseOverContent: boolean;
};

type Action =
  | { type: "open" }
  | { type: "close" }
  | { type: "enterToggle" }
  | { type: "leaveToggle" }
  | { type: "enterContent" }
  | { type: "leaveContent" };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "open": {
      return {
        ...state,
        mouseOverToggle: true,
      };
    }
    case "close": {
      return {
        ...state,
        mouseOverToggle: false,
        mouseOverContent: false,
      };
    }
    case "enterToggle": {
      return {
        ...state,
        mouseOverToggle: true,
      };
    }
    case "leaveToggle": {
      return {
        ...state,
        mouseOverToggle: false,
      };
    }
    case "enterContent": {
      return {
        ...state,
        mouseOverContent: true,
      };
    }
    case "leaveContent": {
      return {
        ...state,
        mouseOverContent: false,
      };
    }
    default: {
      throw new Error(`Unsupported action was passed: ${action}`);
    }
  }
};

const initialState = {
  mouseOverToggle: false,
  mouseOverContent: false,
};

const timeout = 300;

const Dropdown = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const wrapperRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const onToggleClick = () => {
    if (state.mouseOverToggle || state.mouseOverContent) {
      dispatch({ type: "close" });
    } else {
      dispatch({ type: "open" });
    }
  };

  const onToggleEnter = () => {
    dispatch({ type: "enterToggle" });
  };

  const onToggleLeave = () => {
    setTimeout(() => {
      dispatch({ type: "leaveToggle" });
    }, timeout);
  };

  const onContentEnter = () => {
    dispatch({ type: "enterContent" });
  };

  const onContentLeave = () => {
    setTimeout(() => {
      dispatch({ type: "leaveContent" });
    }, timeout);
  };

  const onClickOutside = () => {
    dispatch({ type: "close" });
  };

  useClickOutside(wrapperRef, onClickOutside);

  const open = state.mouseOverToggle || state.mouseOverContent;

  return (
    <div ref={wrapperRef}>
      <button
        className={cn(s.toggle, open && s.toggleActive)}
        onClick={onToggleClick}
        onMouseEnter={onToggleEnter}
        onMouseLeave={onToggleLeave}
      >
        Open Menu
      </button>

      {open && (
        <div
          className={s.content}
          onMouseEnter={onContentEnter}
          onMouseLeave={onContentLeave}
        >
          <div className={s.caret} />

          <nav className={s.nav}>
            <a className={s.item} href="#blog">
              Blog
            </a>
            <a className={s.item} href="#news">
              News
            </a>
            <a className={s.item} href="#about">
              About
            </a>
            <a className={s.item} href="#contact-us">
              Contact Us
            </a>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
