/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function ComboBox() {
  return (
    <>
      <Autocomplete
        id="combo-box-demo"
        options={top100Films}
        getOptionLabel={(option) => option.title}
        style={{ width: 300 }}
        defaultValue={top100Films[2]}
        renderInput={(params) => (
          <div>
            {console.log(params)}
            <TextField {...params} label="Combo box" variant="outlined" />
          </div>
        )}
      />
    </>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  { title: "The Lord of the Rings: The Return of the King", year: 2003 },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
];
// const getthaipost = () => {
//   var xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = () => {
//     if (xhttp.readyState === 4 && xhttp.status === 200) {
//       var response_data = JSON.parse(xhttp.responseText);
//       response_data.words = response_data.words.split("|");
//       response_data.words.map(
//         (value, index) =>
//           (response_data.lookup = response_data.lookup.replaceAll(
//             String.fromCharCode(index + (index > 25 ? 65 + 6 : 65)),
//             value
//           ))
//       );
//       response_data.lookup = response_data.lookup.split("|");
//       response_data.data = JSON.stringify(response_data.data);
//       response_data.words.map(
//         (value, index) =>
//           (response_data.data = response_data.data.replaceAll(
//             String.fromCharCode(index + (index > 25 ? 65 + 6 : 65)),
//             value
//           ))
//       );
//       response_data.lookup.map(
//         (value, index) =>
//           (response_data.data = response_data.data.replaceAll(
//             "[" + index.toString() + ",",
//             `["${value}"` + ","
//           ))
//       );
//       response_data.data = JSON.parse(response_data.data);
//       delete response_data.lookup;
//       delete response_data.words;
//       document.cookie = response_data;
//       setG(response_data);
//     }
//   };
//   xhttp.open("GET", "/setting_mockup/thaicode.json", true);
//   xhttp.send();
// };
