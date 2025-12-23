"use client";
import React, { useEffect, useRef, useMemo, useState } from "react";
import { useApiRequest } from "../../hooks/useApi";
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
import { useAuth } from "@/context/AuthContext";
import { useSocket } from "@/hooks/useSocket";
import { socket } from "@/sockets/socket"; // ✅ import ที่หายไป

export default function useHook() {
  const { user } = useAuth();
  const { FetchAllFormStatusApproved, pullClaimData, pdfOpd } = useApiRequest();
  const didFetch = useRef(false); // 🔑 flag ป้องกันเบิ้ล
  const [openModalIPD, setOpenModalIPD] = useState(false);
  const [openModalOPD, setOpenModalOPD] = useState(false);
  const [openModalViewOPD, setOpenModalViewOPD] = useState(false);
  const [openModalViewIPD, setOpenModalViewIPD] = useState(false);
  const [openModalUnApprove, setOpenModalUnApprove] = useState(false);
  const [previewPdfModal, setPreviewPdfModal] = useState(false);
  const [openModalApprove, setOpenModalApprove] = useState(false);
  const handleOpenModal = () => {
    setOpenModalIPD((prev) => !prev);
  };

  const [patData, setPatData] = useState(null);
  const [hn, setHn] = useState("");
  const [order, setOrder] = useState([]);

  const [claimId, setClaimId] = useState("");
  const [changeStatus, setChangeStatus] = useState("");
  const [selectID, setSelectID] = useState("");
  const [claimData, setClaimData] = useState(null);
  const [filterValue, setFilterValue] = useState("");
  // const [statusFilter, setStatusFilter] = useState(
  //   new Set(["pending", "draft"])
  // );
  const [formFilter, setFormFilter] = useState(new Set(["OPD", "IPD"]));
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [patReg, setPatReg] = useState("");
  const [visitId, setVisitId] = useState("");
  const [base64PdfOpd, setBase64PdfOpd] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (didFetch.current) return; // check flag ก่อน
    didFetch.current = true;
    FetchAllFormStatusApproved()
      .then((data) => setOrder(data || []))
      .catch(console.error);
  }, [FetchAllFormStatusApproved]);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
  }, []);

  useEffect(() => {
    socket.emit("join:claim", claimId);
    socket.emit("join:role", "doctor"); // หรือ role ของ user
    // socket.emit("join:role", "staff"); // หรือ role ของ user

    return () => {
      socket.emit("leave:claim", claimId);
      socket.emit("leave:role", "doctor");
      // socket.emit("leave:role", "staff");
    };
  }, [claimId]);

  useSocket(async (payload) => {
    const list = await FetchAllFormStatusApproved();
    setOrder(list);
  });

  useEffect(() => {
    // if (didFetch.current) return; // check flag ก่อน
    // didFetch.current = true;
    if (!openModalOPD && !openModalIPD) return;
    if (!hn && !patReg && !visitId) return;
    if (openModalOPD) {
      const fetchData = async () => {
        const data = await pullDataOpd(hn, patReg);
        setPatData(data);
      };

      fetchData();
    }
    if (openModalIPD) {
      const fetchData = async () => {
        const data = await pullDataIpd(hn, visitId);
        setPatData(data);
      };

      fetchData();
    }
  }, [openModalOPD, openModalIPD, hn, patReg, visitId]);

  useEffect(() => {
    if (
      !openModalViewOPD &&
      !openModalViewIPD &&
      !openModalApprove &&
      !openModalUnApprove
    )
      return;
    if (!claimId) return;
    const fetchDataView = async () => {
      const data = await pullClaimData(claimId, setClaimData);
      setClaimData(data);
    };

    fetchDataView();
  }, [
    openModalViewOPD,
    openModalViewIPD,
    openModalApprove,
    openModalUnApprove,
    selectID,
  ]);

  useEffect(() => {
    if (!previewPdfModal) return;
    if (!claimId) return;

    const pdfOpdBase64 = async () => {
      setLoading(true); // เริ่มโหลด
      const data = await pdfOpd(claimId);
      setBase64PdfOpd(data);
      setLoading(false);
    };

    pdfOpdBase64();
  }, [claimId, previewPdfModal]);

  const status = [
    { uid: "pending", name: "Pending" },
    { uid: "draft", name: "Draft" },
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

      filtered = filtered.filter((item) =>
        String(item.patientId || "")
          .toLowerCase()
          .includes(keyword)
      );
    }
    // if (statusFilter.size > 0) {
    //   filtered = filtered.filter((item) => statusFilter.has(item.status));
    // }
    if (formFilter.size > 0) {
      filtered = filtered.filter((item) => formFilter.has(item.claimType));
    }
    return filtered;
  }, [order, filterValue, formFilter]);

  const pages =
    Math.ceil(
      filteredItems.filter((item) => item.status === "success").length /
        rowsPerPage
    ) || 1;

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
    openModalViewIPD,
    setOpenModalViewIPD,
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
    setPatReg,
    // FetchAllForm,
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
    // statusFilter,
    // setStatusFilter,
    setVisitId,
    forms,
    formFilter,
    setFormFilter,
    FetchAllFormStatusApproved,
    openModalUnApprove,
    setOpenModalUnApprove,
    changeStatus,
    setChangeStatus,
    previewPdfModal,
    setPreviewPdfModal,
    base64PdfOpd,
    loading,
    openModalApprove,
    setOpenModalApprove,
  };
}
