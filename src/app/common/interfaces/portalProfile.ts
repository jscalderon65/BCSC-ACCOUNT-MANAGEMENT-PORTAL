export interface PortalProfileI {
  _id: string;
  email: string;
  password: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  birth_date: string;
  document_type_id: string;
  document_number: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  two_factor_authentication_number?: string | null;
}
