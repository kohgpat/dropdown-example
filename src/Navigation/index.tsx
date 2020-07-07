import React, { useReducer } from "react";
import cn from "classnames";
import s from "./index.module.css";

// type State = {
//   el: React.ReactNode
// }

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "open": {
      return {
        ...state,
        el: action.target,
        open: true,
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
      throw new Error(
        `Unsupported action ${action.type} was passed: ${action}`
      );
    }
  }
};

const initialState = {
  open: false,
  el: null,
  mouseOverToggle: false,
  mouseOverContent: false,
};

const timeout = 300;

const Navigation = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onToggleClick = (e: React.MouseEvent) => {
    dispatch({ type: "open", target: e.currentTarget });
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

  const open = state.mouseOverToggle || state.mouseOverContent;

  return (
    <>
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
          className={s.nav}
          onMouseEnter={onContentEnter}
          onMouseLeave={onContentLeave}
        >
          <div className={s.caret} />

          <nav className={s.content}>
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
    </>
  );
};

export default Navigation;
