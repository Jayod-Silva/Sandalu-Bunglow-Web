import React, { useMemo, useState, useEffect } from "react";

export default function BookingSearchComponent() {
  const initialCheckIn = new Date(2025, 9, 17);
  const [location, setLocation] = useState("Thissamaharama Unit 1");
  const [checkIn] = useState<Date>(initialCheckIn);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState({ adults: 2, children: 0, rooms: 1 });
  const [displayMonth, setDisplayMonth] = useState<Date>(new Date(2025, 9, 1));
  const [tab, setTab] = useState<"calendar" | "flexible">("calendar");
  const [travelForWork, setTravelForWork] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (showPopup) {
      setProgress(100);
      const interval = setInterval(() => {
        setProgress((p) => p - 2.5);
      }, 100);
      const timeout = setTimeout(() => setShowPopup(false), 4000);
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [showPopup]);

  const addDays = (d: Date, days: number) => {
    const x = new Date(d);
    x.setDate(x.getDate() + days);
    return x;
  };

  const formatShort = (d: Date) => d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });

  const monthGrid = (year: number, month: number) => {
    const first = new Date(year, month, 1);
    const last = new Date(year, month + 1, 0);
    const padBefore = (first.getDay() + 6) % 7;
    const total = padBefore + last.getDate();
    const rows = Math.ceil(total / 7);
    const cells: (Date | null)[] = [];
    for (let i = 0; i < rows * 7; i++) {
      const dayNum = i - padBefore + 1;
      if (dayNum < 1 || dayNum > last.getDate()) cells.push(null);
      else cells.push(new Date(year, month, dayNum));
    }
    return cells;
  };

  const isSameDay = (a: Date | null, b: Date | null) => {
    if (!a || !b) return false;
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  };

  const applyRelative = (days: number) => {
    setCheckOut(addDays(checkIn, days));
  };

  const handleBooking = () => {
    setShowPopup(true);
  };

  const monthPair = useMemo(() => {
    const m1 = new Date(displayMonth.getFullYear(), displayMonth.getMonth(), 1);
    const m2 = new Date(displayMonth.getFullYear(), displayMonth.getMonth() + 1, 1);
    return [m1, m2];
  }, [displayMonth]);

  return (
    <div className="min-h-100 bg-gray-900 flex items-start justify-center py-10 relative">
      <div className="w-full max-w-6xl">
        {/* Search Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-md border border-orange-100/80 relative">
          <form className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1 flex items-center divide-x divide-orange-100/60 rounded-lg overflow-hidden border border-orange-50 shadow-sm">
              {/* Location Dropdown */}
              <label className="flex items-center gap-3 px-4 py-3 flex-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18v8H3z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7v6" />
                </svg>
                <select value={location} onChange={(e) => setLocation(e.target.value)} className="w-full bg-transparent outline-none text-sm text-gray-700">
                  <option>Thissamaharama Unit 1</option>
                  <option>Thissamaharama Unit 2</option>
                  <option>Nuwara Eliya</option>
                  <option>Kithulgala</option>
                </select>
              </label>

              {/* Date */}
              <label className="flex items-center gap-3 px-4 py-3 flex-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div className="flex flex-col w-full text-sm text-gray-600">{formatShort(checkIn)} – {checkOut ? formatShort(checkOut) : 'Check-out'}</div>
              </label>

              {/* Guests */}
              <label className="flex items-center gap-3 px-4 py-3 flex-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A4 4 0 018 15h8a4 4 0 012.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <span>Adults:</span>
                    <input type="number" min={1} className="w-12 border rounded px-1 text-center" value={guests.adults} onChange={(e) => setGuests({ ...guests, adults: Number(e.target.value) })} />
                  </div>
                  <div className="flex items-center gap-1">
                    <span>Children:</span>
                    <input type="number" min={0} className="w-12 border rounded px-1 text-center" value={guests.children} onChange={(e) => setGuests({ ...guests, children: Number(e.target.value) })} />
                  </div>
                  <div className="flex items-center gap-1">
                    <span>Rooms:</span>
                    <input type="number" min={1} className="w-12 border rounded px-1 text-center" value={guests.rooms} onChange={(e) => setGuests({ ...guests, rooms: Number(e.target.value) })} />
                  </div>
                </div>
              </label>

              {/* Book Button */}
              <div className="px-4 py-3">
                <button type="button" onClick={handleBooking} className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full shadow-sm">Book</button>
              </div>
            </div>
          </form>
        </div>

        {/* Success Popup */}
        {showPopup && (
          <div className="absolute right-10 top-10 bg-orange-100 border border-orange-300 text-orange-800 px-4 py-3 rounded-lg shadow-md w-72">
            <div className="font-semibold mb-1">Booking Successful!</div>
            <div className="text-sm">Your bungalow booking has been confirmed.</div>
            <div className="mt-2 h-1 bg-orange-300 rounded-full overflow-hidden">
              <div className="h-full bg-orange-500 transition-all duration-100 ease-linear" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        )}

        {/* Calendar area */}
        <div className="max-w-3xl mt-4 bg-white rounded-2xl p-4 shadow-md border border-orange-100/8 ml-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button onClick={() => setTab('calendar')} className={`px-3 pb-2 ${tab === 'calendar' ? 'border-b-2 border-blue-500 text-gray-900' : 'text-gray-500'}`}>Calendar</button>
              <button onClick={() => setTab('flexible')} className={`px-3 pb-2 rounded ${tab === 'flexible' ? 'bg-gray-100 text-gray-900' : 'text-gray-500'}`}>I'm flexible</button>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setDisplayMonth(new Date(displayMonth.getFullYear(), displayMonth.getMonth() - 1, 1))} aria-label="Previous month" className="p-2 rounded hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.293 15.707a1 1 0 01-1.414 0L6.172 11l4.707-4.707a1 1 0 011.414 1.414L9.414 11l2.879 2.879a1 1 0 010 1.414z" clipRule="evenodd" /></svg>
              </button>
              <button onClick={() => setDisplayMonth(new Date(displayMonth.getFullYear(), displayMonth.getMonth() + 1, 1))} aria-label="Next month" className="p-2 rounded hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.707 4.293a1 1 0 010 1.414L4.414 9l3.293 3.293a1 1 0 01-1.414 1.414L2 9.707 6.293 5.414a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </button>
            </div>
          </div>

          {/* Two-month calendars side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {monthPair.map((m, idx) => {
              const cells = monthGrid(m.getFullYear(), m.getMonth());
              return (
                <div key={idx} className="bg-white rounded-lg p-3 border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-lg font-semibold">{m.toLocaleString(undefined, { month: 'long', year: 'numeric' })}</div>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-xs text-gray-500 mb-2">
                    {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => (
                      <div key={d} className="text-center font-medium">{d}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {cells.map((d, i) => {
                      const isCheckIn = isSameDay(d, checkIn);
                      const isCheckOut = isSameDay(d, checkOut);
                      const isInRange = d && checkOut && d >= checkIn && d <= checkOut;
                      return (
                        <button
                          key={i}
                          onClick={() => {
                            if (!d) return;
                            if (d > checkIn) setCheckOut(d);
                            else if (isSameDay(d, checkIn)) setCheckOut(null);
                            else setCheckOut(null);
                          }}
                          className={`h-10 flex items-center justify-center rounded-md text-sm ${d ? 'hover:bg-gray-100' : ''} ${isCheckIn ? 'bg-orange-500 text-white' : ''} ${isCheckOut ? 'ring-2 ring-orange-300' : ''} ${isInRange && !isCheckIn ? 'bg-orange-100' : ''} ${!d ? 'opacity-30 pointer-events-none' : ''}`}
                        >
                          {d ? d.getDate() : ''}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom quick buttons */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={() => setCheckOut(null)} className="px-3 py-1 rounded-full border border-gray-200">Exact dates</button>
            <button onClick={() => applyRelative(1)} className="px-3 py-1 rounded-full border border-gray-200">+1 day</button>
            <button onClick={() => applyRelative(2)} className="px-3 py-1 rounded-full border border-gray-200">+2 days</button>
            <button onClick={() => applyRelative(3)} className="px-3 py-1 rounded-full border border-gray-200">+3 days</button>
            <button onClick={() => applyRelative(7)} className="px-3 py-1 rounded-full border border-gray-200">+7 days</button>
          </div>
        </div>
      </div>
    </div>
  );
}
