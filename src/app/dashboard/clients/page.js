export default function ClientsPage() {
  const clients = [
    {
      name: "Wellness Concept",
      website: "wellnessconcept.rs",
      type: "WordPress / Elementor",
      status: "Active",
      priority: "High",
      description:
        "Salon masaže i tretmana. Fokus na SEO, brzinu sajta, UX poboljšanja i jasnije predstavljanje usluga.",
      notes: ["Elementor Pro", "SEO optimization", "Performance improvements"],
    },
    {
      name: "Olivera Popović Edu",
      website: "oliverapopovic.edu.rs",
      type: "Education website",
      status: "Active",
      priority: "Medium",
      description:
        "Edukativni sajt sa fokusom na jasno predstavljanje sadržaja, strukturu stranica i osnovnu SEO optimizaciju.",
      notes: ["WordPress", "Content structure", "SEO basics"],
    },
    {
      name: "Mirko Topalović Tips",
      website: "mirkotopalovictips.rs",
      type: "Tips / Content platform",
      status: "Maintenance",
      priority: "Medium",
      description:
        "Sajt za objavu tipova i sadržaja, sa ACF poljima i dodatnim prilagođavanjima za administraciju.",
      notes: ["ACF fields", "Custom content", "Admin workflow"],
    },
    {
      name: "Boommil",
      website: "boommil.rs",
      type: "WooCommerce shop",
      status: "Paused",
      priority: "Low",
      description:
        "WooCommerce prodavnica za kućnu hemiju. Projekat trenutno nije aktivan zbog isteka domena/hostinga.",
      notes: ["WooCommerce", "Product SEO", "Expired hosting/domain"],
    },
  ];

  return (
    <section className="dashboard-page">
      <div className="dashboard-header">
        <p className="dashboard-label">Client management</p>
        <h1>Clients</h1>
        <p>
          Pregled WordPress klijenata, statusa projekata, tipa sajta i osnovnih
          radnih beleški.
        </p>
      </div>

      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <div>
            <p className="dashboard-label">Overview</p>
            <h2>Client list</h2>
          </div>
        </div>

        <div className="dashboard-client-grid">
          {clients.map((client) => (
            <article className="dashboard-client-card" key={client.name}>
              <div className="dashboard-client-top">
                <div>
                  <h3>{client.name}</h3>
                  <p>{client.website}</p>
                </div>

                <span
                  className={`dashboard-status dashboard-status-${client.status.toLowerCase()}`}
                >
                  {client.status}
                </span>
              </div>

              <div className="dashboard-client-meta">
                <span>{client.type}</span>
                <span>Priority: {client.priority}</span>
              </div>

              <p className="dashboard-client-description">
                {client.description}
              </p>

              <div className="dashboard-tag-list">
                {client.notes.map((note) => (
                  <span key={note}>{note}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
