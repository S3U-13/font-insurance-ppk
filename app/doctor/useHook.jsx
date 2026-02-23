"use client";
import React, { useEffect, useRef, useMemo, useState } from "react";
import { useApiRequest } from "@/hooks/useApi";
import { colgroup } from "framer-motion/client";
import { useSocket } from "@/hooks/useSocket";
import { useAuth } from "@/context/AuthContext";
import { socket } from "@/sockets/socket"; // ✅ import ที่หายไป
import { useSearchParams } from "next/navigation";
import { useRouter, usePathname } from "next/navigation";

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export default function useHook() {
  const { user } = useAuth();
  const {
    pullDataOpd,
    pullClaimData,
    pullClaimPartBData,
    FetchAllForm,
    FetchDiag,
    pdfOpd,
    pdfIpdPartA,
    pdfIpdPartB,
  } = useApiRequest();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const didFetch = useRef(false); // 🔑 flag ป้องกันเบิ้ล

  const [openModalIPD, setOpenModalIPD] = useState(false);
  const [openModalOPD, setOpenModalOPD] = useState(false);
  const [openModalEditIPD, setOpenModalEditIPD] = useState(false);
  const [openModalEditOPD, setOpenModalEditOPD] = useState(false);
  const [openModalViewIPD, setOpenModalViewIPD] = useState(false);
  const [openModalViewOPD, setOpenModalViewOPD] = useState(false);
  const [openModalAddPatient, setOpenModalAddPatient] = useState(false);

  const [patData, setPatData] = useState(null);
  const [hn, setHn] = useState("");
  const [order, setOrder] = useState([]);
  const [claimId, setClaimId] = useState("");
  const [changeStatus, setChangeStatus] = useState("");
  const [selectID, setSelectID] = useState("");
  const [claimOPDData, setClaimOPDData] = useState(null);
  const [claimIPDData, setClaimIPDData] = useState(null);
  const [filterValue, setFilterValue] = useState("");
  const [statusFilter, setStatusFilter] = useState(
    new Set(["pending", "draft", "unapproved", "s_unapproved"]),
  );
  const [formFilter, setFormFilter] = useState(new Set([]));
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [patReg, setPatReg] = useState("");
  const [visitId, setVisitId] = useState("");

  useEffect(() => {
    const callbackQuery = sessionStorage.getItem("callbackQuery");

    if (callbackQuery) {
      const { hn, patregId, claimid } = JSON.parse(callbackQuery);

      const query = `?claimid=${claimid}&hn=${hn}&patregId=${patregId}`;

      router.replace(`/doctor${query}`);

      // ลบหลังจากใช้แล้ว
      sessionStorage.removeItem("callbackQuery");
    }
  }, []);

  useEffect(() => {
    if (didFetch.current) return; // check flag ก่อน
    didFetch.current = true;
    FetchAllForm()
      .then((data) => setOrder(data || []))
      .catch(console.error);
  }, [FetchAllForm]);

  useEffect(() => {
    const claimid = searchParams.get("claimid");
    const hnParam = searchParams.get("hn");
    const patregId = searchParams.get("patregId");

    if (claimid && hnParam && patregId) {
      setClaimId(Number(claimid));
      setHn(Number(hnParam));
      setPatReg(Number(patregId));
    }
  }, [searchParams]);

  // useEffect(() => {
  //   console.log("claimData updated:", claimData);
  // }, [claimData]);

  useEffect(() => {
    if (!claimId || !hn || !patReg) return;
    if (claimId && hn && patReg) {
      setOpenModalOPD(true);
    }
  }, [claimId, hn, patReg]);

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

  // useEffect(() => {
  //   if (
  //     !openModalOPD &&
  //     !openModalIPD &&
  //     !openModalEditOPD &&
  //     !openModalEditIPD
  //   )
  //     return;
  //   if (!hn && !patReg && !visitId) return;

  //   const fetchData = async () => {
  //     let data = null;

  //     if (openModalOPD) {
  //       data = await pullDataOpd(hn, patReg);
  //     }
  //     if (openModalIPD) {
  //       data = await pullDataIpd(hn, visitId);
  //     }
  //     if (openModalEditOPD) {
  //       data = await pullDataOpd(hn, patReg);
  //     }
  //     if (openModalEditIPD) {
  //       data = await pullDataIpd(hn, visitId);
  //     }
  //     if (data) {
  //       setPatData(data);
  //     }
  //   };
  //   fetchData();
  // }, [
  //   openModalOPD,
  //   openModalIPD,
  //   openModalEditOPD,
  //   openModalEditIPD,
  //   hn,
  //   patReg,
  //   visitId,
  //   claimId,
  // ]);

  useEffect(() => {
    if (!openModalOPD || !hn || !patReg || !claimId) return;

    const fetchData = async () => {
      let data;
      if (openModalOPD) {
        const [dataPat, dataDiag] = await Promise.all([
          pullDataOpd(hn, patReg),
          FetchDiag(claimId),
        ]);
        data = { ...dataPat, ...dataDiag };
      }

      if (data) {
        setPatData(data);
      }
    };
    fetchData();
  }, [openModalOPD, hn, patReg, claimId]);

  useEffect(() => {
    if (
      !openModalViewOPD &&
      !openModalViewIPD &&
      !openModalEditIPD &&
      !openModalEditOPD
    )
      return;

    if (!claimId) return;

    // 🔒 ป้องกัน fetch ซ้ำ

    const fetchDataView = async () => {
      let data;
      if (openModalEditOPD || openModalViewOPD) {
        data = await pullClaimData(claimId);
        if (data) {
          setClaimOPDData(data);
        }
      } else if (openModalEditIPD || openModalViewIPD) {
        const [partA, partB, diagData] = await Promise.all([
          pullClaimData(claimId),
          pullClaimPartBData(claimId),
          FetchDiag(claimId),
        ]);
        data = { ...partA, partB, ...diagData };
        if (data) {
          setClaimIPDData(data);
        }
      }
    };

    fetchDataView();
  }, [
    openModalViewOPD,
    openModalViewIPD,
    openModalEditOPD,
    openModalEditIPD,
    claimId,
  ]);
  const [previewPdfOPDModal, setPreviewPdfOPDModal] = useState(false);
  const [previewPdfIpdPartAModal, setPreviewPdfIpdPartAModal] = useState(false);
  const [previewPdfIpdPartBModal, setPreviewPdfIpdPartBModal] = useState(false);
  const [base64PdfOpd, setBase64PdfOpd] = useState(null);
  const [base64PdfIpdPartA, setBase64PdfIpdPartA] = useState(null);
  const [base64PdfIpdPartB, setBase64PdfIpdPartB] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!claimId) return;
    const fetchPdf = async () => {
      try {
        setLoading(true);

        if (previewPdfOPDModal) {
          const data = await pdfOpd(claimId);
          setBase64PdfOpd(data);
        }

        if (previewPdfIpdPartAModal) {
          const data = await pdfIpdPartA(claimId);
          setBase64PdfIpdPartA(data);
        }

        if (previewPdfIpdPartBModal) {
          const data = await pdfIpdPartB(claimId);
          setBase64PdfIpdPartB(data);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPdf();
  }, [
    claimId,
    previewPdfOPDModal,
    previewPdfIpdPartAModal,
    previewPdfIpdPartBModal,
  ]);

  // const status = [
  //   { uid: "pending", name: "Pending" },
  //   { uid: "draft", name: "Draft" },
  //   { uid: "unapproved", name: "Unapproved" },
  //   { uid: "s_unapproved", name: "Staff Unapproved" },
  // ];
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
            .includes(keyword),
      );
    }
    // if (statusFilter.size > 0) {
    //   filtered = filtered.filter((item) => statusFilter.has(item.status));
    // }
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
    [selectedKeys],
  );

  const [visibleColumns, setVisibleColumns] = useState(
    new Set(["id", "form_type", "hn", "name"]),
  );

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((col) => visibleColumns.has(col.uid));
  }, [visibleColumns, columns]);

  const onClear = () => setFilterValue("");

  const handleCloseModalOPD = () => {
    setOpenModalOPD(false);

    setClaimId(null);
    setHn(null);
    setPatReg(null);
    setPatData(null);

    router.replace(pathname); // 🔥 ล้าง query ออกจาก url
  };

  return {
    openModalIPD,
    setOpenModalIPD,
    openModalOPD,
    setOpenModalOPD,
    openModalViewOPD,
    setOpenModalViewOPD,
    openModalViewIPD,
    setOpenModalViewIPD,
    order,
    patData,
    setHn,
    setPatData,
    claimId,
    setClaimId,
    selectID,
    setSelectID,
    claimIPDData,
    setClaimIPDData,
    claimOPDData,
    setClaimOPDData,
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
    // status,
    // statusFilter,
    // setStatusFilter,
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
    openModalAddPatient,
    setOpenModalAddPatient,
    previewPdfOPDModal,
    setPreviewPdfOPDModal,
    previewPdfIpdPartAModal,
    setPreviewPdfIpdPartAModal,
    previewPdfIpdPartBModal,
    setPreviewPdfIpdPartBModal,
    base64PdfOpd,
    base64PdfIpdPartA,
    base64PdfIpdPartB,
    loading,
    handleCloseModalOPD,
  };
}
