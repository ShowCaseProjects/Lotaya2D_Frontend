import styled from "@emotion/styled";
import { Box, Button, TextField, fabClasses } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useNavigate, useSearchParams } from "react-router-dom";
import { styled as styledMUI } from "@mui/material";
import { parseQueryString } from "../../utils/format";

ReactModal.setAppElement("#root");

export const ModalSearchPaymentList = ({
  modalIsOpen,
  onRequestClose,
  onClick,
  searchParams,
}: ModalProps) => {
  const [searchUrl, setSearchUrl] = useState('');
  const [paymentId, setPaymentId] = useState('');
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    setSearchUrl(
      parseQueryString({
        paymentId: paymentId,
        userId: userId,
        amount: amount,
      }, '')
    )
  }, [paymentId, userId, amount]);

  const applySearch = () => {
    onClick(searchUrl);
    syncSearch();
  }

  const keyDownHandler = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === 'Return') {
      event.preventDefault();
      onClick(searchUrl);
      syncSearch();
    }
    return;
  };
  const syncSearch = useCallback(() => {
    setPaymentId(searchParams.get('paymentId') ?? '');
    setUserId(searchParams.get('userId') ?? '');
    setAmount(searchParams.get('amount') ?? '');
  }, [searchParams]);
  useEffect(() => {
    syncSearch();
  }, [syncSearch])
  const closeSearch = () => {
    onRequestClose();
    syncSearch();
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
          <Box sx={{ "& .MuiTextField-root": { m: 1, width: "30ch" } }}>
            <StyledOnlyFlexDiv>
              <StyledLabel>
                <div style={{ width: 145 }}> {"Payment ID"}</div>
              </StyledLabel>
              <TextField
                variant="outlined"
                value={paymentId}
                size="small"
                autoComplete="off"
              // onKeyDown={keyDownHandler}
              onChange={(e) => setPaymentId(e.target.value)}
              />
            </StyledOnlyFlexDiv>
          </Box>
          <Box sx={{ "& .MuiTextField-root": { m: 1, width: "30ch" } }}>
            <StyledOnlyFlexDiv>
              <StyledLabel>
                <div style={{ width: 145 }}> {"User ID"}</div>
              </StyledLabel>
              <TextField
                variant="outlined"
                size="small"
                value={userId}
                autoComplete="off"
                // onKeyDown={keyDownHandler}
                onChange={(e) => setUserId(e.target.value)}
              />
            </StyledOnlyFlexDiv>
          </Box>
          <Box sx={{ "& .MuiTextField-root": { m: 1, width: "30ch" } }}>
            <StyledOnlyFlexDiv>
              <StyledLabel>
                <div style={{ width: 145 }}> {"Amount"}</div>
              </StyledLabel>
              <TextField
                variant="outlined"
                size="small"
                value={amount}
                autoComplete="off"
                onChange={(e) => setAmount(e.target.value)}
              // onKeyDown={keyDownHandler}
              />
            </StyledOnlyFlexDiv>
          </Box>
          <StyledBottomAlignDiv>
            <StyledInModalButton onClick={closeSearch}>Cancel</StyledInModalButton>
            <StyledInModalButton onClick={applySearch}>Search</StyledInModalButton>
          </StyledBottomAlignDiv>
        </StyledFlecificationDiv>
      </ReactModal>
    </>
  );
};

type ModalProps = {
  modalIsOpen: boolean;
  onRequestClose: () => void;
  onClick: (searchParam: any) => void;
  searchParams: URLSearchParams
};

export const LongStyledModal = {
  overlay: {
    zIndex: "2",
    backgroundColor: "rgba(0,0,0,0.85)",
  },
  content: {
    top: "10%",
    right: "10%",
    left: "20%",
    bottom: "10%",
    backgroundColor: "#ffffff",
    borderRadius: "1rem",
    padding: "1.5rem",
  },
};

export const StyledFlecificationDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

export const StyledOnlyFlexDiv = styled.div`
  display: flex;
  vertical-align: baseline;
`;

export const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  margin-right: 100px;
`;

export const StyledBottomAlignDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: auto;
`;

export const StyledInModalButton = styledMUI(Button)({
  margin: "20px",
});
