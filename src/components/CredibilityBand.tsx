import Link from "next/link";

import { Container } from "@/components/Container";
import { credentials, type Credential } from "@/lib/content";

const valueLinkClass = "link-text hover:text-primary hover:decoration-primary";

function CredentialValue({ credential }: { credential: Credential }) {
  if (!credential.href) return <>{credential.value}</>;

  if (/^https?:\/\//.test(credential.href)) {
    return (
      <a href={credential.href} target="_blank" rel="noopener noreferrer" className={valueLinkClass}>
        {credential.value}
      </a>
    );
  }

  return (
    <Link href={credential.href} className={valueLinkClass}>
      {credential.value}
    </Link>
  );
}

/** Credentials strip under the masthead: a definition list, no icons, no motion, no bottom border. */
export function CredibilityBand() {
  return (
    <section aria-label="Credentials" className="py-5">
      <Container>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-0 lg:divide-x lg:divide-border">
          {credentials.map((credential) => (
            <div key={credential.label} className="lg:px-6 lg:first:pl-0 lg:last:pr-0">
              <dt className="mono-label text-muted-foreground">{credential.label}</dt>
              <dd className="mt-1 text-body-sm text-foreground">
                <CredentialValue credential={credential} />
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
