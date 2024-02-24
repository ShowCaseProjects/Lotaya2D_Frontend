import styled from "@emotion/styled";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import ReactModal from "react-modal";
import { useNavigate, useSearchParams } from "react-router-dom";
import { styled as styledMUI } from "@mui/material";

ReactModal.setAppElement('#root');

export const ModalSearchPaymentList = ({
    modalIsOpen,
    onRequestClose,
    onClick,
}: ModalProps) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [searchUrl, setSearchUrl] = useState('');
    const [paymentId, setPaymentId] = useState('');
    const [userId, setUserId] = useState('');
    const [amount, setAmount] = useState('');

    const closeSearch = () => {
        onRequestClose();

    };
    return (
        <>
            <ReactModal
                isOpen={modalIsOpen}
                style={LongStyledModal}
                onRequestClose={closeSearch}
            >
                <StyledFlecificationDiv>
                    <h2>Please enter your search data.</h2>
                    <br />
                    <Box
                        sx={{ '& .MuiTextField-root': { m: 1, width: '30ch' }, }}
                    >
                        <StyledOnlyFlexDiv>
                            <StyledLabel>
                                <div style={{ width: 145 }}> {'Payment ID'}</div>
                            </StyledLabel>
                            <TextField
                                variant="outlined"
                                size="small"
                                autoComplete="off"

                            >
                            </TextField>
                        </StyledOnlyFlexDiv>
                    </Box>
                    <Box
                        sx={{ '& .MuiTextField-root': { m: 1, width: '30ch' }, }}
                    >
                        <StyledOnlyFlexDiv>
                            <StyledLabel>
                            <div style={{ width: 145 }}>  {'User ID'}</div>
                            </StyledLabel>
                            <TextField
                                variant="outlined"
                                size="small"
                                autoComplete="off"

                            >
                            </TextField>

                        </StyledOnlyFlexDiv>
                    </Box>
                    <Box
                        sx={{ '& .MuiTextField-root': { m: 1, width: '30ch' }, }}
                    >
                        <StyledOnlyFlexDiv>
                            <StyledLabel>
                                <div style={{ width: 145 }}> {'Account Type'}</div>
                            </StyledLabel>
                            <TextField
                                variant="outlined"
                                size="small"
                                autoComplete="off"

                            >
                            </TextField>
                        </StyledOnlyFlexDiv>
                    </Box>
                    <StyledBottomAlignDiv>
                        <StyledInModalButton>
                            Cancel
                        </StyledInModalButton>
                        <StyledInModalButton>
                            Search
                        </StyledInModalButton>
                    </StyledBottomAlignDiv>
                </StyledFlecificationDiv>
            </ReactModal>
        </>
    );
}

type ModalProps = {
    modalIsOpen: boolean;
    onRequestClose: () => void;
    onClick: () => void;
}

export const LongStyledModal = {
    overlay: {
        zIndex: '2',
        backgroundColor: 'rgba(0,0,0,0.85)',
    },
    content: {
        top: '10%',
        right: '10%',
        left: '20%',
        bottom: '10%',
        backgroundColor: '#ffffff',
        borderRadius: '1rem',
        padding: '1.5rem'
    }
};

export const StyledFlecificationDiv = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
height:100%;
`;

export const StyledOnlyFlexDiv = styled.div`
display:flex;
vertical-align:baseline;
`;

export const StyledLabel = styled.label`
display:flex;
align-items:center;
margin-right:100px
`;

export const StyledBottomAlignDiv = styled.div`
display:flex;
justify-content:center;
margin-top:auto;
`;

export const StyledInModalButton = styledMUI(Button)({
    margin: '20px',
});

