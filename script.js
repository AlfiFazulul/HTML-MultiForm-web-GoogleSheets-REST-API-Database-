const scriptUrl = 'https://script.google.com/macros/s/AKfycbzY2_K1JLuPp0nI-zeC_5Al9GTaDglBTYV5cVj0FOLcwrFB5QbJEevYMSG8MFV8dRgj/exec';

function cariDataKomplen() {
  const id = document.getElementById('id_komplain').value.trim();
  const btn = document.getElementById('btnCariKomplain');
  const originalText = btn.innerHTML;

  if (!id) return alert('❗ Masukkan ID terlebih dahulu.');

  // Tampilkan loading di tombol
  btn.innerHTML = 'Mencari...<span class="loading-spinner"></span>';
  btn.disabled = true;

  fetch(`${scriptUrl}?id=${id}`)
    .then(res => res.json())
    .then(data => {
      if (!data || !data.FullName) {
        alert("❌ Data tidak ditemukan.");
        return;
      }
      document.getElementById('nama').value = data.FullName || '';
      document.getElementById('alamat').value = data.Address || '';
      document.getElementById('nohp').value = data.Phone || '';
      document.getElementById('site_komplain').value = data.Router || '';
      document.getElementById('type_komplain').value = data.Type || '';
    })
    .catch(() => alert("⚠️ Terjadi kesalahan saat mengambil data."))
    .finally(() => {
      // Kembalikan tampilan tombol
      btn.innerHTML = originalText;
      btn.disabled = false;
    });
}


function cariDataReminder() {
  const id = document.getElementById('id_reminder').value.trim();
  const btn = document.getElementById('btnCariReminder');
  const originalText = btn.innerHTML;

  if (!id) return alert('❗ Masukkan ID terlebih dahulu.');

  btn.innerHTML = 'Mencari...<span class="loading-spinner"></span>';
  btn.disabled = true;

  fetch(`${scriptUrl}?id=${id}`)
    .then(res => res.json())
    .then(data => {
      if (!data || !data.FullName) {
        alert("❌ Data tidak ditemukan.");
        return;
      }
      document.getElementById('nama_reminder').value = data.FullName || '';
      document.getElementById('alamat_reminder').value = data.Address || '';
      document.getElementById('site_expired').value = data.Router || '';
      document.getElementById('type_expired').value = data.Type || '';
    })
    .catch(() => alert("⚠️ Terjadi kesalahan saat mengambil data."))
    .finally(() => {
      // Kembalikan tampilan tombol
      btn.innerHTML = originalText;
      btn.disabled = false;
    });
}

function cariDataONT() {
  const id = document.getElementById('id_ont').value.trim();
  const btn = document.getElementById('btnCariONT');
  const originalText = btn.innerHTML;

  if (!id) return alert('❗ Masukkan ID terlebih dahulu.');

  btn.innerHTML = 'Mencari...<span class="loading-spinner"></span>';
  btn.disabled = true;

  fetch(`${scriptUrl}?id=${id}`)
    .then(res => res.json())
    .then(data => {
      if (!data || !data.FullName) {
        alert("❌ Data tidak ditemukan.");
        return;
      }
      document.getElementById('nama_ont').value = data.FullName || '';
      document.getElementById('alamat_ont').value = data.Address || '';
      document.getElementById('nohp_ont').value = data.Phone || '';
      document.getElementById('site_ont').value = data.Router || '';
    })
    .catch(() => alert("⚠️ Terjadi kesalahan saat mengambil data."))
    .finally(() => {
      // Kembalikan tampilan tombol
      btn.innerHTML = originalText;
      btn.disabled = false;
    });
}


function toggleInputLainnya(select) {
  const input = document.getElementById('alasan_lain_ont');
  input.style.display = select.value === 'Lainnya' ? 'block' : 'none';
}


