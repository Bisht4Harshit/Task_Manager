export default function StatCard({ icon: Icon, label, value, tone }) {
  return (
    <article className={`stat ${tone || ''}`}>
      <Icon size={22} />
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </article>
  );
}
