"use client";
import React, { useEffect, useRef, useMemo, useState } from "react";
import { useApiRequest } from "../../hooks/useApi";
import { colgroup } from "framer-motion/client";
import { useSocket } from "@/hooks/useSocket";
import { useAuth } from "@/context/AuthContext";
import { socket } from "@/sockets/socket"; // ✅ import ที่หายไป

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export default function useHook() {
  const { user } = useAuth();
  const { pullDataOpd, pullDataIpd, pullClaimData, FetchAllForm } =
    useApiRequest();
  const didFetch = useRef(false); // 🔑 flag ป้องกันเบิ้ล
  const modalRef = useRef(null);
  const [openModalIPD, setOpenModalIPD] = useState(false);
  const [openModalOPD, setOpenModalOPD] = useState(false);
  const [openModalEditIPD, setOpenModalEditIPD] = useState(false);
  const [openModalEditOPD, setOpenModalEditOPD] = useState(false);
  const [openModalViewIPD, setOpenModalViewIPD] = useState(false);
  const [openModalViewOPD, setOpenModalViewOPD] = useState(false);
  const [openModalApprove, setOpenModalApprove] = useState(false);
  const [patData, setPatData] = useState(null);
  const [hn, setHn] = useState("");
  const [order, setOrder] = useState([]);
  const [claimId, setClaimId] = useState("");
  const [changeStatus, setChangeStatus] = useState("");
  const [selectID, setSelectID] = useState("");
  const [claimData, setClaimData] = useState(null);
  const [filterValue, setFilterValue] = useState("");
  const [statusFilter, setStatusFilter] = useState(
    new Set(["pending", "draft", "unapproved", "s_unapproved"])
  );
  const [formFilter, setFormFilter] = useState(new Set(["OPD", "IPD"]));
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [patReg, setPatReg] = useState("");
  const [visitId, setVisitId] = useState("");

  useEffect(() => {
    if (didFetch.current) return; // check flag ก่อน
    didFetch.current = true;
    FetchAllForm()
      .then((data) => setOrder(data || []))
      .catch(console.error);
  }, [FetchAllForm]);

  // connect ครั้งเดียว

  // // ฟัง realtime

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
  }, []);

  useEffect(() => {
    socket.emit("join:claim", claimId);
    socket.emit("join:role", "doctor"); // หรือ role ของ user
    socket.emit("join:role", "staff"); // หรือ role ของ user

    return () => {
      socket.emit("leave:claim", claimId);
      socket.emit("leave:role", "doctor");
      socket.emit("join:role", "staff"); // หรือ role ของ user
    };
  }, [claimId]);
  // 🔹 subscribe socket event
  useSocket(async (payload) => {
    const list = await FetchAllForm();
    setOrder(list);
  });

  useEffect(() => {
    if (
      !openModalOPD &&
      !openModalIPD &&
      !openModalEditOPD &&
      !openModalEditIPD
    )
      return;
    if (!hn && !patReg && !visitId) return;

    const fetchData = async () => {
      let data = null;

      if (openModalOPD) {
        data = await pullDataOpd(hn, patReg);
      }
      if (openModalIPD) {
        data = await pullDataIpd(hn, visitId);
      }
      if (openModalEditOPD) {
        data = await pullDataOpd(hn, patReg);
      }
      if (openModalEditIPD) {
        data = await pullDataIpd(hn, visitId);
      }
      if (data) {
        setPatData(data);
      }
    };
    fetchData();
  }, [
    openModalOPD,
    openModalIPD,
    openModalEditOPD,
    openModalEditIPD,
    hn,
    patReg,
    visitId,
    claimId,
  ]);

  useEffect(() => {
    if (
      !openModalViewOPD &&
      !openModalViewIPD &&
      !openModalEditIPD &&
      !openModalEditOPD &&
      !openModalApprove
    )
      return;

    if (!claimId) return;

    // 🔒 ป้องกัน fetch ซ้ำ

    const fetchDataView = async () => {
      const data = await pullClaimData(claimId);
      if (data) {
        setClaimData(data);
      }
    };

    fetchDataView();
  }, [
    openModalViewOPD,
    openModalViewIPD,
    openModalEditOPD,
    openModalEditIPD,
    openModalApprove,
    claimId,
  ]);

  const status = [
    { uid: "pending", name: "Pending" },
    { uid: "draft", name: "Draft" },
    { uid: "unapproved", name: "Unapproved" },
    { uid: "s_unapproved", name: "Staff Unapproved" },
  ];
  const forms = [
    { uid: "OPD", name: "OPD" },
    { uid: "IPD", name: "IPD" },
  ];

  const filteredItems = useMemo(() => {
    if (!Array.isArray(order)) return [];
    let filtered = [...order];

    if (filterValue) {
      const keyword = filterValue.toLowerCase();

      filtered = filtered.filter(
        (item) =>
          String(item.patientId || "")
            .toLowerCase()
            .includes(keyword) ||
          String(`${item?.patient?.firstname} ${item?.patient?.lastname}` || "")
            .toLowerCase()
            .includes(keyword)
      );
    }
    if (statusFilter.size > 0) {
      filtered = filtered.filter((item) => statusFilter.has(item.status));
    }
    if (formFilter.size > 0) {
      filtered = filtered.filter((item) => formFilter.has(item.claimType));
    }
    return filtered;
  }, [order, filterValue, statusFilter, formFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1;

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const onRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  };

  const columns = [
    { uid: "id", name: "ID" },
    { uid: "form_type", name: "FORM TYPE" },
    { uid: "hn", name: "HN" },
    { uid: "name", name: "NAME" },
  ];

  const [sortDescriptor, setSortDescriptor] = useState({
    column: null,
    direction: "ascending",
  });

  const sortedItems = useMemo(() => {
    if (!sortDescriptor.column) {
      return [...items].sort((a, b) => b.id - a.id);
    }

    return [...items].sort((a, b) => {
      const first = `${a.patient?.prename || ""}${a.patient?.firstname || ""} ${a.patient?.lastname || ""}`;
      const second = `${b.patient?.prename || ""}${b.patient?.firstname || ""} ${b.patient?.lastname || ""}`;
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [items, sortDescriptor]);

  const onSortChange = (column) => {
    if (sortDescriptor.column === column) {
      setSortDescriptor({
        column,
        direction:
          sortDescriptor.direction === "ascending" ? "descending" : "ascending",
      });
    } else {
      setSortDescriptor({ column, direction: "ascending" });
    }
  };

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const [visibleColumns, setVisibleColumns] = useState(
    new Set(["id", "form_type", "hn", "name"])
  );

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((col) => visibleColumns.has(col.uid));
  }, [visibleColumns, columns]);

  const onClear = () => setFilterValue("");

  return {
    openModalIPD,
    setOpenModalIPD,
    openModalOPD,
    setOpenModalOPD,
    openModalViewOPD,
    setOpenModalViewOPD,
    order,
    patData,
    setHn,
    setPatData,
    claimId,
    setClaimId,
    selectID,
    setSelectID,
    claimData,
    setClaimData,
    setPatReg,
    FetchAllForm,
    setOrder,
    filterValue,
    setFilterValue,
    visibleColumns,
    setVisibleColumns,
    columns,
    filteredItems,
    rowsPerPage,
    onRowsPerPageChange,
    headerColumns,
    sortDescriptor,
    sortedItems,
    page,
    pages,
    setPage,
    onClear,
    // selectedKeys,
    // setSelectedKeys,
    capitalize,
    onSortChange,
    selectedValue,
    status,
    statusFilter,
    setStatusFilter,
    setVisitId,
    forms,
    formFilter,
    setFormFilter,
    openModalEditIPD,
    setOpenModalEditIPD,
    openModalEditOPD,
    setOpenModalEditOPD,
    changeStatus,
    setChangeStatus,
    openModalApprove,
    setOpenModalApprove,
    modalRef,
  };
}
