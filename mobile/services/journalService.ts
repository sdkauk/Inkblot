import { api } from "@/utils/api";

export interface JournalEntry {
  content: string;
  createdUtc: Date;
  updatedUtc: Date;
}

export interface JournalEntryPostRequest {
  content: string;
}

export const journalService = {
  createJournalEntry: async (
    request: JournalEntryPostRequest,
  ): Promise<JournalEntry> => {
    console.log("ABOUT TO POST");
    const response = await api(`/JournalEntry`, {
      method: "POST",
      body: JSON.stringify(request),
    });
    console.log("FINISHED POSTING");

    if (!response.ok) {
      throw new Error(`Failed to create journal entry.`);
    }

    return response.json();
  },
};
