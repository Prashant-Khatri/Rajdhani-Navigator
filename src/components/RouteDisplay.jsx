export default function RouteDisplay({ stops }) {
  if (!stops || stops.length === 0) return null;

  return (
    <div className="mt-6 space-y-3">
      {stops.map((s) => (
        <div
          key={s.station}
          className={`p-3 rounded-md flex items-center justify-between ${s.interchange ? 'bg-yellow-50' : 'bg-white'}`}
          style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}
        >
          <div className="flex items-center gap-3">
            <div style={{ width: 14, height: 14, borderRadius: 4, background: s.color }} />
            <div>
              <div className="font-semibold">{s.station}</div>
              <div className="text-sm text-gray-500">{s.lines.join(', ')} Line</div>
            </div>
          </div>

          {s.interchange && (
            <div className="text-sm text-red-600">Interchange</div>
          )}
        </div>
      ))}
    </div>
  );
}
