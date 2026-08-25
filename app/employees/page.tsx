import Link from "next/link";

const employees = [
  { id:"KA-000124", name:"Rahul Sharma", client:"Magna Automotive", site:"Chakan MIDC", role:"Production Associate", status:"Active", face:"Verified", pf:"Active", esi:"Active" },
  { id:"KA-000125", name:"Ananya Patil", client:"Grupo Antolin", site:"Chakan", role:"Line Associate", status:"Active", face:"Verified", pf:"Active", esi:"Active" },
  { id:"KA-000126", name:"Suresh Jadhav", client:"Mahindra & Mahindra", site:"Chakan", role:"Quality Associate", status:"Pending", face:"Pending", pf:"Active", esi:"Pending" },
  { id:"KA-000127", name:"Priya More", client:"Tata Motors", site:"Pimpri", role:"Operator", status:"Active", face:"Verified", pf:"Active", esi:"Active" },
];

export default function EmployeesPage(){
  return <main className="ka-page">
    <div className="ka-breadcrumb"><Link href="/">Dashboard</Link><span>/</span> Employee Master</div>

    <section className="ka-hero">
      <div>
        <p className="eyebrow">EMP-01 • EMP-02 • EMP-03 • EMP-04</p>
        <h1>Employee Master</h1>
        <p>Central employee identity, employment, statutory and biometric profile for the Workforce OS.</p>
      </div>
      <button className="ka-primary">＋ Add Employee</button>
    </section>

    <section className="ka-grid four">
      <div className="ka-card"><span>Total Employees</span><strong>1,247</strong><small>Across all active client sites</small></div>
      <div className="ka-card"><span>Face Enrolled</span><strong>1,182</strong><small>94.8% biometric readiness</small></div>
      <div className="ka-card"><span>QR I-Cards</span><strong>1,230</strong><small>17 awaiting generation</small></div>
      <div className="ka-card"><span>Statutory Ready</span><strong>96.1%</strong><small>PF / ESI profile completeness</small></div>
    </section>

    <section className="ka-card">
      <div className="ka-card-head"><h2>Employee Directory</h2><span className="ka-pill">MULTI-SITE</span></div>
      <div className="employee-table">
        <div className="employee-row head"><b>Employee</b><b>Client / Site</b><b>Face</b><b>PF / ESI</b><b>Status</b><b>Action</b></div>
        {employees.map(e=><div className="employee-row" key={e.id}>
          <div><b>{e.name}</b><small>{e.id} • {e.role}</small></div>
          <div><b>{e.client}</b><small>{e.site}</small></div>
          <div><span className={`status-pill ${e.face==="Verified"?"status-present":"status-leave"}`}>{e.face}</span></div>
          <div><span className="status-pill status-present">{e.pf} / {e.esi}</span></div>
          <div><span className={`status-pill ${e.status==="Active"?"status-present":"status-leave"}`}>{e.status}</span></div>
          <div><button className="table-btn">Open profile</button></div>
        </div>)}
      </div>
    </section>

    <section className="ka-grid main2">
      <div className="ka-card">
        <div className="ka-card-head"><h2>Employee Onboarding</h2><span className="ka-pill green">WORKFLOW</span></div>
        {["Personal & contact details","Employment + client deployment","Bank + PF / ESI / PT details","Face enrollment","QR I-Card generation","Joining / Appointment letters"].map((x,i)=>
          <div className="step" key={x}><strong>{i+1}</strong><div><b>{x}</b><small>Required before the employee becomes payroll-ready.</small></div></div>
        )}
      </div>

      <div className="ka-card">
        <div className="ka-card-head"><h2>Biometric Readiness</h2><span className="ka-pill">FACE SDK</span></div>
        <div className="face-box">
          <div className="face-ring">◉</div>
          <b>Employee face enrollment</b>
          <small>Capture and securely associate the employee's biometric template.</small>
          <button className="ka-primary">📸 Start enrollment</button>
        </div>
        <div className="notice-box">Production note: the final identity match must use a secure biometric/face-recognition SDK and encrypted templates; this screen is the enrollment workflow.</div>
      </div>
    </section>

    <section className="ka-card id-card-preview">
      <div className="ka-card-head"><h2>Digital QR Employee I-Card</h2><span className="ka-pill">EMP-01</span></div>
      <div className="id-card">
        <div className="id-top"><div className="id-logo">KA</div><div><b>KUNAL ASSOCIATES</b><small>EMPLOYEE IDENTITY CARD</small></div></div>
        <div className="id-body">
          <div className="id-photo">RS</div>
          <div className="id-details"><b>Rahul Sharma</b><span>KA-000124</span><span>Magna Automotive • Chakan MIDC</span><span>Production Associate</span><em>✓ VERIFIED EMPLOYEE</em></div>
          <div className="qr">▦<small>QR</small></div>
        </div>
        <div className="id-footer">Scan to verify employee identity • Workforce OS</div>
      </div>
      <div className="id-actions"><button className="ka-primary">Generate / Refresh QR</button><button className="table-btn">Preview I-Card</button><button className="table-btn">Print / Export</button></div>
    </section>
  </main>
}
