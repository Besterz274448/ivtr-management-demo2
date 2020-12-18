import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";


export default function FilterBox({ headCells, onChangeFilter,filterName,InputWidth,typeFilter }) {
  const useStyles = makeStyles((theme) => ({
    formControl: {

      margin: theme.spacing(1),
      minWidth: InputWidth || 120,
    },
  }));
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="grouped-select">{filterName}</InputLabel>
      <Select
        defaultValue={headCells[0].id}
        onChange={(event) => {
          onChangeFilter(event.target.value, typeFilter);
        }}
        id="grouped-select"
      >
        {headCells.map((data) => {
          return (
            <MenuItem key={data.id} value={data.id}>
              {data.label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}