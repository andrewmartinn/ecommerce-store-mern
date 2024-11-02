import { ILoginForm } from "../utils/validator";

export interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (values: ILoginForm) => Promise<void>;
  logout: () => void;
  error: string | null;
}
