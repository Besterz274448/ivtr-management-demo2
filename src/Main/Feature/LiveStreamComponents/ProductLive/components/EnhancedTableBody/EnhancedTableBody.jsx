import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Switch from "@material-ui/core/Switch";
import { getComparator, stableSort } from "../../../utils/TableUtils";
import EditDialog from "./components/EditDialog";
import DeleteDialog from "./components/DeleteDialog";

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(0.5),
  },
  dialog: {
    margin: theme.spacing(0.3),
  },
}));

export default function EnhancedTableBody(props) {
  const {
    rows,
    handleClick,
    isSelected,
    onSwitchLive,
    order,
    orderBy,
    page,
    rowsPerPage,
    emptyRows,
    dense,
  } = props;

  const classes = useStyles();

  return (
    <>
      {stableSort(rows, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => {
          const isItemSelected = isSelected(row.id);
          const labelId = `enhanced-table-checkbox-${index}`;

          return (
            <TableRow
              hover
              role="checkbox"
              aria-checked={isItemSelected}
              tabIndex={-1}
              key={row.id}
              selected={isItemSelected}
            >
              <TableCell
                padding="checkbox"
                onClick={(event) => handleClick(event, row.id)}
              >
                <Checkbox
                  checked={isItemSelected}
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </TableCell>
              <TableCell padding="none" align="left" style={{ width: "100px" }}>
                <Switch
                  checked={row.live}
                  onChange={(event) => {
                    onSwitchLive(event, row);
                  }}
                  color="primary"
                />
              </TableCell>
              <TableCell padding="none" align="left">
                {row.keyword.map((keyword) => (
                  <Chip
                    key={keyword}
                    size="small"
                    variant="outlined"
                    color="primary"
                    label={keyword}
                    className={classes.chip}
                  />
                ))}
              </TableCell>
              <TableCell component="th" id={labelId} scope="row" padding="none">
                {row.id}
              </TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.category}</TableCell>
              <TableCell align="left">{row.price}</TableCell>
              <TableCell align="left">{row.quantity}</TableCell>
              <TableCell align="left" padding="none">
                <Grid container spacing={0}>
                  <Grid item xs={4} className={classes.dialog}>
                    <EditDialog />
                  </Grid>
                  <Grid item xs={4} className={classes.dialog}>
                    <DeleteDialog />
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
          );
        })}
      {emptyRows > 0 && (
        <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </>
  );
}
