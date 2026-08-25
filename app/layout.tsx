import './globals.css';
import AppShell from '../components/AppShell';
export const metadata={title:'Kunal Associates Workforce OS',description:'Enterprise workforce command center'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><AppShell>{children}</AppShell></body></html>}
