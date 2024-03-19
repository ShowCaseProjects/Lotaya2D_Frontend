import {
  ListItemButton,
  ListItemText,
  Typography,
  styled as styledMUI,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

type NavLinkProps = {
  navigationPath: string;
  navigationLabel: string;
  navigationState?: any;
  buttonStyle?: any;
  buttonOnClick(): void;
  activePath?: string;
  setActivePath?(T: string): void;
};

export function NavigationLink({
  navigationPath,
  navigationLabel,
  navigationState,
  buttonStyle,
  buttonOnClick,
  activePath,
  setActivePath,
}: NavLinkProps) {
  const [isActive, setIsActive] = useState("");
  const currentPath = useLocation().pathname;
  const currentSearch = useLocation().search;
  const absolutePaths: Array<string> = ["/payment"];
  useEffect(() => {
    if (currentPath.length > 1) {
      if (activePath === "") {
        if (
          decodeURI(currentPath) === navigationPath ||
          decodeURI(currentPath) + decodeURI(currentSearch) === navigationPath
        ) {
          setIsActive("active");
          setActivePath && setActivePath(navigationPath);
        }
      } else if (activePath === navigationPath) {
        setIsActive("active");
      } else if (
        currentPath === activePath &&
        activePath === navigationPath.split("?")[0]
      ) {
        setIsActive("active");
      } else if (absolutePaths.includes(decodeURI(currentPath))) {
        setActivePath && setActivePath(currentPath);
        setIsActive("");
      } else if (
        "/" + currentPath.split("/")[1] + "/" + currentPath.split("/")[2] ===
          activePath &&
        navigationPath.split("?")[0] ===
          "/" + currentPath.split("/")[1] + "/" + currentPath.split("/")[2]
      ) {
        setIsActive("active");
      }
    }
    return () => setIsActive("");
  }, [currentPath, activePath, navigationPath]);
  return (
    <StyledNavLinkMenu
      className={isActive}
      to={navigationPath}
      state={navigationPath && navigationState}
    >
      <StyledBlackTextButton className={isActive} onClick={buttonOnClick} >
        <ListItemText
          disableTypography
          primary={
            <NavLinkText className={isActive}>{navigationLabel}</NavLinkText>
          }
          sx={buttonStyle && buttonStyle}
        ></ListItemText>
      </StyledBlackTextButton>
    </StyledNavLinkMenu>
  );
}

export const StyledNavLinkMenu = styledMUI(Link)({
  textDecoration: "none",
  color: "black",
  fontFamaily: "system-ui",
  "&:active": {
    color: "white",
  },
});

export const StyledBlackTextButton = styledMUI(ListItemButton)({
  backgroundColor: "white",
  height: "36px",
  "&:active": {
    backgroundColor: "#a9a9a9",
  },
});

export const NavLinkText = styledMUI(Typography)({
  "&:active": {
    fontWeight: "bolder",
  },
});
