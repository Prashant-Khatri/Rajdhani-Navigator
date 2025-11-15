'use client';
import { useState } from 'react';
import metroData from '../data/delhiMetro.json';
import { formatRouteWithColors } from '../utils/formatRoute';
import RouteDisplay from '../components/RouteDisplay';

export default function Page() {
  const stations = Object.keys(metroData).sort();
  const [source, setSource] = useState('');
  const [dest, setDest] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    setError(null);
    setResult(null);

    if (!source || !dest) {
      setError('Select both source and destination');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ start: source, end: dest }),
      });

      const data = await res.json();
      if (data.error) {
        setError(data.error);
        setLoading(false);
        return;
      }

      const path = data.path;
      const stops = formatRouteWithColors(path, metroData);
      setResult({
        path,
        stops,
        totalStations: path.length - 1,
        interchanges: stops.filter(s => s.interchange).map(s => s.station),
      });
    } catch (e) {
      setError('Failed to fetch route: ' + e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Rajdhani Navigator — Delhi Metro Route Finder</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <select className="col-span-1 p-3 border rounded" value={source} onChange={(e) => setSource(e.target.value)}>
            <option value="">Select Source</option>
            {stations.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          <select className="col-span-1 p-3 border rounded" value={dest} onChange={(e) => setDest(e.target.value)}>
            <option value="">Select Destination</option>
            {stations.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          <button className="col-span-1 bg-blue-600 text-white rounded p-3" onClick={handleSearch} disabled={loading}>
            {loading ? 'Searching...' : 'Find Route'}
          </button>
        </div>

        {error && <div className="mt-4 text-red-600">{error}</div>}

        {result && !result.error && (
          <div className="mt-6 p-4 border rounded bg-gray-50">
            <div className="text-sm text-gray-600">Total stations: {result.totalStations}</div>

            <RouteDisplay stops={result.stops} />

            {result.interchanges.length > 0 && (
              <div className="mt-4 text-yellow-800">Interchanges: {result.interchanges.join(', ')}</div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
