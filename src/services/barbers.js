// Serviço de barbers com alias getAvailableBarbers.

const STORAGE_KEY = "barbavore_barbers_v1";

function loadAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error("barbers: failed to read storage", e);
  }
  return [
    { id: "b1", name: "João", email: "joao@barbavore.local" },
    { id: "b2", name: "Marcos", email: "marcos@barbavore.local" },
  ];
}
function saveAll(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error("barbers: failed to save storage", e);
  }
}

export function fetchBarbers() {
  return Promise.resolve(loadAll());
}

export function fetchBarberByEmail(email) {
  return Promise.resolve(loadAll().find((b) => b.email === email) || null);
}

export function createBarber(barber) {
  return new Promise((resolve) => {
    const items = loadAll();
    const newBarber = { id: Date.now().toString(), ...barber };
    items.push(newBarber);
    saveAll(items);
    resolve(newBarber);
  });
}

export function updateBarber(id, changes) {
  return new Promise((resolve, reject) => {
    const items = loadAll();
    const idx = items.findIndex((i) => i.id === id);
    if (idx === -1) return reject(new Error("Barber not found"));
    items[idx] = { ...items[idx], ...changes };
    saveAll(items);
    resolve(items[idx]);
  });
}

export function deleteBarber(id) {
  return new Promise((resolve, reject) => {
    const items = loadAll();
    const idx = items.findIndex((i) => i.id === id);
    if (idx === -1) return reject(new Error("Barber not found"));
    const removed = items.splice(idx, 1)[0];
    saveAll(items);
    resolve(removed);
  });
}

/* alias */
export const getAvailableBarbers = fetchBarbers;

const BarbersService = {
  fetchBarbers,
  fetchBarberByEmail,
  createBarber,
  updateBarber,
  deleteBarber,
  getAvailableBarbers,
};

export default BarbersService;
