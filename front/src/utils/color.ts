export function randomColor(): string {
  let color: string;
  do {
    color = `hsl(${Math.floor(Math.random() * 360)}, 60%, 70%)`; // teinte aléatoire, saturation 60%, lumière 70%
    // on évite noir/blanc : hsl(0,0%,0%) et hsl(0,0%,100%)
  } while (color === "hsl(0,0%,0%)" || color === "hsl(0,0%,100%)");
  return color;
}