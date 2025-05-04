import React, { useState } from "react";

export default function Filters({ handleFilterChange }) {
  const [filters, setFilters] = useState({
    city: [],
    delivery_date: "",
    order_status: "",
    financial_status: "",
    fulfillment_status: "",
  });

  //可篩選城市
  const cityList = [
    { label: "台北市", value: "台北市" },
    { label: "新北市", value: "新北市" },
    { label: "新竹市", value: "新竹市" },
    { label: "台南市", value: "台南市" },
    { label: "高雄市", value: "高雄市" },
  ];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleCityChange = (e) => {
    const { value, checked } = e.target;
    setFilters((prev) => {
      const updatedCities = checked
        ? [...prev.city, value]
        : prev.city.filter((city) => city !== value);
      return {
        ...prev,
        city: updatedCities,
      };
    });
  };

  const applyFilters = () => {
    const transformed = {
      ...filters,
      delivery_date: filters.delivery_date || null,
      order_status: filters.order_status || null,
      financial_status: filters.financial_status || null,
      fulfillment_status: filters.fulfillment_status || null,
    };
    handleFilterChange(transformed);
  };
  //重設
  const resetFilters = () => {
    const defaultFilters = {
      city: [],
      delivery_date: "",
      order_status: "",
      financial_status: "",
      fulfillment_status: "",
    };
    setFilters(defaultFilters);
    // 給API轉為 null
    const transformed = {
      city: [],
      delivery_date: null,
      order_status: null,
      financial_status: null,
      fulfillment_status: null,
    };
    handleFilterChange(transformed);
  };

  return (
    <section>
      <div className="input-group">
        <div className="input-group-text" htmlFor="city">
          運送城市
          <div className="ms-3 d-flex align-items-center gap-3 flex-wrap">
            {cityList.map((city) => (
              <div className="form-check" key={city.value}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={city.value}
                  id={`city-${city.value}`}
                  checked={filters.city.includes(city.value)}
                  onChange={handleCityChange}
                />
                <label
                  className="form-check-label"
                  htmlFor={`city-${city.value}`}
                >
                  {city.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="d-flex my-3 gap-2">
        <div className="input-group">
          <label className="input-group-text" htmlFor="order_status">
            運送日期
          </label>
          <input
            type="date"
            className="form-control"
            id="delivery_date"
            value={filters.delivery_date}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label className="input-group-text" htmlFor="order_status">
            訂單狀態
          </label>
          <select
            className="form-select"
            id="order_status"
            value={filters.order_status}
            onChange={handleChange}
          >
            <option value="">全部</option>
            <option value="open">處理中</option>
            <option value="cancelled">已取消</option>
            <option value="closed">已完成</option>
          </select>
        </div>

        <div className="input-group">
          <label className="input-group-text" htmlFor="financial_status">
            付款狀態
          </label>
          <select
            className="form-select"
            id="financial_status"
            value={filters.financial_status}
            onChange={handleChange}
          >
            <option value="">全部</option>
            <option value="paid">已付款</option>
            <option value="pending">待付款</option>
            <option value="refunded">已退款</option>
          </select>
        </div>

        <div className="input-group">
          <label className="input-group-text" htmlFor="fulfillment_status">
            運送狀態
          </label>
          <select
            className="form-select"
            id="fulfillment_status"
            value={filters.fulfillment_status}
            onChange={handleChange}
          >
            <option value="">全部</option>
            <option value="received">已收到</option>
            <option value="preparing">備貨中</option>
          </select>
        </div>
        <button className="btn btn-primary text-nowrap" onClick={applyFilters}>
          套用
        </button>
        <button
          className="btn btn-outline-primary text-nowrap"
          onClick={resetFilters}
        >
          重設
        </button>
      </div>
    </section>
  );
}
