import "vuetify/styles";

import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#2f5a9a",
        //   primary: "#FF5A5F",
          secondary: "#8ed1fc",
        //   primary: "#1976D2",
        //   secondary: "#424242",
        },
      },
      dark: {
        colors: {
          primary: "#BB86FC",
          secondary: "#03DAC6",
        },
      },
    },
  },
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
});

export default vuetify;
