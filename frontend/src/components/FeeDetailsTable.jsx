import React, { useState } from 'react';

const FeeTable = ({ fees, totalFee }) => {

    //convert the coming amount from fee into integer
    fees.forEach((fee) => {
        fee.amount = parseInt(fee.amount);
    });

  return (
    <div className="container mx-auto px-4 py-2">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Semester</th>
            <th className="border px-4 py-2">Fee Paid</th>
          </tr>
        </thead>
        <tbody>
          {fees.map((fee, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{fee.date}</td>
              <td className="border px-4 py-2">{fee.semester}</td>
              <td className="border px-4 py-2">{fee.amount}</td>
            </tr>
          ))}
          <tr>
            <td className="border px-4 py-2 font-bold">Total</td>
            <td className="border px-4 py-2"></td>
            <td className="border px-4 py-2">{fees.reduce((total, fee) => total + fee.amount, 0)}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-bold">Total Fee</td>
            <td className="border px-4 py-2"></td>
            <td className="border px-4 py-2">{totalFee}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-bold">Remaining</td>
            <td className="border px-4 py-2"></td>
            <td className="border px-4 py-2">{totalFee - fees.reduce((total, fee) => total + fee.amount, 0)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FeeTable;
