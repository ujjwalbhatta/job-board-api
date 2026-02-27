export interface Tag {
  id: number;
  name: string;
}

export type CreateTagInput = Omit<Tag, "id">;
