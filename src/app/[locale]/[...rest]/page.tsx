import { notFound } from "next/navigation";

// Unmatched URLs under a locale land here so they get the localized 404 with site chrome.
export default function CatchAll() {
  notFound();
}
