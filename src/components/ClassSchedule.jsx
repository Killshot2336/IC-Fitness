import { useState } from 'react';
import FeatureGate from './FeatureGate';
import { FEATURE_REQUIREMENTS } from '../tierConfig';

const INITIAL_CLASSES = [
  { id: 'mon-6-hiit', day: 'Monday', dayKey: 'mon', time: '6:00 AM', name: 'HIIT Blast', instructor: 'Marcus T.', level: 'Advanced', levelClass: 'diff-hard', seats: 15, reserved: false },
  { id: 'mon-12-yoga', day: 'Monday', dayKey: 'mon', time: '12:00 PM', name: 'Yoga Flow', instructor: 'Emily R.', level: 'Beginner', levelClass: 'diff-easy', seats: 15, reserved: false },
  { id: 'tue-530-crossfit', day: 'Tuesday', dayKey: 'tue', time: '5:30 PM', name: 'CrossFit', instructor: 'Jake S.', level: 'Advanced', levelClass: 'diff-hard', seats: 15, reserved: false },
  { id: 'wed-6-spin', day: 'Wednesday', dayKey: 'wed', time: '6:00 AM', name: 'Spin Cycle', instructor: 'Lisa M.', level: 'Intermediate', levelClass: 'diff-medium', seats: 15, reserved: false },
  { id: 'wed-630-strength', day: 'Wednesday', dayKey: 'wed', time: '6:30 PM', name: 'Strength', instructor: 'Marcus T.', level: 'Intermediate', levelClass: 'diff-medium', seats: 15, reserved: false },
  { id: 'thu-530-crossfit', day: 'Thursday', dayKey: 'thu', time: '5:30 PM', name: 'CrossFit', instructor: 'Jake S.', level: 'Advanced', levelClass: 'diff-hard', seats: 15, reserved: false },
  { id: 'fri-6-hiit', day: 'Friday', dayKey: 'fri', time: '6:00 AM', name: 'HIIT Blast', instructor: 'Marcus T.', level: 'Advanced', levelClass: 'diff-hard', seats: 15, reserved: false },
  { id: 'sat-9-yoga', day: 'Saturday', dayKey: 'sat', time: '9:00 AM', name: 'Yoga Flow', instructor: 'Emily R.', level: 'Beginner', levelClass: 'diff-easy', seats: 15, reserved: false },
  { id: 'sat-1030-spin', day: 'Saturday', dayKey: 'sat', time: '10:30 AM', name: 'Spin Cycle', instructor: 'Lisa M.', level: 'Intermediate', levelClass: 'diff-medium', seats: 15, reserved: false },
];

const FILTER_DAYS = [
  { key: 'all', label: 'All Days' },
  { key: 'mon', label: 'Monday' },
  { key: 'tue', label: 'Tuesday' },
  { key: 'wed', label: 'Wednesday' },
  { key: 'thu', label: 'Thursday' },
  { key: 'fri', label: 'Friday' },
  { key: 'sat', label: 'Saturday' },
];

export default function ClassSchedule() {
  const [classes, setClasses] = useState(INITIAL_CLASSES);
  const [dayFilter, setDayFilter] = useState('all');

  const handleReserve = (id) => {
    setClasses((prev) =>
      prev.map((cls) =>
        cls.id === id && !cls.reserved && cls.seats > 0
          ? { ...cls, seats: cls.seats - 1, reserved: true }
          : cls
      )
    );
  };

  const filtered =
    dayFilter === 'all' ? classes : classes.filter((c) => c.dayKey === dayFilter);

  return (
    <FeatureGate requiredTier={FEATURE_REQUIREMENTS.classSchedule}>
      <div className="fade-in visible">
        <h3 className="section-title" style={{ fontSize: '2rem' }}>
          Class Schedule
        </h3>
        <div className="schedule-filters" role="group" aria-label="Filter schedule by day">
          {FILTER_DAYS.map((d) => (
            <button
              key={d.key}
              type="button"
              className={`filter-btn ${dayFilter === d.key ? 'active' : ''}`}
              onClick={() => setDayFilter(d.key)}
            >
              {d.label}
            </button>
          ))}
        </div>
        <div className="schedule-table-wrap">
          <table className="schedule-table" aria-label="Weekly class schedule">
            <thead>
              <tr>
                <th>Day</th>
                <th>Time</th>
                <th>Class</th>
                <th>Instructor</th>
                <th>Level</th>
                <th>Seats</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((cls) => (
                <tr key={cls.id}>
                  <td>{cls.day}</td>
                  <td>{cls.time}</td>
                  <td>{cls.name}</td>
                  <td>{cls.instructor}</td>
                  <td>
                    <span className={`difficulty ${cls.levelClass}`}>{cls.level}</span>
                  </td>
                  <td>
                    <span className="seats-count" aria-live="polite">
                      {cls.seats} left
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className={`btn btn-neon schedule-reserve-btn ${cls.reserved ? 'reserved' : ''}`}
                      disabled={cls.reserved || cls.seats === 0}
                      onClick={() => handleReserve(cls.id)}
                      aria-label={
                        cls.reserved
                          ? `Already reserved ${cls.name}`
                          : `Reserve ${cls.name}`
                      }
                    >
                      {cls.reserved ? 'Reserved' : 'Reserve'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </FeatureGate>
  );
}
