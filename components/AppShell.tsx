'use client';
import {useState} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {assets,Icon} from './FigmaAsset';

const nav=[
  ['Dashboard','home','/'],['Attendance','calendar','/attendance'],['Payroll','card','#'],['Compliance','shield','#'],['Invoicing','file','#'],
  ['Profile','user','/employees'],['Rewards','star','#'],['Helpdesk','help','#'],['Emergency','alert','#']
] as const;

export default function AppShell({children}:{children:React.ReactNode}){
 const pathname=usePathname(); const [search,setSearch]=useState(''); const [notice,setNotice]=useState('');
 return <div className="min-h-screen bg-[#040714] text-white flex">
  <aside className="fixed inset-y-0 left-0 w-[260px] bg-[#090f26] border-r border-[#1e294b] p-6 flex flex-col gap-8 z-30 max-md:hidden">
   <Link href="/" className="flex gap-3 items-center"><div className="w-10 h-10 rounded-[10px] bg-gradient-to-r from-[#00f2fe] to-[#4f46e5] shadow-[0_4px_6px_rgba(0,242,254,.27)] grid place-items-center font-serif text-2xl">KA</div><div><b className="text-base">KUNAL</b><div className="text-[10px] font-semibold tracking-[2px] text-[#00f2fe]">ASSOCIATES</div></div></Link>
   <nav className="flex-1 flex flex-col gap-2">{nav.map(([name,ico,href])=>{const active=href!=='#'&&(href==='/'?pathname==='/':pathname.startsWith(href)); return href==='#'?<button key={name} onClick={()=>setNotice(`${name} module is queued for the next build slice.`)} className="flex gap-3 items-center px-4 py-3 rounded-lg text-left text-sm text-[#94a3b8] hover:bg-[#111a35]"><Icon src={assets[ico]} /><span className="flex-1">{name}</span></button>:<Link key={name} href={href} className={`flex gap-3 items-center px-4 py-3 rounded-lg text-sm ${active?'bg-[#1e294b] text-white font-semibold':'text-[#94a3b8] hover:bg-[#111a35]'}`}><Icon src={assets[ico]}/><span className="flex-1">{name}</span></Link>})}</nav>
   <div className="bg-[#040714] border border-[#1e294b] p-4 rounded-xl"><div className="flex gap-2 items-center text-[11px] font-semibold text-[#94a3b8]"><span className="w-2 h-2 rounded-full bg-[#10b981]"/>System Health: Live</div><p className="text-[10px] text-[#64748b] mt-2">Face Recognition & GST Auto-filing enabled.</p></div>
  </aside>
  <main className="ml-[260px] max-md:ml-0 w-full"><header className="h-20 bg-[#090f26] border-b border-[#1e294b] px-10 flex items-center justify-between sticky top-0 z-20"><div className="flex gap-4 items-center"><b className="text-xl">Command Center</b><button onClick={()=>setNotice('Kunal Associates HQ selected')} className="bg-[#040714] border border-[#1e294b] px-3 py-1.5 rounded-lg text-xs text-[#00f2fe]">Kunal Associates HQ⌄</button></div><div className="flex gap-6 items-center"><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="⌕  Search operations..." className="w-60 bg-[#040714] border border-[#1e294b] rounded-full px-4 py-2 text-xs outline-none"/><button onClick={()=>setNotice('4 notifications: payroll approval, biometric status, invoice approval and compliance.')} className="relative w-10 h-10 rounded-full bg-[#040714] grid place-items-center"><Icon src={assets.bell} size={20}/><span className="absolute right-0 top-0 w-4 h-4 bg-red-500 rounded-full text-[9px] grid place-items-center">4</span></button><div className="flex gap-3 items-center"><div className="w-10 h-10 rounded-full bg-white border border-[#00f2fe]"/><div><b className="text-sm">Kunal Sharma</b><div className="text-[10px] text-[#00f2fe] bg-[#1e294b] px-1.5 py-0.5 rounded">Admin / HR Manager</div></div></div></div></header>{children}{notice&&<div className="fixed bottom-5 right-5 bg-[#090f26] border border-[#00f2fe] px-5 py-4 rounded-xl shadow-2xl text-sm z-50">{notice}<button onClick={()=>setNotice('')} className="ml-4 text-[#00f2fe]">×</button></div>}</main>
 </div>
}