function submitKomplain() {
  const id = document.getElementById('id_komplain').value.trim();
  const nama = document.getElementById('nama').value.trim();
  const alamat = document.getElementById('alamat').value.trim();
  const nohp = document.getElementById('nohp').value.trim();
  const site = document.getElementById('site_komplain').value.trim();
  const type = document.getElementById('type_komplain').value.trim();
  const tipeONT = document.getElementById('tipe_ont_keluhan').value.trim();
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  const username = loggedUser?.username || "Anonim";

  // ✅ Ambil semua keluhan yang diceklis
  const keluhanList = Array.from(document.querySelectorAll('input[name="keluhan_pelanggan"]:checked'))
    .map(cb => cb.value);

  const keluhanLainText = document.getElementById('keluhan_lain_text')?.value.trim() || "";
  const keluhanLainCheckbox = document.getElementById('keluhan_lain_checkbox');

  if (keluhanLainCheckbox?.checked && keluhanLainText !== "") {
    keluhanList.push(keluhanLainText);
  }

  const keluhan = keluhanList.join(', ');

  // ✅ Ambil semua penanganan yang diceklis
  const penangananList = Array.from(document.querySelectorAll('input[name="penanganan_pelanggan"]:checked'))
    .map(cb => cb.value);

  const penangananLainText = document.getElementById('penanganan_lain_text')?.value.trim() || "";
  const penangananLainCheckbox = document.getElementById('penanganan_lain_checkbox');

  if (penangananLainCheckbox?.checked && penangananLainText !== "") {
    penangananList.push(penangananLainText);
  }

  const penanganan = penangananList.join(', ');

  // ✅ Validasi semua field wajib
  if (!id || !nama || !alamat || !nohp || !site || !type  || !tipeONT || !keluhan || !penanganan) {
    alert('❗ Semua field wajib diisi.');
    return;
  }

  // ✅ Tampilkan loading di tombol submit
  const btn = document.getElementById("btnSubmitKomplain");
  const originalText = btn.innerHTML;
  btn.innerHTML = 'Menyimpan...<span class="loading-spinner"></span>';
  btn.disabled = true;

  // ✅ Siapkan data untuk dikirim
  const formData = new FormData();
  formData.append("Kategori", "komplain");
  formData.append("CustomerId", id);
  formData.append("FullName", nama);
  formData.append("Address", alamat);
  formData.append("Phone", nohp);
  formData.append("Router", site);
  formData.append("Type", type);
  formData.append("Tipe_ONT_Keluhan", tipeONT);
  formData.append("Keluhan_Pelanggan", keluhan);
  formData.append("Penanganan_Pelanggan", penanganan);
  formData.append("UserInput", username);

  // ✅ Kirim ke server
  fetch(scriptUrl, {
    method: 'POST',
    body: formData
  })
    .then(res => res.text())
    .then(msg => {
      alert(msg);
      resetFormKategori('komplain');
    })
    .catch(() => alert("❌ Gagal mengirim data ke server"))
    .finally(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
    });
}





function submitReminder() {
  const id = document.getElementById('id_reminder').value.trim();
  const nama = document.getElementById('nama_reminder').value.trim();
  const alamat = document.getElementById('alamat_reminder').value.trim();
  const site = document.getElementById('site_expired').value.trim();
  const type = document.getElementById('type_expired').value.trim();
  const tanggalExpired = document.getElementById('tanggal_expired').value.trim();
  const btn = document.getElementById('btnSubmitReminder');
  const originalText = btn.innerHTML;
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
const username = loggedUser?.username || "Anonim";


  if (!id || !nama || !alamat || !site || !type || !tanggalExpired ) {
    alert("❗ Semua field harus diisi.");
    return;
  }

  const formData = new FormData();
  formData.append("Kategori", "expired");
  formData.append("CustomerId", id);
  formData.append("FullName", nama);
  formData.append("Address", alamat);
  formData.append("Router", site);
  formData.append("Type", type);
  formData.append("Tanggal_Expired", tanggalExpired);
  formData.append("UserInput", username);

  btn.innerHTML = 'Mengirim...<span class="loading-spinner"></span>';
  btn.disabled = true;

  fetch(scriptUrl, { method: 'POST', body: formData })
  .then(res => res.text())
  .then(msg => {
    alert(msg);
    resetFormKategori('expired');
  })
  .catch(() => alert("❌ Gagal mengirim data ke server"))
  .finally(() => {
    btn.innerHTML = originalText;
    btn.disabled = false;
  });

}

