export class CreateHebergementsDto {
  company_name: string;
  host_lastname: string;
  host_email: string;
  host_firstname: string;
}

export class CreateHebergementResponse {
  company_name: string;
  host_lastname: string;
  host_email: string;
  host_firstname: string;
  private_code: string;
  salt: string;
  code: string;
}
