export class CreateHebergementsDto {
  company_name: string;
  host_lastname: string;
  host_email: string;
  host_firstname: string;
  img_url: string;
}

export class CreateHebergementResponse {
  company_name: string;
  host_lastname: string;
  host_email: string;
  host_firstname: string;
  private_code: string;
  salt: string;
  code: string;
  img_url: string;
  slug: string;
  token: string;
}
