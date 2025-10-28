// Serviço simples de appointments (fallback localStorage) — usado por BarberDashboard e outros componentes

const STORAGE_KEY = "barbavore_appointments_v1";

/** Helpers internos */
function loadAll() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        console.error("Appointments: failed to load from storage", e);
        return [];
    }
}
function saveAll(items) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
        console.error("Appointments: failed to save to storage", e);
    }
}

/** API simulada (retorna Promises para compatibilidade) */
export function fetchAllAppointments() {
    return new Promise((resolve) => {
        const items = loadAll();
        resolve(items);
    });
}

export function fetchAppointmentsByBarber(barberEmail) {
    return new Promise((resolve) => {
        const items = loadAll().filter((a) => a.barber === barberEmail);
        resolve(items);
    });
}

export function fetchAppointmentsByUser(userEmail) {
    return new Promise((resolve) => {
        const items = loadAll().filter((a) => a.user === userEmail);
        resolve(items);
    });
}

export function createAppointment(appointment) {
    return new Promise((resolve) => {
        const items = loadAll();
        const newItem = {
            id: Date.now().toString(),
            date: appointment.date ?? null,
            user: appointment.user ?? null,
            barber: appointment.barber ?? null,
            note: appointment.note ?? "",
            status: appointment.status ?? "scheduled",
        };
        items.push(newItem);
        saveAll(items);
        resolve(newItem);
    });
}

export function updateAppointment(id, changes) {
    return new Promise((resolve, reject) => {
        const items = loadAll();
        const idx = items.findIndex((i) => i.id === id);
        if (idx === -1) return reject(new Error("Appointment not found"));
        items[idx] = { ...items[idx], ...changes };
        saveAll(items);
        resolve(items[idx]);
    });
}

export function deleteAppointment(id) {
    return new Promise((resolve, reject) => {
        const items = loadAll();
        const idx = items.findIndex((i) => i.id === id);
        if (idx === -1) return reject(new Error("Appointment not found"));
        const removed = items.splice(idx, 1)[0];
        saveAll(items);
        resolve(removed);
    });
}

/** Aliases para compatibilidade com imports existentes em outros arquivos */
export const getAllAppointments = fetchAllAppointments;
export const getBarberAppointments = fetchAppointmentsByBarber;
export const getUserAppointments = fetchAppointmentsByUser;
export const updateAppointmentStatus = updateAppointment; // novo alias para compatibilidade com BarberDashboard

/** Default export para compatibilidade com imports default */
const AppointmentsService = {
    fetchAllAppointments,
    fetchAppointmentsByBarber,
    fetchAppointmentsByUser,
    createAppointment,
    updateAppointment,
    deleteAppointment,
    getAllAppointments,
    getBarberAppointments,
    getUserAppointments,
    updateAppointmentStatus, // adicionado aqui também
};

export default AppointmentsService;
