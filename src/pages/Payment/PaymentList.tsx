import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  styled as styledMUI,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { PaymentTypeList } from "../../models/payment.types";
import axios, { AxiosError } from "axios";
import { API_URL } from "../../config";
import { useQuery } from "react-query";
import queryString from "query-string";
import { Loading } from "../Common/Loading";
import styled from "@emotion/styled";
import { ModalSearchPaymentList } from "./SearchPaymentList";

const translateKey = (k: any) => {
  const matchRow = columns.find((c) => (c.id = k));
  if (matchRow) return matchRow.label;
  return k;
};

const translateValue = (k: any, v: any) => {
  if (k === "paymentMethodId") return v.replace(/\\\\/g, "\\");
};
interface Column {
  id:
    | "paymentMethodId"
    | "userId"
    | "paymentType"
    | "paymentAccountName"
    | "paymentAccount"
    | "receiverAccountName"
    | "receiverAccount"
    | "amount"
    | "paymentConfirmationCode"
    | "registerDate"
    | "updatedDate"
    | "Button";
  label?: string;
  minWidth?: number;
  maxWidth?: number;
  padding?: number;
  align?: "center" | "left";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  {
    id: "paymentMethodId",
    label: "Payment Method ID",
    minWidth: 270,
    maxWidth: 270,
    align: "left",
  },

  {
    id: "userId",
    label: "User ID",
    minWidth: 90,
    maxWidth: 160,
    align: "left",
  },
  {
    id: "paymentType",
    label: "Payment type",
    minWidth: 150,
    maxWidth: 150,
    align: "left",
  },
  {
    id: "paymentAccountName",
    label: "Payment Account Name",
    minWidth: 200,
    maxWidth: 200,
    align: "left",
  },
  {
    id: "paymentAccount",
    label: "Payment Account Number",
    minWidth: 200,
    maxWidth: 200,
    align: "left",
  },
  {
    id: "receiverAccountName",
    label: "Receiver Account Name",
    minWidth: 250,
    maxWidth: 250,
    align: "left",
  },
  {
    id: "receiverAccount",
    label: "Receiver Account Number",
    minWidth: 200,
    maxWidth: 200,
    align: "left",
  },
  {
    id: "amount",
    label: "Amount",
    minWidth: 100,
    maxWidth: 160,
    align: "left",
  },
  {
    id: "paymentConfirmationCode",
    label: "Payment Confirmation Code",
    minWidth: 300,
    maxWidth: 300,
    align: "left",
  },
  {
    id: "registerDate",
    label: "Register Date",
    minWidth: 200,
    maxWidth: 200,
    align: "left",
  },
  {
    id: "updatedDate",
    label: "Updated Date",
    minWidth: 200,
    maxWidth: 200,
    align: "left",
  },
  {
    id: "Button",
    minWidth: 300,
    maxWidth: 300,
    padding: 0,
  },
];

