import * as  React from "react";
import Box from "@mui/material/Box"
import { AppBar, Button, CssBaseline, Divider, Drawer, List, Toolbar, styled as styledMUI } from "@mui/material";
import styled from "@emotion/styled"
import { Link } from "react-router-dom";
import { NavigationLink } from "../pages/Common/NavigationLink";
import { useState } from "react";

interface InterfaceMenu {
    children: React.ReactNode;
}
const drawerWidth = 150;

export const MainLayout: React.FC<InterfaceMenu> = ({ children }) => {

    const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
    const [activePath, setActivePath] = useState('');
    return (
        <Box sx={{ dispaly: 'flex', zIndex: '10000' }}>
            <CssBaseline />
            <StyledAppBar
                position="fixed"
                sx={{
                    zIndex: (theme: {
                        zIndex: {
                            drawer: number
                        }
                    }) =>

                        theme.zIndex.drawer + 1,
                }}>
                <StyledMenuParentDiv>
                    <StyledLinkTitle to="/" onClick={() => setLoginModalIsOpen(false)}>
                        Lotaya
                    </StyledLinkTitle>
                    <StyledMenuChildDiv>
                        <StyledLinkMenu to="/user/change-password">
                            <StyledBackRetainButton onClick={() => setLoginModalIsOpen(false)}>
                                Change Password
                            </StyledBackRetainButton>
                            <StyledBackRetainButton onClick={() => setLoginModalIsOpen(false)}>
                                Logout
                            </StyledBackRetainButton>
                        </StyledLinkMenu>
                    </StyledMenuChildDiv>
                </StyledMenuParentDiv>
            </StyledAppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: 'border-box'
                    }
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <StyledList>
                        <StyledLi>
                            Payment
                        </StyledLi>
                        <NavigationLink
                            navigationPath="/payment"
                            buttonOnClick={() => {
                                setActivePath('/payment');
                            }
                            }
                            activePath={activePath}
                            setActivePath={setActivePath}
                            navigationLabel="Approver"
                        />
                        <NavigationLink
                            navigationPath="/payment"
                            buttonOnClick={() => {
                                setActivePath('/payment');
                            }
                            }
                            activePath={activePath}
                            setActivePath={setActivePath}
                            navigationLabel="Reject"
                        />
                        <NavigationLink
                            navigationPath="/payment"
                            buttonOnClick={() => {
                                setActivePath('/payment');
                            }
                            }
                            activePath={activePath}
                            setActivePath={setActivePath}
                            navigationLabel="Request"
                        />
                    </StyledList>
                    <Divider />
                    <StyledList>
                        <StyledLi>
                            Withdraw
                        </StyledLi>
                        <NavigationLink
                            navigationPath="/payment"
                            buttonOnClick={() => {
                                setActivePath('/payment')
                            }
                            }
                            navigationLabel="Approver"
                        />
                        <NavigationLink
                            navigationPath="/payment"
                            buttonOnClick={() => {
                                setActivePath('/payment')
                            }
                            }
                            navigationLabel="Reject"
                        />
                        <NavigationLink
                            navigationPath="/payment"
                            buttonOnClick={() => {
                                setActivePath('/payment')
                            }
                            }
                            navigationLabel="Request"
                        />
                    </StyledList>
                </Box>
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3 }}
                style={{ overflowX: 'auto',marginLeft:'150px' }}
            >
                {children}
            </Box>
        </Box>
    );
}

export const StyledAppBar = styledMUI(AppBar)({
    color: 'white',
    backgroundColor: '#14325F'
});

export const titleStyle = {
    textDecoration: 'none',
    color: 'white',
    margin: '10px',
    marginLeft: '20px',
    fontFamaily: 'system-ui',
    fontSize: '30px'
}

export const StyledOnlyFlexDiv = styled.div`
     position:relative;
     margin-top:10px;
     margin-bottom:10px;
    `;

export const StyledLinkTitle = styledMUI(Link)({
    textDecoration: 'none',
    color: 'white',
    margin: '10px',
    marginLeft: '20px',
    fontFamaily: 'system-ui',
    fontSize: '30px'
});

export const StyledLinkMenu = styledMUI(Link)({
    textDecoration: 'none',
    color: 'white',
    fontFamaily: 'system-ui',
});

export const StyledMenuChildDiv = styled.div`
     position:absolute;
     top:15px;
     right:0px;
    `;

export const StyledMenuParentDiv = styled.div`
     position:relative;
     margin-top:10px;
     margin-bottom:10px;
    `;

export const StyledBackRetainButton = styledMUI(Button)({
    color: 'white',
    textTransform: 'none',
    margin: '2px 5px',
    '&:active': {
        background: '#c0c0c0'
    }
});


export const StyledList = styledMUI(List)({
    padding: '0px',
});

export const StyledLi = styled.li`
     background-color:#e2e7ed;
     height:40px;
     display:flex;
     align-items:center;
     padding:10px;
`;