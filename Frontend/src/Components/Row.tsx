function Row({ label, value }: { label: string; value: any }) {
  return (
    <div className="flex justify-between border-b pb-1">
      <span className="font-medium">{label}:</span>
      <span>{value}</span>
    </div>
  );
}

export default Row;