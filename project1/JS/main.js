// Render daftar informasi di halaman utama (index.html)
function renderTournamentList() {
  const container = document.getElementById("tournament-list");
  if (!container || typeof tournamentData === "undefined") return;

  container.innerHTML = tournamentData
    .map(
      (item) => `
      <div class="col-md-6 col-lg-4">
        <div class="card h-100 shadow-sm">
          <div class="poster-card-frame">
            <img
              src="${item.image}"
              class="poster-fit"
              alt="Poster ${item.title}"
              onerror="this.onerror=null; this.src='https://placehold.co/600x800/111111/facc15?text=${encodeURIComponent(item.title)}';"
            />
          </div>
          <div class="card-body d-flex flex-column">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="badge bg-primary">${item.category}</span>
              <small>${item.date}</small>
            </div>
            <h5 class="card-title fw-bold">${item.title}</h5>
            <p class="card-text small flex-grow-1">${item.summary}</p>
            <div class="mt-3 pt-2 border-top d-flex justify-content-between align-items-center">
              <span class="small fw-semibold text-info">${item.prize || ""}</span>
              <a href="detail.html?id=${item.id}" class="btn btn-outline-primary btn-sm">
                Lihat Detail
              </a>
            </div>
          </div>
        </div>
      </div>
    `
    )
    .join("");
}

function renderTournamentDetail() {
  const detailContainer = document.getElementById("tournament-detail");
  if (!detailContainer || typeof tournamentData === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));
  const item = tournamentData.find((data) => data.id === id);

  if (!item) {
    detailContainer.innerHTML = `
      <div class="alert alert-warning text-center py-4">
        <h4 class="alert-heading">Informasi Tidak Ditemukan</h4>
        <p class="mb-3">Data informasi yang kamu pilih tidak tersedia atau parameter ID belum dipilih.</p>
        <a href="index.html" class="btn btn-primary">Kembali ke Halaman Utama</a>
      </div>
    `;
    return;
  }

  detailContainer.innerHTML = `
    <div class="card shadow-sm overflow-hidden">
      <div class="row g-0 align-items-stretch">
        <div class="col-md-5 poster-detail-frame">
          <img
            src="${item.image}"
            class="poster-fit rounded"
            alt="Poster ${item.title}"
            onerror="this.onerror=null; this.src='https://placehold.co/600x800/111111/facc15?text=${encodeURIComponent(item.title)}';"
          />
        </div>
        <div class="col-md-7">
          <div class="card-body p-4 p-md-5">
            <div class="d-flex flex-wrap gap-2 align-items-center mb-3">
              <span class="badge bg-primary">${item.category}</span>
              <span class="small">Tanggal: <strong>${item.date}</strong></span>
              <span class="small">| Lokasi: <strong>${item.location}</strong></span>
            </div>

            <h1 class="h3 fw-bold mb-3">${item.title}</h1>
            <p class="lead small mb-3">${item.summary}</p>
            <hr />
            <p class="mb-4" style="line-height: 1.8;">${item.content}</p>

            <div class="row g-3 mb-4">
              <div class="col-sm-6">
                <div class="bg-light p-3 rounded h-100">
                  <span class="small d-block">Informasi Hadiah / Benefit</span>
                  <strong class="text-info fs-6">${item.prize || "-"}</strong>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="bg-light p-3 rounded h-100">
                  <span class="small d-block mb-1">Contact Person</span>
                  <div class="fw-bold">${item.contactName || "Panitia Nexus Arena"}</div>
                  <div class="small">${item.contactRole || "Admin Informasi"}</div>
                  <div class="small text-info mt-1">WA / Telp: ${item.contactPhone || "-"}</div>
                </div>
              </div>
            </div>

            <a href="index.html" class="btn btn-secondary">Kembali ke Halaman Utama</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  renderTournamentList();
  renderTournamentDetail();
});