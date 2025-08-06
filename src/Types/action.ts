export type ActionResponse = {
  success: boolean;
  message: string;
  error?: string;
  errors?: Record<string, string[]>;
};

export type Action = { type: "OPEN_MENU" } | { type: "CLOSE_MENU" };
