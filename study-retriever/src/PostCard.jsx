import './Card.css'; // Make sure this path is correct for your project structure

// --- Helper function to format time ---
function formatTime12Hour(timeString) {
  // Handle cases where time might be missing or invalid
  if (!timeString || typeof timeString !== 'string' || !timeString.includes(':')) {
    // console.warn("Invalid time string provided:", timeString);
    return ''; // Return empty string or a placeholder like 'N/A'
  }

  const [hourString, minute] = timeString.split(':');
  let hour = parseInt(hourString, 10);

  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12;
  hour = hour ? hour : 12; // Convert hour '0' to '12'

  const minutePadded = minute.padStart(2, '0'); // Ensure minutes look like :05, :00 etc.

  return `${hour}:${minutePadded} ${ampm}`; // e.g., "3:30 PM"
}
// --- End of helper function ---

// --- Optional: Helper function to format date ---
function formatDate(dateString) {
    if (!dateString) return ''; // Handle missing date
    // Add time part to avoid potential timezone issues when parsing YYYY-MM-DD
    const dateObj = new Date(dateString + 'T00:00:00');
    return dateObj.toLocaleDateString(undefined, { // Use browser's locale
        year: 'numeric',
        month: 'short', // e.g., 'Apr'
        day: 'numeric'  // e.g., '19'
    });
}
// --- End of date helper ---


const PostCard = ({
  courseNumber,
  courseName,
  professor,
  location,
  room,
  date,
  time,
  isHost = false, // Good practice to have default props
  onJoin,
  onDelete,
}) => {

  // Format the time and date for display
  const displayTime = formatTime12Hour(time);
  const displayDate = formatDate(date);

  return (
    <div className="card">
      <div className="card-header">
        {/* Display course number only if it exists */}
        {courseNumber && <span className="course-badge">{courseNumber}</span>}
        {/* Provide fallback for course name */}
        <h2 className="course-name">{courseName || 'Unnamed Course'}</h2>
      </div>

      {/* Display professor only if provided */}
      {professor && <p className="professor-name">Prof. {professor}</p>}

      {/* Display location details - handle missing parts */}
      {(location || room) && (
        <p className="location">
          {location || ''} {location && room ? ' - ' : ''} {room ? `Room ${room}` : ''}
        </p>
      )}


      <div className="card-footer">
         {/* Use the formatted date and time, provide fallbacks */}
        <span className="time">{displayDate || 'Date TBD'} | {displayTime || 'Time TBD'}</span>

        {isHost ? (
          <button className="delete-btn" onClick={onDelete}>🗑 Delete</button>
        ) : (
          <button className="join-btn" onClick={onJoin}>Join</button>
        )}
      </div>
    </div>
  );
};

export default PostCard;