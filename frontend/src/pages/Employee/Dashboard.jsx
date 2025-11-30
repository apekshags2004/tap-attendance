// attendance-frontend/src/pages/Employee/Dashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import { DayPicker } from "react-day-picker";
import 'react-day-picker/dist/style.css';
import "./dashboard-calendar.css";
// near top of render return
<div className="d-flex align-items-center mb-3">
  <img src="/tap-attendance-logo.png" alt="TAP Attendance" style={{height:50, marginRight:12}} />
  <h1 className="h4 mb-0">My Dashboard</h1>
</div>
export default function Dashboard() {
  const [summary, setSummary] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    present: 0,
    absent: 0,
    late: 0,
    totalDays: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [selected, setSelected] = useState(new Date());
  const [downloading, setDownloading] = useState(false);

  const fetchSummary = async (year, month) => {
    try {
      setLoading(true);
      const res = await axios.get("/attendance/summary", { params: { year, month } });
      setSummary((s) => ({ ...s, ...res.data }));
      setError("");
    } catch (err) {
      console.error("Summary fetch error:", err);
      setError("Could not load summary. Try logging in again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await axios.get("/attendance/my-history");
      setHistory(res.data || []);
    } catch (err) {
      console.error("History fetch error:", err);
    }
  };

  useEffect(() => {
    const y = new Date().getFullYear();
    const m = new Date().getMonth() + 1;
    fetchSummary(y, m);
    fetchHistory();
  }, []);

  // convert history to sets and map by ISO date
  const presentDates = new Set();
  const absentDates = new Set();
  const historyByIso = {};
  history.forEach(r => {
    const iso = (r.date || '').slice(0,10);
    if (!iso) return;
    historyByIso[iso] = r;
    if (r.status === 'Present') presentDates.add(new Date(iso));
    else if (r.status === 'Absent') absentDates.add(new Date(iso));
  });

  const modifiers = {
    present: [...presentDates],
    absent: [...absentDates],
  };

  const selectedIso = selected.toISOString().slice(0,10);
  const selectedRecord = historyByIso[selectedIso];

  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  // ---------- CSV Download function (uses axios instance) ----------
  const downloadCSV = async () => {
    try {
      setDownloading(true);
const pad = n => n.toString().padStart(2, '0');
const date = `${selected.getFullYear()}-${pad(selected.getMonth()+1)}-${pad(selected.getDate())}`;

      // NOTE:
      // - This assumes your axiosInstance baseURL is set to '/api' or 'http://localhost:5000/api'.
      // - The route added in server.js is: GET /api/export/attendance
      // So calling axios.get('/export/attendance') will resolve to '/api/export/attendance'.
      const res = await axios.get(`/export/attendance?date=${date}`, {
        responseType: 'blob'
      });

      const blob = new Blob([res.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `attendance-${date}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Export error', err);
      // basic user feedback
      alert('Export failed. Check console for details.');
    } finally {
      setDownloading(false);
    }
  };
  // ----------------------------------------------------------------

  return (
    <div className="container mt-4">
      <h2>My Dashboard</h2>

      <div className="mb-3">
        <button onClick={downloadCSV} className="btn btn-primary" disabled={downloading}>
          {downloading ? 'Downloading...' : 'Export CSV'}
        </button>
      </div>

      <div className="card my-3 p-3">
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <h5 className="mb-0">Monthly Summary</h5>
            <small className="text-muted">{monthNames[summary.month - 1]} {summary.year}</small>
          </div>
          <div>
            <button className="btn btn-sm btn-outline-secondary"
              onClick={() => { fetchSummary(summary.year, summary.month); fetchHistory(); }}>
              Refresh
            </button>
          </div>
        </div>

        <hr />

        {loading ? (
          <div className="text-center my-4">Loading summary…</div>
        ) : error ? (
          <div className="alert alert-danger my-2">{error}</div>
        ) : (
          <div className="row">
            <div className="col-md-6">
              <div className="row text-center">
                <div className="col-6 mb-3">
                  <div className="card p-3">
                    <h6 className="text-muted">Present</h6>
                    <div className="display-6">{summary.present}</div>
                  </div>
                </div>

                <div className="col-6 mb-3">
                  <div className="card p-3">
                    <h6 className="text-muted">Absent</h6>
                    <div className="display-6">{summary.absent}</div>
                  </div>
                </div>

                <div className="col-6 mb-3">
                  <div className="card p-3">
                    <h6 className="text-muted">Late</h6>
                    <div className="display-6">{summary.late}</div>
                  </div>
                </div>

                <div className="col-6 mb-3">
                  <div className="card p-3">
                    <h6 className="text-muted">Total Days</h6>
                    <div className="display-6">{summary.totalDays}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card p-3">
                <h6>Attendance Calendar</h6>

                <DayPicker
                  mode="single"
                  selected={selected}
                  onSelect={(d) => d && setSelected(d)}
                  modifiers={modifiers}
                  modifiersClassNames={{
                    present: 'rdp-present',
                    absent: 'rdp-absent'
                  }}
                />

                <div className="mt-2">
                  <strong>{selectedIso}</strong>
                  {selectedRecord ? (
                    <div>
                      <div>Check-in: {selectedRecord.checkInTime || '-'}</div>
                      <div>Check-out: {selectedRecord.checkOutTime || '-'}</div>
                      <div>Status: {selectedRecord.status || '-'}</div>
                    </div>
                  ) : (
                    <div className="text-muted">No record for this date</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="card p-3">
        <h5>Quick actions</h5>
        <div className="d-flex gap-2 mt-2">
          <a className="btn btn-primary" href="/mark-attendance">Go to Mark Attendance</a>
          <a className="btn btn-outline-primary" href="/my-history">View My History</a>
        </div>
      </div>
    </div>
  );
}
