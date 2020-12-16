import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));
export default function FilterBox({ headCells, onChangeFilter }) {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="grouped-select">Filter</InputLabel>
      <Select defaultValue={headCells[0].id}  onChange={(event)=>{
              onChangeFilter(event.target.value);
            }} id="grouped-select">
        {headCells.map((data, index) => {
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