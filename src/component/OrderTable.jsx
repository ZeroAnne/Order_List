import React from "react";
import "./OrderTable.scss";

export default function OrderTable({
  orderList,
  handleSortChange,
  orderStatusList,
  financialStatusList,
  fulfillmentStatusList,
}) {
  const tableHeaders = [
    { key: "order_name", label: "訂單編號", sort: true },
    { key: "customer_name", label: "客戶名稱", sort: false },
    { key: "total_price", label: "總額", sort: true },
    { key: "receiver_address", label: "運送地址", sort: true },
    { key: "delivery_date", label: "運送日期", sort: true },
    { key: "created_at", label: "訂單建立時間", sort: true },
    { key: "order_status", label: "訂單狀態", sort: true },
    { key: "financial_status", label: "付款狀態", sort: true },
    { key: "fulfillment_status", label: "運送狀態", sort: true },
  ];

  return (
    <table
      id="orderTable"
      className="table table-striped table-hover text-start"
    >
      <thead className="table-primary text-nowrap">
        <tr>
          <th scope="col">#</th>
          {tableHeaders?.map((item) => (
            <th
              key={item.key}
              scope="col"
              className={item.sort ? "cursor_pointer" : ""}
              onClick={item.sort ? () => handleSortChange(item.key) : undefined}
            >
              {item.label}
              {item.sort && <i className="ms-1 bi bi-arrow-down-up"></i>}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {orderList?.length > 0 ? (
          orderList.map((item, index) => {
            return (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.order_name || ""}</td>
                <td>{item.customer_name || ""}</td>
                <td>${item.total_price.toLocaleString() || ""}</td>
                <td>{item.receiver_address || ""}</td>
                <td className="text-nowrap">{item.delivery_date || ""}</td>
                <td className="text-nowrap">{item.created_at || ""}</td>
                <td>{orderStatusList[item.order_status] || "無資料"}</td>
                <td>
                  {financialStatusList[item.financial_status] || "無資料"}
                </td>
                <td>
                  {fulfillmentStatusList[item.fulfillment_status] || "無資料"}
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan="10" className="text-center">
              目前無資料
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
