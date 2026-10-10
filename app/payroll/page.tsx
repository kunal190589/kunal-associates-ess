"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import * as XLSX from "xlsx";

type Row = Record<string, string | number | boolean | null | undefined>;
type FieldKey = "employee" | "employeeId" | "days" | "basic" | "allowances" | "deductions";

const fieldLabels: Record<FieldKey, string> = {
  employee: "Employee name",
  employeeId: "Employee ID / UAN",
  days: "Paid days",
  basic: "Basic wages",
  allowances: "Allowances / other earnings",
  deductions: "Total deductions",
};
const aliases: Record<FieldKey, string[]> = {
  employee: ["employee name", "name", "employee", "worker name", "associate name"],
  employeeId: ["employee id", "emp id", "uan", "employee code", "code"],
  days: ["paid days", "days paid", "present days", "payable days", "no of days", "days"],
  basic: ["basic", "basic wages", "basic salary", "basic pay"],
  allowances: ["allowances", "other earnings", "gross allowance", "hra", "earnings"],
  deductions: ["deductions", "total deductions", "deduction", "total deduction"],
};
const numberOf = (value: unknown) => {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  const parsed = Number(String(value ?? "").replace(/[₹,\s]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
};
const money = (value: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(value);

export default function PayrollPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [mapping, setMapping] = useState<Record<FieldKey, string>>({ employee: "", employeeId: "", days: "", basic: "", allowances: "", deductions: "" });
  const [fileName, setFileName] = useState("");
  const [message, setMessage] = useState("");
  const [period, setPeriod] = useState("September 2026");

  async function importFile(file?: File) {
    if (!file) return;
    try {
      const bytes = await file.arrayBuffer();
      const workbook = XLSX.read(bytes, { type: "array", cellDates: false });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const parsed = XLSX.utils.sheet_to_json<Row>(sheet, { defval: "" });
      if (!parsed.length) { setMessage("This sheet is empty or has no header row."); return; }
      const headers = Object.keys(parsed[0]);
      const normalized: Record<FieldKey, string> = { employee: "", employeeId: "", days: "", basic: "", allowances: "", deductions: "" };
      (Object.keys(aliases) as FieldKey[]).forEach((key) => {
        normalized[key] = headers.find((header) => aliases[key].includes(header.toLowerCase().trim())) ?? "";
      });
      setRows(parsed);
      setColumns(headers);
      setMapping(normalized);
      setFileName(file.name);
      setMessage(`Imported ${parsed.length} rows from the first worksheet. Review the column mapping before using the preview.`);
    } catch {
      setMessage("Could not read this file. Please use a valid .xlsx, .xls or .csv file.");
    }
  }

  const processed = useMemo(() => rows.map((row, index) => {
    const basic = numberOf(mapping.basic ? row[mapping.basic] : 0);
    const allowances = numberOf(mapping.allowances ? row[mapping.allowances] : 0);
    const deductions = numberOf(mapping.deductions ? row[mapping.deductions] : 0);
    return {
      key: String(row[mapping.employeeId] || row[mapping.employee] || index + 1),
      employee: String(row[mapping.employee] || "—"),
      employeeId: String(row[mapping.employeeId] || "—"),
      days: mapping.days ? numberOf(row[mapping.days]) : 0,
      basic, allowances, deductions,
      gross: basic + allowances,
      net: basic + allowances - deductions,
    };
  }), [rows, mapping]);

  const totals = useMemo(() => processed.reduce((sum, row) => ({
    gross: sum.gross + row.gross, deductions: sum.deductions + row.deductions, net: sum.net + row.net,
  }), { gross: 0, deductions: 0, net: 0 }), [processed]);

  function exportCsv() {
    if (!processed.length) { setMessage("Import a wages sheet first."); return; }
    const data = processed.map((r) => ({
      "Employee Name": r.employee, "Employee ID / UAN": r.employeeId, "Paid Days": r.days,
      "Basic Wages": r.basic, "Allowances": r.allowances, "Gross Earnings": r.gross,
      "Total Deductions": r.deductions, "Net Wages": r.net,
    }));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(data), "Payroll Preview");
    XLSX.writeFile(workbook, `KCS_Payroll_${period.replace(/[^a-z0-9]+/gi, "_")}.xlsx`);
    setMessage("Payroll preview exported. This does not submit payroll or trigger salary payments.");
  }

  return <main className="ka-page">
    <div className="ka-breadcrumb"><Link href="/">Dashboard</Link><span>/</span> Payroll & Excel Import</div>
    <section className="ka-hero">
      <div>
        <p className="eyebrow">PAY-01 • PAY-02 • PAY-03</p>
        <h1>Payroll & Excel Import</h1>
        <p>Import client wages sheets, map columns, validate payroll totals and export a review-ready payroll workbook.</p>
      </div>
      <button className="ka-primary" onClick={exportCsv} disabled={!processed.length}>↓ Export payroll preview</button>
    </section>

    <section className="ka-grid four">
      <div className="ka-card"><span>Imported employees</span><strong>{processed.length.toLocaleString("en-IN")}</strong><small>{fileName || "No wages sheet selected"}</small></div>
      <div className="ka-card"><span>Gross earnings</span><strong>{money(totals.gross)}</strong><small>Based on mapped earnings columns</small></div>
      <div className="ka-card"><span>Total deductions</span><strong>{money(totals.deductions)}</strong><small>Mapped deductions only</small></div>
      <div className="ka-card"><span>Net wages preview</span><strong>{money(totals.net)}</strong><small>Gross earnings less deductions</small></div>
    </section>

    <section className="ka-grid main2">
      <div className="ka-card">
        <div className="ka-card-head"><h2>1. Import wages sheet</h2><span className="ka-pill">XLSX / XLS / CSV</span></div>
        <label htmlFor="payroll-file" className="block rounded-xl border-2 border-dashed border-[#334155] bg-[#070c1d] p-8 text-center cursor-pointer hover:border-[#00f2fe]">
          <span className="block text-3xl mb-3">⇧</span>
          <b className="block">Choose an Excel or CSV file</b>
          <small className="block text-[#94a3b8] mt-2">Reads the first worksheet. Your file is processed in this browser.</small>
          <span className="inline-block mt-4 rounded-lg border border-[#334155] px-4 py-2 text-sm">Browse files</span>
          <input id="payroll-file" type="file" accept=".xlsx,.xls,.csv" className="hidden" onChange={(event) => importFile(event.target.files?.[0])} />
        </label>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <label className="text-sm text-[#94a3b8]" htmlFor="period">Payroll period</label>
          <input id="period" value={period} onChange={(e) => setPeriod(e.target.value)} className="rounded-lg bg-[#040714] border border-[#1e294b] px-3 py-2 text-sm" />
        </div>
        {message && <p role="status" className="mt-4 rounded-lg border border-[#1e294b] bg-[#040714] p-3 text-sm text-[#cbd5e1]">{message}</p>}
      </div>
      <div className="ka-card">
        <div className="ka-card-head"><h2>2. Map spreadsheet columns</h2><span className="ka-pill amber">REVIEW REQUIRED</span></div>
        <p className="text-sm text-[#94a3b8] mb-4">We’ll suggest matches based on header names. Check every field before exporting.</p>
        <div className="grid grid-cols-1 gap-3">
          {(Object.keys(fieldLabels) as FieldKey[]).map((field) => <label key={field} className="grid grid-cols-[minmax(120px,1fr)_minmax(140px,1.2fr)] gap-3 items-center text-sm">
            <span>{fieldLabels[field]}</span>
            <select value={mapping[field]} onChange={(e) => setMapping((prev) => ({ ...prev, [field]: e.target.value }))} className="min-w-0 rounded-lg bg-[#040714] border border-[#1e294b] px-3 py-2 text-[#e2e8f0]">
              <option value="">Not mapped</option>
              {columns.map((column) => <option key={column} value={column}>{column}</option>)}
            </select>
          </label>)}
        </div>
        <div className="notice-box mt-5">This is a payroll preview, not statutory validation. PF, ESI, PT, TDS, overtime, wage ceilings and client-specific rules must be checked before approval.</div>
      </div>
    </section>

    <section className="ka-card">
      <div className="ka-card-head"><h2>3. Payroll preview</h2><span className="ka-pill">{period || "Select period"}</span></div>
      {!processed.length ? <div className="py-12 text-center text-[#94a3b8]"><div className="text-3xl mb-3">▤</div><b className="block text-white">No payroll data imported</b><span className="text-sm">Choose a wages sheet to preview mapped employee earnings and deductions.</span></div> :
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead><tr className="border-b border-[#1e294b] text-[#94a3b8]">
              {["Employee / ID","Paid days","Basic wages","Allowances","Gross earnings","Deductions","Net wages"].map((label) => <th key={label} className="px-3 py-4 font-semibold">{label}</th>)}
            </tr></thead>
            <tbody>{processed.map((row, index) => <tr key={row.key + index} className="border-b border-[#111a35] hover:bg-[#0b1530]">
              <td className="px-3 py-3"><b>{row.employee}</b><small className="block text-[#64748b]">{row.employeeId}</small></td>
              <td className="px-3 py-3">{row.days || "—"}</td>
              <td className="px-3 py-3">{money(row.basic)}</td>
              <td className="px-3 py-3">{money(row.allowances)}</td>
              <td className="px-3 py-3">{money(row.gross)}</td>
              <td className="px-3 py-3 text-amber-300">{money(row.deductions)}</td>
              <td className="px-3 py-3 font-bold text-emerald-300">{money(row.net)}</td>
            </tr>)}</tbody>
            <tfoot><tr className="bg-[#0b1530] font-bold"><td className="px-3 py-4">TOTAL · {processed.length} employees</td><td /><td /><td /><td className="px-3 py-4">{money(totals.gross)}</td><td className="px-3 py-4">{money(totals.deductions)}</td><td className="px-3 py-4 text-emerald-300">{money(totals.net)}</td></tr></tfoot>
          </table>
        </div>}
    </section>
    <p className="text-xs text-[#64748b] px-1">Safety note: imported data is held in page memory only and is not saved to Supabase or sent to a payment provider. Refreshing the page clears this preview.</p>
  </main>;
}
