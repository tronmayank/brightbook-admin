import { IconPlus } from "@tabler/icons-react";
import ATMPageHeader from "src/components/atoms/ATMPageHeader/ATMPageHeader";
import ATMPagination from "src/components/atoms/ATMPagination/ATMPagination";
import MOLFilterBar from "src/components/molecules/MOLFilterBar/MOLFilterBar";
import MOLTable, { TableHeader } from "src/components/molecules/MOLTable/MOLTable";
import { ArticleListResponseType } from "../../models/CultureOfMarketing.model";
import ATMSelect from "src/components/atoms/FormElements/ATMSelect/ATMSelect";
import { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup"; // ✅ Added missing import
import { ATMButton } from "src/components/atoms/ATMButton/ATMButton";
import { useFilterPagination } from "src/hooks/useFilterPagination";

type Props = {
  onAddNew: () => void;
  rowData: ArticleListResponseType[];
  tableHeaders: TableHeader<ArticleListResponseType>[];
  isLoading: boolean;
  filterPaginationData: {
    totalCount: number;
    totalPages: number;
  };
  onEdit?: (item: ArticleListResponseType) => void;
  onView?: (item: ArticleListResponseType) => void;
  onDelete?: (item: any, closeDialog: () => void) => void;
  acknowledged: any,
  setAcknowleded: any
};

const ArticleListing = ({
  onAddNew,
  tableHeaders,
  rowData,
  isLoading,
  filterPaginationData: { totalCount, totalPages },
  onEdit,
  onView,
  onDelete,
  acknowledged,
  setAcknowleded

}: Props) => {

  return (
    <div className="flex flex-col h-full gap-2">
      {/* Page Header */}
      <ATMPageHeader
        heading="Articles"
        buttonProps={{
          label: "Add New",
          icon: IconPlus,
          onClick: onAddNew,
        }}
      />

      <div className="flex flex-col overflow-auto border rounded border-slate-300 h-screen">
        {/* Table */}
        <div className="flex-1 overflow-auto">
          <MOLTable<ArticleListResponseType>
            tableHeaders={tableHeaders}
            data={rowData}
            getKey={(item) => item?._id}
            onEdit={onEdit}
            onView={onView}
            onDelete={onDelete}
            isLoading={isLoading}
          />
        </div>

        {/* Pagination */}
        <ATMPagination totalPages={totalPages} rowCount={totalCount} rows={rowData} />
      </div>
    </div>
  );
};

export default ArticleListing;
