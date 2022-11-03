import { IconButton, Paper, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table } from "reactstrap";
import productsApi from "~/api/productsApi";
import DeleteIcon from '@mui/icons-material/Delete';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


function ViewProducts() {
  const [products, setProducts] = useState([]);

  const currentAccount = useSelector((state) => state.account.current);
  console.log(currentAccount);
  
  const fetchData = async () => {
    await productsApi.getList(currentAccount.storeID).then((response) => setProducts(response.data));
  };
  useEffect(() => {
    fetchData().catch((error) => {
      console.log(error);
    });
  }, []);

console.log("products:  ", products);

  // =========pagina tion=======
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };



  // ====================



  return (
    <>
      <div>ViewProducts</div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow hover>
              <TableCell>Tên</TableCell>
              <TableCell align="right">Mô tả</TableCell>
              <TableCell align="right">ưu đãi</TableCell>
              <TableCell align="right">Hình ảnh</TableCell>
              <TableCell align="right">Đơn giá</TableCell>
              <TableCell align="right">Tỉnh</TableCell>
              <TableCell align="right">Rate</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row) => (
              <TableRow hover
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">{row.discount}</TableCell>
                <TableCell align="right">
                  <img src={row.item_Image} width='200px' alt="" />
                  
                  </TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.province}</TableCell>
                <TableCell align="right">{row.rate}</TableCell>
                <TableCell align="right">
                  <IconButton>
                    <DeleteIcon/>
                  </IconButton>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

export default ViewProducts;
