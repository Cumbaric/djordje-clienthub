import ContactForm from "./ContactForm";
import { business, contactEmail } from "@/data/contact";
import { pricing, visiblePrices } from "@/data/pricing";
import styles from "./HomeInquiry.module.css";

// "Request a quote" block at the bottom of the home page: direct contact channels
// (WhatsApp, Viber, e-mail, phone), optional "from" prices and a short inquiry form,
// so a visitor never has to leave the page to get in touch.

const COPY = {
  en: {
    eyebrow: "Request a quote",
    title: "Send an inquiry and get a ballpark quote",
    text: "Describe your project in a few sentences. We reply within 1–2 business days with a proposal and a ballpark price.",
    directTitle: "Or reach us directly",
    whatsapp: "WhatsApp",
    viber: "Viber",
    email: "Email",
    phone: "Call",
    pricesTitle: "Ballpark prices",
    from: "from",
    perMonth: "/ month",
  },
  sr: {
    eyebrow: "Zatraži ponudu",
    title: "Pošalji upit i dobij okvirnu ponudu",
    text: "Opiši projekat u par rečenica. Javljamo se u roku od 1–2 radna dana sa predlogom i okvirnom cenom.",
    directTitle: "Ili nas kontaktiraj direktno",
    whatsapp: "WhatsApp",
    viber: "Viber",
    email: "Email",
    phone: "Pozovi",
    pricesTitle: "Okvirne cene",
    from: "od",
    perMonth: "/ mesečno",
  },
};

function formatPrice(item, c) {
  const amount = new Intl.NumberFormat("en-US").format(item.from);
  return `${c.from} ${amount} ${pricing.currency}${item.per === "month" ? ` ${c.perMonth}` : ""}`;
}

export default function HomeInquiry({ lang = "en" }) {
  const c = COPY[lang] ?? COPY.en;
  const digits = business.telephone.replace(/\D/g, ""); // 38163506096
  const prices = visiblePrices();

  const channels = [
    digits && { key: "whatsapp", label: c.whatsapp, href: `https://wa.me/${digits}`, external: true },
    digits && { key: "viber", label: c.viber, href: `viber://chat?number=%2B${digits}`, external: true },
    { key: "email", label: c.email, href: `mailto:${contactEmail}` },
    business.telephone && { key: "phone", label: c.phone, href: `tel:${business.telephone}` },
  ].filter(Boolean);

  return (
    <section id="upit" className={styles.section} aria-labelledby="home-inquiry-title">
      <div className={styles.intro}>
        <p className={styles.eyebrow}>{c.eyebrow}</p>
        <h2 id="home-inquiry-title" className={styles.title}>{c.title}</h2>
        <p className={styles.text}>{c.text}</p>

        <p className={styles.directTitle}>{c.directTitle}</p>
        <ul className={styles.channels}>
          {channels.map((channel) => (
            <li key={channel.key}>
              <a
                href={channel.href}
                className={`${styles.channel} ${styles[`channel_${channel.key}`] ?? ""}`}
                {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {channel.label}
              </a>
            </li>
          ))}
        </ul>
        <p className={styles.contactLine}>
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          {business.telephone && (
            <>
              {" · "}
              <a href={`tel:${business.telephone}`}>{business.telephoneDisplay || business.telephone}</a>
            </>
          )}
        </p>

        {prices.length > 0 && (
          <div className={styles.prices}>
            <p className={styles.pricesTitle}>{c.pricesTitle}</p>
            <ul className={styles.priceList}>
              {prices.map((item) => (
                <li key={item.key} className={styles.priceItem}>
                  <span>{item.title[lang] ?? item.title.en}</span>
                  <strong>{formatPrice(item, c)}</strong>
                </li>
              ))}
            </ul>
            <p className={styles.priceNote}>{pricing.note[lang] ?? pricing.note.en}</p>
          </div>
        )}
      </div>

      <div className={styles.formWrap}>
        <ContactForm lang={lang} contactEmail={contactEmail} compact />
      </div>
    </section>
  );
}
