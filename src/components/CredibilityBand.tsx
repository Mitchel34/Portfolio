import { Container } from "@/components/Container";
import { credentials } from "@/lib/content";

/** Credentials strip under the masthead: a definition list, no icons, no motion, no bottom border. */
export function CredibilityBand() {
  return (
    <section aria-label="Credentials" className="py-5">
      <Container>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-0 lg:divide-x lg:divide-border">
          {credentials.map((credential) => (
            <div key={credential.label} className="lg:px-6 lg:first:pl-0 lg:last:pr-0">
              <dt className="mono-label text-muted-foreground">{credential.label}</dt>
              <dd className="mt-1 text-body-sm text-foreground">{credential.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
