export interface Employee {
  id?: string | undefined;
  firstName: string;
  lastName: string;
  position: string;
  phone: string;
  email: string;
}

export interface EmployeeColumn {
  key: string;
  label: string;
}
