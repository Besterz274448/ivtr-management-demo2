/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function ComboBox({ filterData, onChangeSearchBar, clearAutocomplete }) {
  return (
    <Autocomplete
      id="size-small-standard"
      value={clearAutocomplete}
      size="small"
      options={filterData}
      style={{ width: 200, paddingTop: 19 }}
      freeSolo
      onInputChange={(event, values) => {
        if (!values) {
          onChangeSearchBar("", "reset");
        } else {
          onChangeSearchBar(values.trim(), "search");
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
