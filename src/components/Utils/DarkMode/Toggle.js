import React from "react";
import { func, string } from "prop-types";
import styled from "styled-components";

//svg 해와 달 디자인에 사용되는 svg 파일 import
import { ReactComponent as MoonIcon } from "../icons/moon.svg";
import { ReactComponent as SunIcon } from "../icons/sun.svg";

const ToggleContainer = styled.button`
  position: relative;
  display: flex;
  justify-content: space-between;
  background: ${({ theme }) => theme.gradient};
  width: 7rem;
  height: 3.5rem;
  margin: 0 auto;
  border-radius: 10px;
  border: 2px solid ${({ theme }) => theme.toggleBorder};
  font-size: 0.5rem;
  padding: 0.5rem;
  overflow: hidden;
  cursor: pointer;
  svg {
    width: 2.5rem;
    height: auto;
    transition: all 0.3s linear;
    &:first-child {
      transform: ${({ lightTheme }) =>
        lightTheme ? "translateY(0)" : "translateY(100px)"};
    }
    &:nth-child(2) {
      transform: ${({ lightTheme }) =>
        lightTheme ? "translateY(-100px)" : "translateY(0)"};
    }
  }
`;

//theme은 현재 테마를 제공, toggleTheme 는 theme 를 변환
const Toggle = ({ theme, toggleTheme }) => {
  const isLight = theme === "light";

  return (
    <ToggleContainer lightTheme={isLight} onClick={toggleTheme}>
      <SunIcon />
      <MoonIcon />
    </ToggleContainer>
  );
};

Toggle.propTypes = {
  toggleTheme: func.isRequired,
  theme: string.isRequired,
};

export default Toggle;