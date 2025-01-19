export default function ColorButton({ color, isSelected, onSelect }) {
  return (
    <button
      type="button"
      style={{
        backgroundColor: color,
        border: isSelected ? "1.5px solid black" : "none",
        padding: "10px",
        margin: "5px",
        borderRadius: "50px",
        cursor: "pointer",
      }}
      onClick={() => onSelect(color)}
    />
  );
}
