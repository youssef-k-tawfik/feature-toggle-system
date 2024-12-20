"use client";
import { RootState } from "@/redux/store";
import { AuditLogType } from "@/types/auditLogType";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function AuditLogs() {
  const { auditLogs } = useSelector((state: RootState) => state.systemFeatures);

  const [auditExpanded, setAuditExpanded] = useState(false);

  return (
    <div className="mt-4 bg-[#1b1f23] p-2 rounded-lg border border-gray-500">
      <label
        htmlFor="auditLogsCheckBox"
        className="flex items-center justify-between cursor-pointer p-2"
      >
        <input
          type="checkbox"
          id="auditLogsCheckBox"
          hidden
          onChange={() => setAuditExpanded((prev) => !prev)}
        />
        <span>Audit Logs</span>
        {auditExpanded ? <FaChevronUp /> : <FaChevronDown />}
      </label>
      {auditExpanded && (
        <div className="p-2 bg-[#1b1f23] border-t border-gray-500">
          {auditLogs.length === 0 ? (
            <p className="text-center">No Audit Logs</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="text-center">
                  <tr>
                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                      Feature Name
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                      Timestamp
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                      Previous State
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                      New State
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                      Changed By
                    </th>
                  </tr>
                </thead>
                <tbody className=" divide-y divide-gray-200">
                  {auditLogs?.map((log: AuditLogType) => (
                    <tr key={log.id} className="md:space-y-2 text-center">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {log.featureName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {log.timestamp}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {log.previousState.toString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {log.newState.toString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {log.changedBy}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
