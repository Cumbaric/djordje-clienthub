import { business } from "@/data/contact";

const LABELS = {
  en: { location: "Location", phone: "Phone", hours: "Working hours" },
  sr: { location: "Lokacija", phone: "Telefon", hours: "Radno vreme" },
};

/** City, phone (tel: link) and working hours from src/data/contact.js. Empty fields are skipped. */
export default function BusinessInfo({ lang }) {
  const l = LABELS[lang] ?? LABELS.en;
  const city = business.city[lang] ?? business.city.en;
  const country = business.country[lang] ?? business.country.en;
  const hours = business.hours[lang] || business.hours.en;

  return (
    <p>
      <strong>{l.location}:</strong> {city}, {country}
      {business.telephone && (
        <>
          {" · "}
          <strong>{l.phone}:</strong>{" "}
          <a href={`tel:${business.telephone}`}>{business.telephoneDisplay || business.telephone}</a>
        </>
      )}
      {hours && (
        <>
          {" · "}
          <strong>{l.hours}:</strong> {hours}
        </>
      )}
    </p>
  );
}
