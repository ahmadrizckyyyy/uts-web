// Render daftar informasi di halaman utama (index.html)
function renderTournamentList() {
  const container = document.getElementById("tournament-list");
  if (!container || typeof tournamentData === "undefined") return;

  container.innerHTML = tournamentData
    .map(
      (item) => `
      <div class="col-md-6 col-lg-4">
        <div class="card h-100 shadow-sm border-0">
          <img
            src="${item.image}"
            class="card-img-top object-fit-cover"
            style="height: 190px;"
            alt="${item.title}"
            onerror="this.src='https://placehold.co/600x320/1e293b/ffffff?text=Nexus+Arena'"
          />
          <div class="card-body d-flex flex-column">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="badge bg-primary">${item.category}</span>
              <small class="text-muted">${item.date}</small>
            </div>
            <h5 class="card-title fw-bold">${item.title}</h5>
            <p class="card-text text-secondary small flex-grow-1">${item.summary}</p>
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

// Render detail informasi di halaman detail (detail.html)
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
    <div class="card shadow-sm border-0 overflow-hidden">
      <img
        src="${item.image}"
        class="w-100 object-fit-cover"
        style="max-height: 360px;"
        alt="${item.title}"
        onerror="this.src='https://placehold.co/900x360/1e293b/ffffff?text=Nexus+Arena'"
      />
      <div class="card-body p-4 p-md-5">
        <div class="d-flex flex-wrap gap-2 align-items-center mb-3">
          <span class="badge bg-primary fs-6">${item.category}</span>
          <span class="text-muted small">Tanggal: <strong>${item.date}</strong></span>
          <span class="text-muted small">| Lokasi: <strong>${item.location}</strong></span>
        </div>

        <h1 class="h2 fw-bold mb-3">${item.title}</h1>
        <p class="lead text-secondary">${item.summary}</p>
        <hr />
        <p class="mb-4" style="line-height: 1.8;">${item.content}</p>

        <div class="bg-light p-3 rounded mb-4">
          <span class="small text-muted d-block">Informasi Hadiah / Benefit</span>
          <strong class="text-info">${item.prize || "-"}</strong>
        </div>

        <a href="index.html" class="btn btn-secondary">Kembali ke Halaman Utama</a>
      </div>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  renderTournamentList();
  renderTournamentDetail();
});