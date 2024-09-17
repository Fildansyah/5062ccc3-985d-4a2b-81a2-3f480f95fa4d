import axios from "axios";
import { useState } from "react";
import { Employee } from "../types/employee";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-type": "application/json",
  },
});

const useFetchEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchEmployees = async () => {
    try {
      const response = await apiClient.get("/employees/all");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { employees, isLoading, fetchEmployees };
};

const useManageEmployees = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [HttpStatusCode, setHttpStatusCode] = useState<number>(0);

  const manageEmployees = async (employees: Employee[]) => {
    try {
      setIsLoading(true);
      const response = await apiClient.post("/employees/manage", employees);
      setHttpStatusCode(response.status);
    } catch (error) {
      console.error("Error creating employees:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, HttpStatusCode, manageEmployees, setHttpStatusCode };
};

export { apiClient, useFetchEmployees, useManageEmployees };
