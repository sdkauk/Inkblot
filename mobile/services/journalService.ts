import { api } from "@/utils/api";

export interface JournalEntry {
  id: string;
  content: string;
  createdUtc: string;
  updatedUtc: string;
}

export interface JournalEntryPostRequest {
  content: string;
}

export const journalService = {
  createJournalEntry: async (
    request: JournalEntryPostRequest,
  ): Promise<JournalEntry> => {
    const response = await api(`/JournalEntry`, {
      method: "POST",
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Failed to create journal entry.`);
    }

    return response.json();
  },

  getJournalEntries: async (): Promise<JournalEntry[]> => {
    const response = await api(`/JournalEntry`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Failed to get journal entries`);
    }

    return response.json();
  },

  getJournalEntry: async (id: string): Promise<JournalEntry> => {
    const response = await api(`/JournalEntry/${id}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Failed to get journal entry`);
    }

    return response.json();
  },
};
