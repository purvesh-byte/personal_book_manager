type StatusBadgeProps = {
  status: string;
};

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  const styles: Record<string, string> = {
    Reading:
      "bg-blue-50 text-blue-700 border-blue-200",

    Completed:
      "bg-green-50 text-green-700 border-green-200",

    "Want to Read":
      "bg-gray-100 text-gray-700 border-gray-200",
  };

  return (
    <span
      className={`whitespace-nowrap rounded-md border px-2.5 py-1 text-xs font-medium ${
        styles[status] ||
        "bg-gray-100 text-gray-700 border-gray-200"
      }`}
    >
      {status}
    </span>
  );
}