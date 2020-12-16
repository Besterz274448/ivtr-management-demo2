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
export default function FilterBox(){
    const classes = useStyles();

    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="grouped-select">Grouping</InputLabel>
        <Select defaultValue="" id="grouped-select">
          <MenuItem value={1}>None</MenuItem>
          <MenuItem value={2}>Option 1</MenuItem>
          <MenuItem value={3}>Option 2</MenuItem>
        </Select>
      </FormControl>
    );
}