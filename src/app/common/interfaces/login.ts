export interface LoginBodyI {
  document_type_id: string;
  document_number: string;
  password: string;
}

export interface TwoFaBodyI extends LoginBodyI {
  two_factor_authentication_number: number;
}
