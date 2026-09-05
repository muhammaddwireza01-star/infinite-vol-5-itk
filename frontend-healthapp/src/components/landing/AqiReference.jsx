const AqiReference = ({ label, number, bg, color, textColor, border }) => {
  return (
    <div className={`${bg} flex gap-5 p-4 rounded-md flex-1 ${border}`}>
      <div className={`w-3 h-3 rounded-full ${color}`}></div>
      <div className="flex flex-col gap-1">
        {/* Menggunakan text-color untuk label, bukan bg-color */}
        <span className={`${textColor} font-semibold`}>{label}</span>
        <span className="text-xs text-gray-400">{number}</span>
      </div>
    </div>
  );
};

export default AqiReference;
