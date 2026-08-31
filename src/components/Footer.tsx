import { useI18n } from "@/lib/i18n";
import { EMAIL, PHONE_DISPLAY, PHONE_HREF } from "./Contact";

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="border-border w-full border-t px-6 py-10 md:px-12 lg:px-20 xl:px-28">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-foreground">{t("footer.tagline")}</p>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-muted-foreground">
          <a
            href={`mailto:${EMAIL}`}
            className="link-underline transition-colors hover:text-foreground"
          >
            {EMAIL}
          </a>
          <a href={PHONE_HREF} className="link-underline transition-colors hover:text-foreground">
            {PHONE_DISPLAY}
          </a>
        </div>
      </div>

      <p className="mx-auto mt-8 w-full max-w-6xl font-mono text-[11px] text-muted-foreground">
        © {year} Kelenpe
      </p>
    </footer>
  );
}
