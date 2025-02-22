/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_OPENAI_API_KEY: string
    // more env variables...
    readonly VITE_GOOGLE_API_KEY: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }