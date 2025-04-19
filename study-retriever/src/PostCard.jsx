// src/PostCard.jsx
import { useState } from 'react';
import './Card.css';

function formatTime12Hour(timeString) {
  if (!timeString || !timeString.includes(':')) return '';
  let [h, m] = timeString.split(':');
  let hour = parseInt(h, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12 || 12;
  m = m.padStart(2, '0');
  return `${hour}:${m} ${ampm}`;
}

function formatDate(dateString) {
  if (!dateString) return '';
  const d = new Date(`${dateString}T00:00:00`);
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export default function PostCard({
  courseNumber,
  courseName,
  professor,
  location,
  room,
  date,
  time,
  isHost = false,
  onJoin,
  onDelete,
  participants = [],
  currentUid,
  isParticipant
}) {
  const [hasJoined, setHasJoined] = useState(isParticipant);

  const displayTime = formatTime12Hour(time);
  const displayDate = formatDate(date);

  const handleJoinClick = () => {
    onJoin();
    setHasJoined(prev => !prev);
  };

  return (
    <div className="card">
      <div className="card-header">
        {courseNumber && <span className="course-badge">{courseNumber}</span>}
        <h2 className="course-name">{courseName || 'Unnamed Course'}</h2>
      </div>

      {professor && <p className="professor-name">Prof. {professor}</p>}

      {(location || room) && (
        <p className="location">
          {location} {room && `Room ${room}`}
        </p>
      )}

      <div className="card-footer">
        <span className="time">
          {displayDate || 'Date TBD'} | {displayTime || 'Time TBD'}
        </span>

        {isHost ? (
          <button className="delete-btn" onClick={onDelete}>
            🗑 Delete
          </button>
        ) : (
          <button
            className={hasJoined ? 'joined-btn' : 'join-btn'}
            onClick={handleJoinClick}
            disabled={isParticipant && hasJoined}
          >
            {hasJoined ? 'Joined ✓' : 'Join'}
          </button>
        )}
      </div>
    </div>
  );
}
