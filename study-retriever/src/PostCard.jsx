import './Card.css';

const PostCard = ({
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
}) => {
  return (
    <div className="card">
      <div className="card-header">
        <span className="course-badge">{courseNumber}</span>
        <h2 className="course-name">{courseName}</h2>
      </div>

      <p className="professor-name">Prof. {professor}</p>
      <p className="location">{location}, Room {room}</p>

      <div className="card-footer">
        <span className="time">{date} — {time}</span>
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
