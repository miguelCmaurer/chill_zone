const bars = [
  10, 14, 8, 18, 22, 26, 24, 22, 20, 18, 22, 26, 24, 20, 16, 12, 10, 14, 18, 22,
  20, 16, 12, 8, 10, 12, 14, 10, 8, 6, 10, 14, 8, 18, 22, 26, 24, 22, 20, 18,
  22, 26, 24, 20, 16, 12, 10, 14, 18, 10, 14, 8, 18, 22, 26, 24, 22, 20, 18, 22,
  26, 24, 20, 16, 12, 10, 14, 18, 22, 20, 16, 12, 8, 10, 12, 14, 10, 8, 6, 10,
  14, 8, 18, 22, 26, 24, 22, 20, 18, 22, 26, 24, 20, 16, 12, 10, 14, 18, 10, 14,
  8, 18, 22, 26, 24, 22, 20, 18, 22, 26, 24, 20, 16, 12, 10, 14,
];

export function SoundWaveProgress({ progress, duration, setPlay }) {
  const barWidth = 3;
  const gapWidth = 2;
  const totalWidth = bars.length * barWidth + (bars.length - 1) * gapWidth;
  const progressPixels = (progress / duration) * totalWidth;

  function formatSec(sec) {
    let formattedStr = "";
    let remainderSec = Math.floor(sec % 60);
    let min = Math.floor(sec / 60);
    let hour = Math.floor(min / 60);
    if (hour) {
      formattedStr += hour + ":";
    }

    formattedStr += String(min).padStart(2, "0") + ":";

    formattedStr += String(remainderSec).padStart(2, "0");

    return formattedStr;
  }

  return (
    <div className="flex items-center gap-3 justify-between">
      <div className="relative h-10">
        <div
          onMouseUp={(e) => {
            const { offsetX } = e.nativeEvent;
            setPlay(offsetX / e.target.offsetWidth);
          }}
          className="flex items-center gap-[2px] h-full"
        >
          {bars.map((height, index) => {
            const barStart = index * (barWidth + gapWidth);
            let blackWidth = 0;
            if (progressPixels > barStart) {
              blackWidth = Math.min(progressPixels - barStart, barWidth);
            }
            const blackPercent = (blackWidth / barWidth) * 100;

            return (
              <div
                key={index}
                className="w-[3px] rounded-sm relative overflow-hidden pointer-events-none"
                style={{ height: `${height + 10}px` }}
              >
                <div className="absolute inset-0 bg-gray-300 rounded-sm" />
                <div
                  className="absolute top-0 left-0 bg-purple-950 rounded-sm transition-all duration-75 ease-linear"
                  style={{
                    width: `${blackPercent}%`,
                    height: "100%",
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center w-3 cursor-default">
        <span className="text-slate-400 text-sm font-light tracking-wide transition-all duration-300 hover:text-slate-600">
          {formatSec(duration - progress)}
        </span>
      </div>
    </div>
  );
}
