"use client";
import {
  IconCornerUpLeft,
  IconDeviceFloppy,
  IconLoader,
  IconPlus,
} from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";
import { Employee, EmployeeColumn } from "./types/employee";
import { useFetchEmployees, useManageEmployees } from "./services/api";
import { Table } from "./components";

export default function Home() {
  const [employeeData, setEmployeeData] = useState<Employee[]>([]);
  const [requestBody, setRequestBody] = useState<Employee[]>([]);
  const [editedCells, setEditedCells] = useState<string[]>([]);
  const [notValid, setNotValid] = useState<boolean>(false);
  const [reqNotValid, setReqNotValid] = useState<boolean>(false);
  const { employees, isLoading, fetchEmployees } = useFetchEmployees();
  const {
    HttpStatusCode,
    manageEmployees,
    isLoading: isLoadingManage,
    setHttpStatusCode,
  } = useManageEmployees();

  useEffect(() => {
    if (employeeData.length === 0) {
      fetchEmployees();
    }
  }, [employeeData.length, fetchEmployees]);

  useEffect(() => {
    if (employees.length > 0) {
      setEmployeeData(employees);
    }
  }, [employees]);

  useEffect(() => {
    if (HttpStatusCode === 201) {
      setEditedCells([]);
      setRequestBody([]);
      fetchEmployees();
      setHttpStatusCode(0);
    }
  }, [HttpStatusCode, fetchEmployees, setHttpStatusCode]);

  const columns: EmployeeColumn[] = [
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "position", label: "Position" },
    { key: "phone", label: "Phone" },
    { key: "email", label: "Email" },
  ];

  const handleAddRow = () => {
    const newRow: Employee = {
      firstName: "",
      lastName: "",
      position: "",
      phone: "",
      email: "",
    };
    setEmployeeData([newRow, ...employeeData]);
  };

  const handleDataChange = useCallback(
    (editedData: Employee[]) => {
      setRequestBody(editedData);

      const hasEmptyFields = editedData.some((employee) =>
        Object.values(employee).some((value) => value.trim() === ""),
      );

      setReqNotValid(hasEmptyFields);
    },
    [setRequestBody],
  );

  const handleSave = () => {
    manageEmployees(requestBody);
    console.log("req", requestBody);
  };

  return (
    <main className="flex h-screen flex-col p-5 gap-3">
      <div className="flex flex-row items-center justify-end p-3 gap-2">
        <button
          className="cursor-pointer hover:bg-gray-200 rounded-full p-[5px]"
          onClick={handleAddRow}
        >
          <IconPlus />
        </button>

        <button
          className={`${
            isLoadingManage
              ? "cursor-not-allowed bg-yellow-200"
              : notValid || reqNotValid
              ? "cursor-not-allowed bg-red-300"
              : requestBody.length === 0
              ? "cursor-not-allowed"
              : "cursor-pointer bg-green-300"
          } hover:bg-gray-200 rounded-full p-[5px]`}
          disabled={
            isLoadingManage ||
            requestBody.length === 0 ||
            notValid ||
            reqNotValid
          }
          onClick={handleSave}
        >
          <IconDeviceFloppy />
        </button>
        <IconCornerUpLeft
          className="cursor-pointer hover:bg-gray-200 rounded-full p-[5px]"
          size={32}
        />
      </div>

      <div className="h-full overflow-auto relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <IconLoader className="animate-spin" size={32} />
          </div>
        )}
        <Table
          columns={columns}
          data={employeeData}
          onDataChange={handleDataChange}
          setTableData={setEmployeeData}
          editedCells={editedCells}
          setEditedCells={setEditedCells}
          setNotValid={setNotValid}
        />
      </div>
    </main>
  );
}
