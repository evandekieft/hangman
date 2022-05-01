export default function Winstreak({ winStreak }) {
  return (
    <div className="winStreak-container">
      <div className="winStreak-box">
        <p>{winStreak}</p>
      </div>
      <div className="winStreak-title">Wins</div>
    </div>
  );
}
