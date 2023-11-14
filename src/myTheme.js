import { createTheme } from "@material-ui/core/styles";

export const theme = createTheme({
  overrides: {
    MuiGridPanel: {
      // Notice that we use the component's name, not the CSS class
      root: {}
    },
    MuiFormLabel: {
      root: {
        // color: palette.text.primary,
        "&$focused": {
          color: "green"
        }
      }
    },

    MuiInput: {
      // underline: {
      //   "&:before": {
      //     // style the underline before it's focused (normal state)
      //     borderBottom: "1px solid #e2e2e1" // for example a gray color
      //   },
      //   "&:hover:not(.Mui-disabled):before": {
      //     // style the underline on hover when it's not disabled
      //     borderBottom: "2px solid green" // for example a lighter blue
      //   },
      //   "&:after": {
      //     // style the underline when it's focused
      //     borderBottom: "2px solid red" // your desired color for the focused state
      //   }
      // }
    }
  }
});
