import { defineStore } from "pinia";

import {
  createComplaint,
  getComplaintById,
  getComplaints,
  updateComplaint,
  getComplaintsByType,
} from "@/services/complaintsService";

export const useComplaintsStore = defineStore("complaints", {
  state: () => ({
    complaints: [],
    isLoading: false,
    error: null,
  }),

  actions: {
    async loadComplaints(user) {
      this.isLoading = true;
      this.error = null;

      try {
        this.complaints = await getComplaints(user);
      } catch (error) {
        this.error = error.message || "No se pudieron cargar las denuncias";
      } finally {
        this.isLoading = false;
      }
    },

    async loadComplaint(id, force = false) {
      if (!force) {
        const existing = this.getById(id);
        if (existing) return existing;
      }

      this.isLoading = true;
      this.error = null;

      try {
        const complaint = await getComplaintById(id);

        const index = this.complaints.findIndex(
          (item) => String(item.id) === String(complaint.id),
        );

        if (index >= 0) {
          this.complaints[index] = complaint;
        } else {
          this.complaints.push(complaint);
        }

        return complaint;
      } catch (error) {
        this.error = error.message || "No se pudo cargar la denuncia";
        return null;
      } finally {
        this.isLoading = false;
      }
    },

    async create(data, user) {
      const complaint = await createComplaint(data, user);
      this.complaints.unshift(complaint);
      return complaint;
    },

    async update(id, data, user) {
      const complaint = await updateComplaint(id, data, user);
      const index = this.complaints.findIndex(
        (item) => item.id === complaint.id,
      );

      if (index >= 0) {
        this.complaints[index] = complaint;
      } else {
        this.complaints.push(complaint);
      }

      return complaint;
    },

    async loadByType(tipo) {
      this.isLoading = true;
      this.error = null;

      try {
        const complaints = await getComplaintsByType(tipo);

        if (complaints.length > 0 || !this.complaints.length) {
          this.complaints = complaints;
          return;
        }

        const normalizedTipo = String(tipo ?? "").trim().toLowerCase();
        this.complaints = this.complaints.filter((complaint) => {
          const complaintType = String(
            complaint.tipo ?? complaint.type ?? "",
          )
            .trim()
            .toLowerCase();

          return complaintType === normalizedTipo;
        });
      } catch (error) {
        this.error = error.message || "No se pudieron cargar las denuncias";
      } finally {
        this.isLoading = false;
      }
    },

    getById(id) {
      return this.complaints.find((item) => String(item.id) === String(id));
    },
  },
});
