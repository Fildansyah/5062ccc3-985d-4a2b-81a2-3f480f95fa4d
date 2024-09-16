import React, { useState, useEffect } from "react";
import { IconArrowDown, IconArrowUp } from "@tabler/icons-react";

interface TableProps {
  data: Array<{ [key: string]: string | number }>;
  columns: Array<{ key: string; label: string }>;
  onDataChange: (editedData: Array<{ [key: string]: string | number }>) => void;
}

const EditableTable: React.FC<TableProps> = ({
  data,
  columns,
  onDataChange,
}) => {
  const [tableData, setTableData] = useState<
    Array<{ [key: string]: string | number }>
  >([]);
  const [editedCells, setEditedCells] = useState<string[]>([]);
  const [activeCells, setActiveCells] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  } | null>(null);

  useEffect(() => setTableData(data), [data]);

  const handleSort = (columnKey: string) => {
    const direction =
      sortConfig?.key === columnKey && sortConfig.direction === "ascending"
        ? "descending"
        : "ascending";
    const sortedData = [...tableData].sort((a, b) =>
      a[columnKey] > b[columnKey]
        ? direction === "ascending"
          ? 1
          : -1
        : direction === "ascending"
        ? -1
        : 1,
    );
    setTableData(sortedData);
    setSortConfig({ key: columnKey, direction });
  };

  const handleDoubleClick = (rowIndex: number, columnKey: string) => {
    const cellKey = `${rowIndex}-${columnKey}`;
    if (!activeCells.includes(cellKey)) {
      setActiveCells((prev) => [...prev, cellKey]);
    }
  };

  const isValidEmail = (email: string, rowIndex: number) => {
    if (email === "") return true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return false;
    return isEmailUnique(email, rowIndex);
  };

  const isEmailUnique = (email: string, rowIndex: number) => {
    return !tableData.some(
      (row, index) => row.email === email && index !== rowIndex,
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    columnKey: string,
  ) => {
    const newValue = e.target.value;
    const updatedData = tableData.map((row, i) =>
      i === rowIndex ? { ...row, [columnKey]: newValue } : row,
    );

    setTableData(updatedData);

    const cellKey = `${rowIndex}-${columnKey}`;
    if (!editedCells.includes(cellKey)) {
      setEditedCells((prev) => [...prev, cellKey]);
    }

    const editedData = updatedData.filter((_, i) =>
      columns.some((col) => editedCells.includes(`${i}-${col.key}`)),
    );

    onDataChange(editedData);
  };

  const handleBlur = (rowIndex: number, columnKey: string) => {
    const cellKey = `${rowIndex}-${columnKey}`;
    setActiveCells((prev) => prev.filter((key) => key !== cellKey));
  };

  const getCellBackgroundColor = (
    rowIndex: number,
    columnKey: string,
    value: string,
  ) => {
    const cellKey = `${rowIndex}-${columnKey}`;

    const isEdited = editedCells.includes(cellKey);

    if (columnKey === "email" && isEdited) {
      if (value === "") {
        return "";
      }
      if (!isValidEmail(value, rowIndex)) {
        return "bg-red-200";
      }
    }
    return isEdited ? "bg-green-200" : "";
  };

  return (
    <table className="min-w-full border border-gray-200">
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.key}
              className={`border p-2 cursor-pointer ${
                sortConfig?.key === column.key ? "text-black" : "text-gray-500"
              }`}
              onClick={() => handleSort(column.key)}
              style={{ width: `${100 / columns.length}%` }}
            >
              <div className="flex items-center gap-1">
                {column.label}
                {sortConfig?.key === column.key &&
                  (sortConfig.direction === "ascending" ? (
                    <IconArrowUp size={16} />
                  ) : (
                    <IconArrowDown size={16} />
                  ))}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column) => (
              <td
                key={column.key}
                className={`border relative ${
                  activeCells.includes(`${rowIndex}-${column.key}`) ? "" : "p-2"
                } ${getCellBackgroundColor(
                  rowIndex,
                  column.key,
                  row[column.key] as string,
                )} h-10`}
                onDoubleClick={() => handleDoubleClick(rowIndex, column.key)}
                style={{ width: `${100 / columns.length}%` }}
              >
                {activeCells.includes(`${rowIndex}-${column.key}`) ? (
                  <input
                    type="text"
                    value={row[column.key]}
                    onChange={(e) => handleInputChange(e, rowIndex, column.key)}
                    onBlur={() => handleBlur(rowIndex, column.key)}
                    className="w-full p-2 outline-none border-b-2 border-b-blue-500"
                    autoFocus
                  />
                ) : (
                  <>
                    {row[column.key]}
                    {column.key === "email" &&
                      editedCells.includes(`${rowIndex}-${column.key}`) &&
                      !isValidEmail(row[column.key] as string, rowIndex) && (
                        <div className="absolute top-[40px] z-50 left-0 p-2 text-sm bg-red-500 text-white rounded-md">
                          {row[column.key] === ""
                            ? "Email is required"
                            : !isEmailUnique(
                                row[column.key] as string,
                                rowIndex,
                              )
                            ? "Email already exists"
                            : "Email is not valid"}
                        </div>
                      )}
                  </>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EditableTable;
