import Link from "next/link";

const holidays = [
  ["26 Jan", "Republic Day"],
  ["19 Feb", "Chhatrapati Shivaji Maharaj Jayanti"],
  ["19 Mar", "Gudhi Padwa"],
  ["1 May", "Maharashtra Day"],
  ["15 Aug", "Independence Day"],
  ["14 Sep", "Ganesh Chaturthi"],
  ["2 Oct", "Mahatma Gandhi Jayanti"],
  ["20 Oct", "Dasara"],
  ["10 Nov", "Diwali (Bali Pratipada)"],
  ["24 Nov", "Guru Nanak Jayanti"],
  ["25 Dec", "Christmas"],
];

const days = Array.from({length: 31}, (_, i) => ({
  day: i + 1,
  status: i % 7 === 0 ? "WO" : i % 11 === 0 ? "Leave" : "Present",
}));

export default function AttendancePage() {
  return (
    <main className="ka-page">
      <div className="ka-breadcrumb"><Link href="/">Dashboard</Link><span>/</span> Attendance & Time</div>
      <section className="ka-hero">
        <div>
          <p className="eyebrow">ATT-01 • ATT-02 • ATT-03 • ATT-04 • ATT-05</p>
          <h1>Attendance & Time Management</h1>
          <p>Face IN/OUT, shifts, leave, weekly off, Maharashtra holidays, OT and monthly employee confirmation.</p>
        </div>
        <button className="ka-primary">📸 Start Face Check-in</button>
      </section>

      <section className="ka-grid four">
        <div className="ka-card"><span>Today</span><strong>🟢 Present</strong><small>Face verification ready</small></div>
        <div className="ka-card"><span>Shift</span><strong>09:00 — 17:30</strong><small>General Shift</small></div>
        <div className="ka-card"><span>Working hours</span><strong>8h 42m</strong><small>Verified today</small></div>
        <div className="ka-card"><span>OT</span><strong>18.5h</strong><small>Current month</small></div>
      </section>

      <section className="ka-grid main2">
        <div className="ka-card">
          <div className="ka-card-head"><h2>Attendance Calendar</h2><span className="ka-pill">AUGUST 2026</span></div>
          <div className="calendar">
            {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(x=><b key={x}>{x}</b>)}
            {days.map(d=><div key={d.day} className={`day ${d.status.toLowerCase()}`}><strong>{d.day}</strong><span>{d.status}</span></div>)}
          </div>
          <div className="legend"><span>🟢 Present</span><span>🔴 Absent</span><span>🟠 Leave</span><span>⚪ Weekly Off</span><span>🔵 Govt Holiday</span></div>
        </div>

        <div className="ka-card">
          <div className="ka-card-head"><h2>Face Attendance</h2><span className="ka-pill green">BIOMETRIC READY</span></div>
          <div className="face-box"><div className="face-ring">◉</div><b>Face recognition</b><small>Position your face inside the guide.</small><button className="ka-primary">Open camera</button></div>
          <div className="timeline"><div><b>09:02</b><span>Face IN</span></div><i>→</i><div><b>17:44</b><span>Face OUT</span></div></div>
        </div>
      </section>

      <section className="ka-grid main2">
        <div className="ka-card">
          <div className="ka-card-head"><h2>Maharashtra Holiday Calendar</h2><span className="ka-pill">2026</span></div>
          {holidays.map(([date,name])=><div className="holiday" key={date}><b>{date}</b><span>{name}</span><em>GOVT HOLIDAY</em></div>)}
        </div>
        <div className="ka-card">
          <div className="ka-card-head"><h2>Monthly Finalisation</h2><span className="ka-pill amber">3-DAY WINDOW</span></div>
          <div className="step"><strong>1</strong><div><b>Admin finalises</b><small>Attendance, leave and OT locked for employee review.</small></div></div>
          <div className="step"><strong>2</strong><div><b>Employee checks</b><small>Days worked, OT and leave are presented in the app.</small></div></div>
          <div className="step"><strong>3</strong><div><b>Employee confirms</b><small>Confirmation makes the record payroll-ready.</small></div></div>
          <button className="ka-primary wide">Open employee confirmation</button>
        </div>
      </section>
    </main>
  );
}
