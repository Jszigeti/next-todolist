export default function Logo({ size }: { size: string }) {
  return (
    <h1 className={`${size} font-black`}>
      TODO<span className="text-blue-500">LIST</span>
    </h1>
  );
}
