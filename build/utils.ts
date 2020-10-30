export interface ViteEnv {
  VITE_PORT: number;
  VITE_USE_MOCK: boolean;
  VITE_PUBLIC_PATH: string;
  VITE_PROXY: [string, string][];
}


export function loadEnv(): void {
  const env = process.env.NODE_ENV;
  console.log('----------------'+ env)
}