import Link from "next/link";

const checks = [
  {name:"Mobile OTP", status:"VERIFIED", detail:"Mobile number verified"},
  {name:"Aadhaar", status:"PENDING", detail:"Official verification required"},
  {name:"PAN", status:"PENDING", detail:"Official PAN verification required"},
  {name:"Face", status:"PENDING", detail:"Enroll after identity checks"},
];

export default function IdentityPage(){
 return <main className="ka-page">
   <div className="ka-breadcrumb"><Link href="/">Dashboard</Link><span>/</span><Link href="/employees">Employee Master</Link><span>/</span> Identity Verification</div>
   <section className="ka-hero">
    <div><p className="eyebrow">IDENTITY • AADHAAR • PAN • FACE</p><h1>Identity Verification Centre</h1><p>Secure employee onboarding with consent, document capture, official verification and biometric enrollment.</p></div>
    <span className="ka-pill">DEVELOPMENT MODE</span>
   </section>

   <section className="ka-grid four">
    <div className="ka-card"><span>Mobile</span><strong>🟢 Verified</strong><small>OTP completed</small></div>
    <div className="ka-card"><span>Aadhaar</span><strong>🟠 Pending</strong><small>Official verification</small></div>
    <div className="ka-card"><span>PAN</span><strong>🟠 Pending</strong><small>PAN verification</small></div>
    <div className="ka-card"><span>Face</span><strong>⚪ Locked</strong><small>Unlock after identity checks</small></div>
   </section>

   <section className="ka-grid main2">
    <div className="ka-card">
      <div className="ka-card-head"><h2>Step 1 — Aadhaar</h2><span className="ka-pill">CONSENT REQUIRED</span></div>
      <div className="identity-box">
        <div className="document-icon">🪪</div>
        <div><b>Capture / upload Aadhaar</b><small>OCR can pre-fill employee details. OCR output is not treated as government verification.</small></div>
        <button className="ka-primary">📷 Capture Aadhaar</button>
      </div>
      <div className="form-row">
       <label>Aadhaar reference<input className="form-control" placeholder="XXXX XXXX XXXX" /></label>
       <label>Verification mode<select className="form-control"><option>Authorised e-KYC / Authentication</option><option>Offline e-KYC</option></select></label>
      </div>
      <div className="notice-box">Production integration must use the authorised UIDAI ecosystem and applicable consent/security controls. No Aadhaar OTP, biometric or PID data is stored in this demo.</div>
      <button className="ka-primary wide">Verify Aadhaar</button>
    </div>

    <div className="ka-card">
      <div className="ka-card-head"><h2>Step 2 — PAN</h2><span className="ka-pill">VERIFY</span></div>
      <div className="identity-box">
        <div className="document-icon">💳</div>
        <div><b>PAN verification</b><small>Verify PAN details through the authorised Income Tax verification service.</small></div>
      </div>
      <label>PAN Number<input className="form-control" placeholder="ABCDE1234F" /></label>
      <div className="match-grid"><div><b>Registered name</b><small>Pending</small></div><div><b>DOB</b><small>Pending</small></div><div><b>Gender</b><small>Pending</small></div></div>
      <button className="ka-primary wide">Verify PAN</button>
    </div>
   </section>

   <section className="ka-card">
    <div className="ka-card-head"><h2>Step 3 — Identity Match</h2><span className="ka-pill amber">WAITING</span></div>
    <div className="match-grid large">
      <div><b>Employee Name</b><strong>Kunal Associates Employee</strong><small>From employee master</small></div>
      <div><b>Aadhaar Name</b><strong>—</strong><small>Awaiting official verification</small></div>
      <div><b>PAN Name</b><strong>—</strong><small>Awaiting PAN verification</small></div>
      <div><b>Match Result</b><strong>⏳ Pending</strong><small>Name / DOB consistency check</small></div>
    </div>
   </section>

   <section className="ka-grid main2">
    <div className="ka-card locked-face">
      <div className="ka-card-head"><h2>Step 4 — Face Enrollment</h2><span className="ka-pill">LOCKED</span></div>
      <div className="face-box"><div className="face-ring">◉</div><b>Identity verification required</b><small>Face enrollment unlocks after the configured identity checks pass.</small><button className="ka-primary" disabled>📸 Start face enrollment</button></div>
    </div>
    <div className="ka-card">
      <div className="ka-card-head"><h2>Verification Status</h2><span className="ka-pill">4 CHECKS</span></div>
      {checks.map(c=><div className="verify-row" key={c.name}><span className="verify-icon">{c.status==="VERIFIED"?"✓":c.status==="PENDING"?"!":"○"}</span><div><b>{c.name}</b><small>{c.detail}</small></div><em className={c.status.toLowerCase()}>{c.status}</em></div>)}
      <button className="ka-primary wide">Continue to Employee Profile</button>
    </div>
   </section>

   <section className="ka-card security-card">
    <h2>🔐 Data Protection</h2>
    <p>Government verification credentials and secrets belong on the backend. The browser/mobile app should never contain production API credentials. Authentication material and biometric/PID data must be handled according to the applicable government and service-provider requirements.</p>
   </section>
 </main>
}
