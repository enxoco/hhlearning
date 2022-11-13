/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly REACT_APP_SALT: string
    readonly REACT_APP_SALT_LENGTH: number
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }