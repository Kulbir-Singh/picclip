export default function classNames(...classes: Array<string | false>): string {
  return classes.filter(Boolean).join(" ");
}
