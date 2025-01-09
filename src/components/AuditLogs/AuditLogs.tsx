"use client";
import { RootState } from "@/libs/redux/store";
import { AuditLogType } from "@/types/auditLogType";
import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function AuditLogs() {
  const { auditLogs, features } = useSelector(
    (state: RootState) => state.systemFeatures
  );

  const [auditExpanded, setAuditExpanded] = useState(false);
  const [filteredLogs, setFilteredLogs] = useState<AuditLogType[]>(auditLogs);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFeature = e.target.value;
    if (selectedFeature === "all") {
      setFilteredLogs(auditLogs);
    } else {
      const filteredLogs = auditLogs.filter(
        (log) => log.featureName === selectedFeature
      );
      setFilteredLogs(filteredLogs);
    }
  };

  useEffect(() => {
    setFilteredLogs(auditLogs);
  }, [auditLogs]);

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
        {auditLogs.length > 0 && (
          <select
            onChange={(e) => handleSelectChange(e)}
            className="bg-[#1b1f23] border border-gray-500 rounded p-1"
          >
            <option value="all">All Features</option>
            {features.map((feature) => (
              <option key={feature.id} value={feature.name}>
                {feature.name}
              </option>
            ))}
          </select>
        )}
        {auditExpanded ? <FaChevronUp /> : <FaChevronDown />}
      </label>
      {auditExpanded && (
        <div className="p-2 bg-[#1b1f23] border-t border-gray-500">
          {filteredLogs.length === 0 ? (
            <p className="text-center">No Audit Logs</p>
          ) : (
            <div className="max-h-[400px] overflow-auto">
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
                <tbody className="divide-y divide-gray-200">
                  {filteredLogs
                    ?.slice()
                    .reverse()
                    .map((log: AuditLogType) => (
                      <tr key={log.id} className="md:space-y-2 text-center">
                        <td className="px-6 py-4 whitespace-nowrap">
                          {log.featureName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {log.timestamp}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {log.previousState ? "On" : "Off"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {log.newState ? "On" : "Off"}
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
