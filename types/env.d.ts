///<reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_API_BASEURL: string;
  readonly VITE_APP_MOCK_BASEURL: string;
  readonly VITE_APP_USE_MOCK: boolean;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
