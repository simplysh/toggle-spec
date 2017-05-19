export default function mirror(name: string): string {
  if (name.includes('.spec.')) {
    return name.replace(/\.spec\./, '.');
  }

  const dot = name.lastIndexOf('.');

  if (dot !== -1) {
    return `${name.substring(0, dot)}.spec${name.substring(dot)}`;
  }

  return undefined;
}
