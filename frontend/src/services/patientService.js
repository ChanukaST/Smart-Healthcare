import { fetchApi } from './api';

export const patientService = {
  getProfile: async () => fetchApi('/patients/me'),
  getMedicalRecords: async () => fetchApi('/patients/records'),
  getPrescriptions: async () => fetchApi('/patients/prescriptions')
};

export const doctorService = {
  getSchedule: async () => fetchApi('/doctors/schedule'),
  getPatients: async () => fetchApi('/doctors/patients')
};

export const appointmentService = {
  getAppointments: async () => fetchApi('/appointments'),
  bookAppointment: async (data) => fetchApi('/appointments', { method: 'POST', body: JSON.stringify(data) })
};

export const pharmacyService = {
  getMedicines: async () => fetchApi('/pharmacy/medicines'),
  addMedicine: async (data) => fetchApi('/pharmacy/medicines', { method: 'POST', body: JSON.stringify(data) })
};

export const laboratoryService = {
  getLabRequests: async () => fetchApi('/laboratory/requests'),
  submitReport: async (id, data) => fetchApi(`/laboratory/requests/${id}`, { method: 'POST', body: JSON.stringify(data) })
};

export const billingService = {
  getInvoices: async () => fetchApi('/billing/invoices'),
  payInvoice: async (id) => fetchApi(`/billing/invoices/${id}/pay`, { method: 'POST' })
};

export const notificationService = {
  getNotifications: async () => fetchApi('/notifications')
};
