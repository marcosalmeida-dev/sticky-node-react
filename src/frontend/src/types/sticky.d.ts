export interface StickyNote {
    _id: string;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface CreateStickyNoteDto {
    title: string;
    description: string;
  }
  
  export interface UpdateStickyNoteDto {
    title?: string;
    description?: string;
  }
  