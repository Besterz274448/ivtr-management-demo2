/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function ComboBox({ filterData, onChangeSearchBar }) {
  return (
    <Autocomplete
      id="size-small-standard"
      size="small"
      options={filterData}
      style={{ width: 150, paddingTop: 19 }}
      freeSolo
      onInputChange={(event) => {
        if (!event.target.value) {
          onChangeSearchBar("","reset");
        } else {
          onChangeSearchBar(event.target.value.trim(),"search")
        }
      }}
      getOptionLabel={(option) => option + ""}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          placeholder="Search Your Item. . . "
        />
      )}
    />
  );
}