export const PaymentList = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [hasApiError, setHasApiError] = useState(false),
    [toggleApi, setToggleApi] = useState(false);
  const [searchPaymentListModalIsOpen, setSearchPaymentListModalIsOpen] =
    useState(false);

  const fetchPaymentList = async () => {
    const paymentList: PaymentTypeList[] = await axios
      .get(`${API_URL}/paymentmethod?` + searchParams.toString())
      .then((res) => res.data);
    return paymentList;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: [("payment" + searchParams.toString() + toggleApi) as string],
    queryFn: fetchPaymentList,
  });

  useEffect(() => {
    setPage(0);
  }, [rowsPerPage, searchParams]);

  useEffect(() => {
    if (
      error &&
      error instanceof AxiosError &&
      error.code === "ERR_BAD_REQUEST"
    )
      setHasApiError(true);
    return () => {
      setHasApiError(false);
    };
  }, [error]);

  const deleteCriteria = (key: any) => {
    searchParams.delete(key);
    return navigate("/payment?" + searchParams.toString());
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
  };

  const onSearchPaymentListModalRequestClose = (): void =>
    setSearchPaymentListModalIsOpen(false);

  const onSearchPaymentListModalClick = (): void => {
    setToggleApi(!toggleApi);
    setSearchPaymentListModalIsOpen(false);
  };

  const getQueryParams = () => queryString.parse(searchParams.toString());

  if (isLoading) {
    return (
      <>
        <h2>Payment</h2>
        <span>Loading...</span>
        <Loading loadingIsOpen={isLoading} />
      </>
    );
  }

  // if (error) {
  //     return (
  //         <>
  //             <h2>Payment</h2>
  //             Error
  //         </>
  //     );
  // }

  let array: PaymentTypeList[] = [];
  if (data) {
    array = Object.keys(data).map(
      (key) => data[key as keyof typeof data] as PaymentTypeList,
    );
  }
  return (
    <>
      <ModalSearchPaymentList
        modalIsOpen={searchPaymentListModalIsOpen}
        onRequestClose={onSearchPaymentListModalRequestClose}
        onClick={onSearchPaymentListModalClick}
      />
      <h2>Payment - {}</h2>
      <StyledRightAlignDiv>
        <StyledNormalButton
          onClick={() => setSearchPaymentListModalIsOpen(true)}
        >
          Search
        </StyledNormalButton>
        <br />
        <span>Search Condition:</span>
        {Object.entries(getQueryParams()).map(([key, value]) => {
          return (
            <StyledCriteraDiv key={key}>
              <>
                {translateKey(key)}:{" "}
                {translateValue(key, value).replace(/\\\\/g, "\\")}
              </>
              <StyledCircleButton onClick={() => deleteCriteria(key)}>
                x
              </StyledCircleButton>
            </StyledCriteraDiv>
          );
        })}
      </StyledRightAlignDiv>
      <br />
      <br />
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 450 }}>
          <StyledTable stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      backgroundColor: "#F4F0E7",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {array &&
                array
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: any) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.paymentMethodId}
                      >
                        {columns.map((column) => {
                          if (column.id === "Button") {
                            return (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                style={{
                                  minWidth: column.minWidth,
                                  maxWidth: column.maxWidth,
                                  padding: column.padding,
                                  wordBreak: "break-all",
                                }}
                              >
                                <StyledNormalLink
                                  to={`payment/detail/${row.paymentId}`}
                                >
                                  Detail
                                </StyledNormalLink>
                              </TableCell>
                            );
                          } else {
                            const value = row[column.id];
                            return (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                style={{
                                  minWidth: column.minWidth,
                                  maxWidth: column.maxWidth,
                                  padding: column.padding,
                                  wordBreak: "break-all",
                                }}
                              >
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          }
                        })}
                      </TableRow>
                    );
                  })}
            </TableBody>
          </StyledTable>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={array.length}
          rowsPerPage={rowsPerPage}
          labelRowsPerPage="Payment"
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          showFirstButton={true}
          showLastButton={true}
        />
      </Paper>
    </>
  );
};

export const StyledTable = styledMUI(Table)({
  zIndex: "2",
});

export const StyledLink = styledMUI(Link)({
  textDecoration: "none",
  color: "black",
});

export const StyledNormalButton = styledMUI(Button)({
  color: "white",
  backgroundColor: "#14325F",
  margin: "5px 10px",
  border: "1px solid #14325F",
  "&:hover": {
    color: "#14325F",
    backgroundColor: "white",
    border: "1px solid #14325F",
  },
  "&:active": {
    background: "#c0c0c0",
  },
});

export const StyledRightAlignDiv = styled.div`
  text-align: right;
  display: inline-block;
  _display: inline;
  width: 100%;
  padding: 0px 15px;
`;

export const StyledCriteraDiv = styled.div`
  color: black;
  background-color: #f4f0e7;
  margin: 5px 5px;
  border: #f4f0e7;
  border-radius: 20px;
  display: inline-block;
  padding: 0px 10px;
`;

export const StyledCircleButton = styledMUI(Button)({
  color: "black",
  borderRadius: "20px",
  maxWidth: "30px",
  minWidth: "30px",
  maxHeight: "30px",
  "&:hover": {
    color: "#14325F",
    backgroundColor: "white",
    border: "#F4F0F7",
    borderRadius: "20px",
  },
  "&:active": {
    background: "#c0c0c0",
  },
});

export const StyledNormalLink = styledMUI(Link)({
  color: "white",
  backgroundColor: "#14325F",
  margin: "5px 10px",
  border: "1px solid #14325F",
  textDecoration: "none",
  borderRadius: "5px",
  padding: "10px",
  "&:hover": {
    color: "#14325F",
    backgroundColor: "white",
    border: "1px solid #14325F",
  },
  "&:active": {
    background: "#c0c0c0",
  },
});
