/// <reference types="vite/client" />

interface ImportMeta {
  env: {
    [key: string]: string | boolean | undefined;
    VITE_ANALYTICS_ID: string;
  };
}
