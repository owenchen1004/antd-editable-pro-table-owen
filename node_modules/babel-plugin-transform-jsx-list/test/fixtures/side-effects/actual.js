const items = [1, 2, 3, 4];

export default function List() {
  return (
    <div>
      <div x-for={(it, idx) in items}>
        <span>{it}</span>
      </div>
    </div>
  );
}