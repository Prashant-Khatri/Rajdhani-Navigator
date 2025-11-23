export default function RouteDisplay({ stops }) {
  return (
    <div className="mt-4 space-y-3">
      {stops.map((stop, i) => (
        <div
          key={i}
          className={`flex items-center justify-between p-3 rounded-lg shadow-sm border-l-8`}
          style={{ borderColor: stop.color }}
        >
          <span className="font-semibold">{stop.station}</span>
        </div>
      ))}
    </div>
  );
}
