// src/app/page.jsx
'use client';
import { useState } from 'react';
import metroData from '../data/delhiMetro.json';
import { formatRouteWithColors } from '@/utils/formatRoute';
import RouteDisplay from '@/components/RouteDisplay';
import Navbar from '@/components/Navbar';
import AutocompleteInput from '@/components/AutocompleteInput';

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
      setError('Please select both source and destination');
      return;
    }

    if (!stations.includes(source)) {
      setError('Invalid source station');
      return;
    }

    if (!stations.includes(dest)) {
      setError('Invalid destination station');
      return;
    }

    if (source === dest) {
      setError('Source and destination cannot be the same');
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
        totalStations: path.length - 1
      });
    } catch (e) {
      setError('Failed to fetch route: ' + e.message);
    } finally {
      setLoading(false);
    }
  }

  const handleSwap = () => {
    const temp = source;
    setSource(dest);
    setDest(temp);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Find Your Route</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <AutocompleteInput
                value={source}
                onChange={setSource}
                options={stations}
                placeholder="Enter source station"
                label="Source Station"
              />

              <AutocompleteInput
                value={dest}
                onChange={setDest}
                options={stations}
                placeholder="Enter destination station"
                label="Destination Station"
              />
            </div>

            <div className="flex gap-3">
              <button
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-3 font-medium transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                onClick={handleSearch}
                disabled={loading}
              >
                {loading ? 'Searching...' : 'Find Route'}
              </button>
              <button
                className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
                onClick={handleSwap}
                disabled={loading}
              >
                ⇄ Swap
              </button>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}
          </div>

          {result && !result.error && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6 pb-4 border-b">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Route Details</h3>
                  <p className="text-gray-600 mt-1">
                    Total Stations: <span className="font-semibold">{result.totalStations}</span>
                  </p>
                </div>
              </div>

              <RouteDisplay stops={result.stops} />
            </div>
          )}
        </div>
      </main>
    </>
  );
}