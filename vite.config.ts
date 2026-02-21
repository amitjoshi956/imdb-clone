import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

const resolvePath = (path: string) => resolve(__dirname, path);

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@base": resolvePath("src/base"),
      "@components": resolvePath("src/components"),
      "@pages": resolvePath("src/pages"),
      "@services": resolvePath("src/services"),
      "@testdata": resolvePath("src/testdata"),
      "@assets": resolvePath("src/assets"),
      "@common": resolvePath("src/common"),
    },
  },
});
