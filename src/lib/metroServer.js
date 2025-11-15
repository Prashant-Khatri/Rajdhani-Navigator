import metroData from "@/data/delhiMetro.json";

export function findShortestRoute(start, end) {
  if (!metroData[start] || !metroData[end]) {
    return null;
  }

  const queue = [[start]];
  const visited = new Set([start]);

  while (queue.length > 0) {
    const path = queue.shift();
    const station = path[path.length - 1];

    if (station === end) return path;

    for (const next of metroData[station].connections || []) {
      if (!visited.has(next)) {
        visited.add(next);
        queue.push([...path, next]);
      }
    }
  }
  return null;
}