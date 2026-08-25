import type { Config } from 'tailwindcss';
const config: Config = { content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'], theme: { extend: { colors: { ka: { bg:'#040714', panel:'#090f26', border:'#1e294b', cyan:'#00f2fe', muted:'#94a3b8' } } } }, plugins: [] };
export default config;
