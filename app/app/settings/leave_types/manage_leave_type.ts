import { Field } from "@/components/dialog";
import {
  allAttendance,
  createAttendance,
  deleteAttendance,
  editAttendance,
  getAllEmpDD,
} from "@/service/attendance.api";
import { createLeaveType, deleteLeaveType, editLeaveType, getAllLeaveType } from "@/service/leave_type.api";
import { useMutation, useQueries, useQuery, useQueryClient,UseQueryResult  } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import * as z from "zod";

export function leaveTypesData() {
  const [openmultipul, setOpenmultipul] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const queryClient = useQueryClient();
  // const [employeedd, leavesData] = useQueries({
  //   queries: [
  //     {
  //       queryKey: ["employee_dd"],
  //       queryFn: getAllEmpDD,
  //     },
  //     {
  //       queryKey: ["attendance"],
  //       queryFn: allAttendance,
  //     },
  //   ],
  // });

  const leaveTypesData = useQuery({
    queryKey: ["leave_types"],
    queryFn: getAllLeaveType,
  });

  const createAtdanceMutation = useMutation({
    mutationFn: createLeaveType,
    onSuccess: () => {
      toast("Leave Type created successfully");
      queryClient.invalidateQueries({ queryKey: ["leave_types"] });
    },
    onError: () => toast("Failed to create leave type"),
  });

  const updateAtdanceMutation = useMutation({
    mutationFn: editLeaveType,
    onSuccess: () => {
      toast("Leave Type updated successfully");
      queryClient.invalidateQueries({ queryKey: ["leave_types"] });
    },
    onError: () => toast("Failed to update leave type"),
  });

const isLoading = leaveTypesData.isLoading;
  // updateAtdanceMutation.isLoading ||
  // createAtdanceMutation.isLoading ||
  

  const deleteEmpMutation = useMutation({
    mutationFn: deleteLeaveType,
    onSuccess: () => {
      toast("Leave Type deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["leave_types"] });
    },
    onError: () => toast("Failed to delete leave type"),
  });

  const handelsubmit = (data: any) => {
    createAtdanceMutation.mutate(data);
    setOpenForm(false);
  };

  const handelUpdateSubmit = (data: any) => {
    updateAtdanceMutation.mutate(data);
    setOpenForm(false);
  };

  const handleStudentdelete = (data: any) => {
    deleteEmpMutation.mutate(data.id);
    setOpenDelete(false);
  };


  const fields: Field[] = [
    {
      name: "type",
      label: "Leave type",
      type: "text",
      required: true,
    },
    {
      name: "days",
      label: "Leave days",
      type: "number",
      required: true,
    },
    {
      name: "theme",
      label: "Leave theme",
      type: "color",
      required: true,
    },
  ];

  const myFormSchema = z
    .object({
      type: z.string().min(1, "type is required"),
      days: z.number({ invalid_type_error: "days must be a number" }).min(1, "days is required"),
      theme: z.string().min(1, "theme is required"),
    });
  

  const attendanceList = leaveTypesData.data || [];
  const itemsPerPage = 10;
  const totalPages = Math.ceil(attendanceList.length / itemsPerPage);

  const paginatedData = attendanceList.length > 0  && attendanceList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return {
    isLoading,
    openForm,
    openmultipul,
    setOpenmultipul,
    setOpenForm,
    setOpenEdit,
    openEdit,
    fields,
    handelUpdateSubmit,
    handelsubmit,
    selectedAttendance,
    myFormSchema,
    openDelete,
    setOpenDelete,
    handleStudentdelete,
    setCurrentPage,
    setSelectedAttendance,
    paginatedData,
    totalPages,
    updateAtdanceMutation,
    createAtdanceMutation
  };
}
