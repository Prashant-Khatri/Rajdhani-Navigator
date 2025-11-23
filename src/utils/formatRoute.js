const LINE_COLOR_MAP = {
  Yellow: "#FFD700",
  Blue: "#0057B7",
  Red: "#FF0000",
  Green: "#2ECC71",
  Violet: "#8A2BE2",
  Pink: "#FF69B4",
  Magenta: "#CA1F7B",
  Orange: "#FF8C00",
};

export function formatRouteWithColors(path, metroData) {
  if (!path) return null;

  return path.map((station, idx) => {
    const lines = (metroData[station]?.lineColors) || [];
    const colorKey = lines[0] || "Yellow";
    const color = LINE_COLOR_MAP[colorKey] || "#cccccc";

    return {
      station,
      color
    };
  });
}
