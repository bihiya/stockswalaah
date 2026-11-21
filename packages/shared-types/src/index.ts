export interface AuthenticatedUser {
  id: string;
  email: string;
  roles: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: { code: string; message: string };
  meta: { requestId?: string; timestamp: string };
}

export interface DomainEvent<T = unknown> {
  eventId: string;
  eventType: string;
  occurredAt: string;
  payload: T;
}