function submitONT() {
  const id = document.getElementById('id_ont').value.trim();
  const nama = document.getElementById('nama_ont').value.trim();
  const alamat = document.getElementById('alamat_ont').value.trim();
  const nohp = document.getElementById('nohp_ont').value.trim();
  const site = document.getElementById('site_ont').value.trim();
  const sn = document.getElementById('sn_ont').value.trim();
  const tanggal = document.getElementById('tanggal_penarikan').value.trim();
  const type = document.getElementById('type_ont').value.trim();
  const alasan = document.getElementById('alasan_ont').value;
  const alasanLain = document.getElementById('alasan_lain_ont').value.trim();
  const btn = document.getElementById('btnSubmitONT');
  const originalText = btn.innerHTML;
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
const username = loggedUser?.username || "Anonim";
  const finalAlasan = alasan === 'Lainnya' ? alasanLain : alasan;

  if (!id || !nama || !alamat || !nohp || !site || !sn || !tanggal || !type || !finalAlasan) {
    alert("❗ Semua field harus diisi.");
    return;
  }

  const formData = new FormData();
  formData.append("Kategori", "ont");
  formData.append("CustomerId", id);
  formData.append("FullName", nama);
  formData.append("Address", alamat);
  formData.append("Phone", nohp);
  formData.append("Router", site);
  formData.append("SN_ONT", sn);
  formData.append("Tanggal_Penarikan", tanggal);
  formData.append("Type_ONT", type);
  formData.append("Alasan_Penarikan", finalAlasan);
  formData.append("UserInput", username);

  btn.innerHTML = 'Mengirim...<span class="loading-spinner"></span>';
  btn.disabled = true;

  fetch(scriptUrl, { method: 'POST', body: formData })
  .then(res => res.text())
  .then(msg => {
    alert(msg);
    resetFormKategori('ont');
  })
  .catch(() => alert("❌ Gagal mengirim data ke server"))
  .finally(() => {
    btn.innerHTML = originalText;
    btn.disabled = false;
  });

}

function submitMetro() {
  const tanggal = document.getElementById('tanggal_komplen_metro').value.trim();
  const komplen = document.getElementById('komplen_metro').value.trim();
  const keterangan = document.getElementById('keterangan_metro').value.trim();
  const btn = document.getElementById('btnSubmitMetro');
  const originalText = btn.innerHTML;
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
const username = loggedUser?.username || "Anonim";
  if (!tanggal || !komplen || !keterangan) {
    alert("❗ Semua field harus diisi.");
    return;
  }

  const formData = new FormData();
  formData.append("Kategori", "metro");
  formData.append("Tanggal_Komplen_Metro", tanggal);
  formData.append("Komplen_Metro", komplen);
  formData.append("Keterangan_Metro", keterangan);
  formData.append("UserInput", username);

  btn.innerHTML = 'Mengirim...<span class="loading-spinner"></span>';
  btn.disabled = true;

  fetch(scriptUrl, { method: 'POST', body: formData })
  .then(res => res.text())
  .then(msg => {
    alert(msg);
    resetFormKategori('metro');
  })
  .catch(() => alert("❌ Gagal mengirim data ke server"))
  .finally(() => {
    btn.innerHTML = originalText;
    btn.disabled = false;
  });

}

function tampilkanForm(namaForm, btn) {
  document.querySelectorAll(".form-section").forEach(el => el.classList.remove("visible"));
  const form = document.getElementById(`form-${namaForm}`);
  if (form) form.classList.add("visible");

  // Aktifkan tombol yang sedang dipilih
  document.querySelectorAll(".kategori-btn").forEach(button => button.classList.remove("active"));
  btn.classList.add("active");
}

