/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CIVILIAN_URL: string
  readonly VITE_DEFENSE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 