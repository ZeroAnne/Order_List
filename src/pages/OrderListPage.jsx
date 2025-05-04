import React, { useEffect, useState } from "react";
import "./OrderListPage.scss";
import axios from "../hook/axios";
import OrderTable from "../component/OrderTable";
import TablePagination from "../component/TablePagination";
import Filters from "../component/Filters";
import { useNavigate } from "react-router-dom";

export default function OrderListPage() {
  const navigate = useNavigate();

  const [orderList, setOrderList] = useState([]);
  const [paginationParams, setPaginationParams] = useState({
    page: 0,
    size: 20,
    sort_by: "created_at",
    is_descending: true, //升降
    city: [], //城市
    delivery_date: null, //運送日期
    order_status: null, //訂單狀態
    financial_status: null, //付款狀態
    fulfillment_status: null, //運送狀態
  });
  const [totalPages, setTotalPages] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [pageInput, setPageInput] = useState("1"); //欲前往的頁碼
  const username = localStorage.getItem("username");

  //選項對應表
  const orderStatusList = {
    open: "處理中",
    cancelled: "已取消",
    closed: "已完成",
  };

  const financialStatusList = {
    paid: "已付款",
    pending: "待付款",
    refunded: "已退款",
  };

  const fulfillmentStatusList = {
    received: "已收到",
    preparing: "備貨中",
  };

  // function to fetch order list
  const getOrderList = async () => {
    try {
      const res = await axios.get("/orders", {
        params: paginationParams,
      });
      setOrderList(res.data.content);
      setTotalPages(res.data.total_pages);
      setTotalOrders(res.data.total_elements);
    } catch (error) {
      console.log("Error fetching order list:", error);
      if (error.response?.status === 401) {
        alert("請先登入");
        navigate("/login");
      }
    }
  };

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setPaginationParams((prev) => ({
      ...prev,
      page: pageNumber - 1, // Adjust for 0-based indexing
    }));
  };

  // Function to handle sort change
  const handleSortChange = (sort) => {
    setPaginationParams((prev) => ({
      ...prev,
      sort_by: sort,
      is_descending: prev.sort_by === sort ? !prev.is_descending : true,
      page: 0, //回到第一頁
    }));
  };

  // Function to handle filter change
  const handleFilterChange = (newFilters) => {
    setPaginationParams((prev) => ({
      ...prev,
      ...newFilters,
      page: 0, //回到第一頁
    }));
  };

  //handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  console.log(paginationParams);
  useEffect(() => {
    getOrderList();
  }, [paginationParams]);

  return (
    <main id="OrderListPage" className="text-start">
      <div className="d-flex justify-content-between align-items-center">
        <h1>訂單清單</h1>
        <div className="d-flex align-items-center">
          <p className="m-0 me-3">你好，{username}</p>
          <button className="btn btn-outline-secondary" onClick={handleLogout}>
            登出
          </button>
        </div>
      </div>

      {/* 篩選 */}
      <Filters handleFilterChange={handleFilterChange} />
      {/* 頁碼 */}
      <TablePagination
        className={"mb-3"}
        totalPages={totalPages}
        totalOrders={totalOrders}
        currentPage={paginationParams.page + 1}
        onPageChange={handlePageChange}
        setPageInput={setPageInput}
        pageInput={pageInput}
      />
      {/* 表格清單 */}
      <OrderTable
        orderList={orderList}
        handleSortChange={handleSortChange}
        // 選項對應表
        orderStatusList={orderStatusList}
        financialStatusList={financialStatusList}
        fulfillmentStatusList={fulfillmentStatusList}
      />
      {/* 頁碼 */}
      <TablePagination
        totalPages={totalPages}
        totalOrders={totalOrders}
        currentPage={paginationParams.page + 1}
        onPageChange={handlePageChange}
        setPageInput={setPageInput}
        pageInput={pageInput}
      />
    </main>
  );
}
