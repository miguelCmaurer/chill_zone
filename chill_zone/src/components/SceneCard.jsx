export function SceneCard({ children, className, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex justify-center items-center flex-col min-w-80 w-full h-60 shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}