function toggleLainnya(tipe) {
  const select = document.getElementById(`${tipe}_pelanggan`);
  const input = document.getElementById(`${tipe}_lain`);
  input.style.display = select.value === "lain" ? "block" : "none";
}

  function toggleInputLainnya(select) {
    const input = document.getElementById("alasan_lain_ont");
    input.style.display = select.value === "Lainnya" ? "block" : "none";
  }
  function togglePenangananLain() {
    const isChecked = document.getElementById('penanganan_lain_checkbox').checked;
    document.getElementById('penanganan_lain_wrapper').style.display = isChecked ? 'block' : 'none';
  }
  function resetFormKategori(kategori) {
  let ids = [];

  if (kategori === 'komplain') {
    // 🔄 Reset semua input text dan select
    const inputIds = [
      'id_komplain', 'nama', 'alamat', 'nohp', 'site_komplain',
      'type_komplain', 'tipe_ont_keluhan',
      'penanganan_lain', 'penanganan_pelanggan', 'keluhan_lain_text'
    ];
    inputIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
  
    // 🔄 Reset semua checkbox keluhan pelanggan
    document.querySelectorAll('input[name="keluhan_pelanggan"]').forEach(cb => cb.checked = false);
  
    // 🔄 Reset keluhan "lainnya"
    const keluhanLainCheckbox = document.getElementById('keluhan_lain_checkbox');
    const keluhanLainText = document.getElementById('keluhan_lain_text');
    if (keluhanLainCheckbox) keluhanLainCheckbox.checked = false;
    if (keluhanLainText) {
      keluhanLainText.value = '';
      keluhanLainText.style.display = 'none'; // atau classList.add('d-none') jika pakai Bootstrap
    }
  
    // ✅ Reset checkbox penanganan pelanggan
  document.querySelectorAll('input[name="penanganan_pelanggan"]').forEach(cb => cb.checked = false);
  const penangananLainCheckbox = document.getElementById('penanganan_lain_checkbox');
  if (penangananLainCheckbox) penangananLainCheckbox.checked = false;
  const penangananLainText = document.getElementById('penanganan_lain_text');
  if (penangananLainText) {
    penangananLainText.value = '';
    penangananLainText.style.display = 'none';
  }

  
  
  
  
  

  } else if (kategori === 'expired') {
    ids = [
      'id_reminder', 'nama_reminder', 'alamat_reminder', 'site_expired',
      'type_expired', 'tanggal_expired',
    ];
    ids.forEach(id => document.getElementById(id).value = '');

  } else if (kategori === 'ont') {
  const ids = [
    'id_ont', 'nama_ont', 'alamat_ont', 'nohp_ont', 'site_ont',
    'sn_ont', 'type_ont', 'tanggal_penarikan', 'alasan_ont', 'alasan_lain_ont'
  ];
  ids.forEach(id => document.getElementById(id).value = '');

  const alasanLain = document.getElementById('alasan_lain_ont');
  if (alasanLain) alasanLain.style.display = 'none';


  } else if (kategori === 'metro') {
    ids = [
      'tanggal_komplen_metro', 'komplen_metro', 'keterangan_metro'
    ];
    ids.forEach(id => document.getElementById(id).value = '');
  }
}

document.getElementById("id_komplain").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    cariDataKomplen();
  }
});

document.getElementById("id_reminder").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    cariDataReminder();
  }
});

document.getElementById("id_ont").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    cariDataONT();
  }
});


  function toggleKeluhanLain() {
    const check = document.getElementById('keluhan_lain_checkbox');
    const input = document.getElementById('keluhan_lain_wrapper');
    if (check.checked) {
      input.style.display = 'block';
    } else {
      input.style.display = 'none';
      document.getElementById('keluhan_lain_text').value = ''; // kosongkan
    }
    
    
  }


