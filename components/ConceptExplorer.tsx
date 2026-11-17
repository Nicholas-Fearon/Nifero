"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, BarChart3, CalendarDays, Globe2 } from "lucide-react";

const concepts = [
  { id: "website", label: "Website", project: "The Local", icon: Globe2 },
  { id: "booking", label: "Bookings", project: "Bookwise", icon: CalendarDays },
  { id: "dashboard", label: "Dashboard", project: "Overview", icon: BarChart3 },
] as const;

const times = ["09:00", "10:30", "12:00", "13:30", "15:00", "16:30"];
const activity = {
  current: { label: "This week", values: [3, 6, 4, 8, 5] },
  previous: { label: "Last week", values: [2, 4, 6, 3, 4] },
} as const;

export default function ConceptExplorer() {
  const [active, setActive] = useState<(typeof concepts)[number]["id"]>("website");
  const [showHours, setShowHours] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [period, setPeriod] = useState<keyof typeof activity>("current");
  const project = concepts.find(({ id }) => id === active) ?? concepts[0];
  const week = activity[period];

  return (
    <div className="mx-auto max-w-[1020px]">
      <div className="concept-tabs" role="group" aria-label="Choose a design concept">
        {concepts.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            aria-pressed={active === id}
            aria-controls="concept-preview"
            onClick={() => setActive(id)}
          >
            <Icon size={16} aria-hidden="true" />
            {label}
          </button>
        ))}
      </div>
      <article className="concept-window" id="concept-preview" aria-label={`${project.project} design concept`}>
        <div className="concept-bar">
          <span className="concept-dots" aria-hidden="true"><i /><i /><i /></span>
          <span>{project.project}</span>
          <span className="concept-caption">Design concept</span>
        </div>

        {active === "website" && (
          <div className="cafe-demo">
            <div className="cafe-copy">
              <p className="concept-kicker">Neighbourhood café</p>
              <h3>The Local<span>.</span></h3>
              <p>Coffee, breakfast and somewhere to slow down.</p>
              <button
                type="button"
                className="demo-action"
                aria-expanded={showHours}
                aria-controls="cafe-hours"
                onClick={() => setShowHours(!showHours)}
              >
                {showHours ? "Hide opening hours" : "See opening hours"} <ArrowRight size={15} aria-hidden="true" />
              </button>
              <div className="cafe-hours" id="cafe-hours" hidden={!showHours}>
                <span>Mon–Fri</span> <span>8am–4pm</span>
                <span>Sat–Sun</span> <span>9am–3pm</span>
              </div>
            </div>
            <div className="cafe-photo">
              <Image src="/cafe.webp" alt="A barista working at a softly lit café counter" fill sizes="(max-width: 640px) 100vw, 55vw" priority />
            </div>
          </div>
        )}

        {active === "booking" && (
          <div className="booking-demo">
            <div>
              <p className="concept-kicker">Online appointments</p>
              <h3>Book a consultation</h3>
              <p className="mt-3 text-muted">Choose a time to see how the booking flow responds.</p>
            </div>
            <div className="booking-slots">
              <p className="mb-3 text-sm font-bold">Monday · Example availability</p>
              <div className="grid grid-cols-3 gap-2" role="group" aria-label="Appointment times">
                {times.map((time) => (
                  <button key={time} type="button" aria-pressed={selectedTime === time} onClick={() => setSelectedTime(time)}>
                    {time}
                  </button>
                ))}
              </div>
              <p className="mt-4 min-h-5 text-sm text-muted" role="status">
                {selectedTime ? `${selectedTime} selected for this example.` : "Select an available time."}
              </p>
            </div>
          </div>
        )}

        {active === "dashboard" && (
          <div className="dashboard-demo">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="concept-kicker">Sample enquiry data</p>
                <h3>Enquiry activity</h3>
                <p className="mt-2 text-sm text-muted">{week.values.reduce((total, value) => total + value, 0)} enquiries</p>
              </div>
              <label className="grid gap-1 text-sm font-bold" htmlFor="concept-period">
                Period
                <select id="concept-period" value={period} onChange={(event) => setPeriod(event.target.value as keyof typeof activity)}>
                  <option value="current">This week</option>
                  <option value="previous">Last week</option>
                </select>
              </label>
            </div>
            <div className="enquiry-chart" role="img" aria-label={`${week.label}: ${week.values.join(", ")} enquiries from Monday to Friday`}>
              {week.values.map((value, index) => (
                <div key={index}>
                  <span aria-hidden="true" style={{ height: `${value * 9}px` }} />
                  <small aria-hidden="true">{["Mon", "Tue", "Wed", "Thu", "Fri"][index]}</small>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
