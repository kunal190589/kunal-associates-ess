'use client';
import {useState} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

const nav=[
  ['Dashboard','⌂','/'],['Attendance','◷','/attendance'],['Payroll','₹','/payroll'],['Compliance','✓','#'],['Invoicing','▤','#'],
  ['Profile','○','/employees'],['Rewards','☆','#'],['Helpdesk','?','#'],['Emergency','!','#']
] as const;

export default function AppShell({children}:{children:React.ReactNode}){
 const pathname=usePathname(); const [search,setSearch]=useState(''); const [notice,setNotice]=useState('');
 return <div className="min-h-screen bg-[#040714] text-white flex">
  <aside className="fixed inset-y-0 left-0 w-[248px] bg-[#090f26] border-r border-[#1e294b] px-4 py-6 flex flex-col gap-7 z-30 max-md:hidden overflow-y-auto">
   <Link href="/" className="flex gap-3 items-center min-w-0 px-2"><div className="w-10 h-10 shrink-0 rounded-[10px] bg-gradient-to-r from-[#00f2fe] to-[#4f46e5] shadow-[0_4px_6px_rgba(0,242,254,.27)] grid place-items-center font-serif text-2xl">KA</div><div className="min-w-0"><b className="text-base">KUNAL</b><div className="text-[10px] font-semibold tracking-[2px] text-[#00f2fe]">ASSOCIATES</div></div></Link>
   <nav aria-label="Main navigation" className="flex-1 flex flex-col gap-1.5 min-w-0">{nav.map(([name,ico,href])=>{const active=href!=='#'&&(href==='/'?pathname==='/':pathname.startsWith(href)); return href==='#'?<button key={name} onClick={()=>setNotice(`${name} module is queued for the next build slice.`)} title={name} className="w-full min-w-0 flex gap-3 items-center px-3 py-3 rounded-lg text-left text-sm text-[#b7c4d8] hover:bg-[#111a35]"><span aria-hidden="true" className="w-5 shrink-0 text-center text-lg leading-none text-[#00dff5]">{ico}</span><span className="flex-1 min-w-0 whitespace-normal break-words leading-5">{name}</span></button>:<Link key={name} href={href} title={name} className={`w-full min-w-0 flex gap-3 items-center px-3 py-3 rounded-lg text-sm ${active?'bg-[#1e294b] text-white font-semibold':'text-[#b7c4d8] hover:bg-[#111a35]'}`}><span aria-hidden="true" className="w-5 shrink-0 text-center text-lg leading-none text-[#00dff5]">{ico}</span><span className="flex-1 min-w-0 whitespace-normal break-words leading-5">{name}</span></Link>})}</nav>
   <div className="bg-[#040714] border border-[#1e294b] p-3 rounded-xl"><div className="flex gap-2 items-center text-[11px] font-semibold text-[#b7c4d8]"><span className="w-2 h-2 shrink-0 rounded-full bg-[#10b981]"/>System Health: Live</div><p className="text-[10px] text-[#94a3b8] mt-2 leading-4">Face Recognition & GST Auto-filing enabled.</p></div>
  </aside>
  <main className="ml-[248px] max-md:ml-0 w-full min-w-0">
   <header className="min-h-20 bg-[#090f26] border-b border-[#1e294b] px-5 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-20">
    <div className="flex flex-wrap gap-3 items-center min-w-0"><b className="text-lg sm:text-xl whitespace-nowrap">Command Center</b><button onClick={()=>setNotice('Kunal Associates HQ selected')} className="bg-[#040714] border border-[#1e294b] px-3 py-2 rounded-lg text-xs text-[#00f2fe] whitespace-nowrap">Kunal Associates HQ⌄</button></div>
    <div className="flex flex-wrap gap-3 items-center min-w-0">
     <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="⌕  Search operations..." aria-label="Search operations" className="w-36 sm:w-48 lg:w-60 min-w-0 bg-[#040714] border border-[#1e294b] rounded-full px-4 py-2 text-xs outline-none"/>
     <button onClick={()=>setNotice('4 notifications: payroll approval, biometric status, invoice approval and compliance.')} aria-label="Notifications" className="relative w-9 h-9 shrink-0 rounded-full bg-[#040714] grid place-items-center text-lg">♧<span className="absolute right-0 top-0 w-4 h-4 bg-red-500 rounded-full text-[9px] grid place-items-center">4</span></button>
     <div className="flex gap-2 items-center min-w-0"><div className="w-9 h-9 shrink-0 rounded-full bg-white border border-[#00f2fe]"/><div className="min-w-0"><b className="text-sm whitespace-nowrap">Kunal Sharma</b><div className="text-[10px] text-[#00f2fe] bg-[#1e294b] px-1.5 py-1 rounded whitespace-nowrap">Admin / HR Manager</div></div></div>
    </div>
   </header>
   {children}
   {notice&&<div role="status" className="fixed bottom-5 right-5 max-w-[calc(100vw-2rem)] bg-[#090f26] border border-[#00f2fe] px-5 py-4 rounded-xl shadow-2xl text-sm z-50">{notice}<button onClick={()=>setNotice('')} aria-label="Dismiss notification" className="ml-4 text-[#00f2fe]">×</button></div>}
  </main>
 </div>
}
