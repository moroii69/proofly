"use client";
import { useParams, usePathname } from 'next/navigation';

export default function DocsSubpage() {
  const { slug } = useParams<{ slug: string[] }>(); // Inferring the type as an array of strings
  const pathname = usePathname(); // Optional: If you want to display the current path

  if (slug?.[0] === 'getting-started') {
    return (
      <div>
        <h1>Getting Started</h1>
        <p>This is the getting started guide.</p>
      </div>
    );
  }

  if (slug?.[0] === 'advanced-topics') {
    return (
      <div>
        <h1>Advanced Topics</h1>
        <p>This is the advanced topics guide.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Documentation for {Array.isArray(slug) ? slug.join(' / ') : slug}</h1>
      <p>Content for this section is under development.</p>
      <p>Current Path: {pathname}</p>
    </div>
  );
}
