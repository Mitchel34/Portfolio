import { discussions } from "@/lib/content";

/** Conversation topics, listed once on /contact. They are invitations, not past talks. */
export function OfficeHours({ className }: { className?: string }) {
  return (
    <ul className={className ? `${className} divide-y divide-border border-y border-border` : "divide-y divide-border border-y border-border"}>
      {discussions.topics.map((topic) => (
        <li key={topic.title} className="py-3">
          <p className="text-body-sm font-medium text-foreground">{topic.title}</p>
          <p className="mt-1 text-footnote text-muted-foreground">{topic.prompt}</p>
        </li>
      ))}
    </ul>
  );
}
