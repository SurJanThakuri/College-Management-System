import React, { useState } from 'react';

function SemesterRow({ semester, fees, due, paymentLogs }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            <tr onClick={() => setIsExpanded(!isExpanded)} className="cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{semester}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{fees}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{due}</div>
                </td>
            </tr>
            {isExpanded && (
                <tr>
                    <td colSpan="3">
                        <div className="px-6 py-4">
                            <h3 className="font-bold mb-2">Payment Logs:</h3>
                            <ul>
                                {paymentLogs.map((log, index) => (
                                    <li key={index} className="text-sm text-gray-900">{log.date}: {log.description}</li>
                                ))}
                            </ul>
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
}

function FeeDetailsTable({ data }) {
    return (
        <table className="min-w-full divide-y divide-gray-200 border border-black">
            <thead className="bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                        Semester
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                        Fees
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                        Due
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item, index) => (
                    <SemesterRow key={index} semester={item.semester} fees={item.fees} due={item.due} paymentLogs={item.paymentLogs} />
                ))}
            </tbody>
        </table>
    );
}

export default FeeDetailsTable;
