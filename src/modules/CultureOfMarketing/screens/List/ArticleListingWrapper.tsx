import { useDispatch } from "react-redux";
import { TableHeader } from "src/components/molecules/MOLTable/MOLTable";
import { useFetchData } from "src/hooks/useFetchData";
import { useFilterPagination } from "src/hooks/useFilterPagination";
import { AppDispatch } from "src/store";
import { ArticleListResponseType } from "../../models/CultureOfMarketing.model";
import { useGetComQuery } from "../../service/CultureOfMarketingServices";
import { setIsOpenAddDialog } from "../../slice/UserSlice";
import { useNavigate } from "react-router-dom";
import { IconExclamationCircle, IconSquareRoundedCheck } from "@tabler/icons-react";
import { useState } from "react";
import ATMConfirmationDialog from "src/components/atoms/ATMConfirmationDialog/ATMConfirmationDialog";
import { format } from 'date-fns';
import ArticleListing from "./ArticleListing";

type Props = {};

const ArticleListingWrapper = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  // const [updateInquiry] = useUpdateInquiryByIdMutation();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const [acknowledged, setAcknowleded] = useState("")


  // api
  const { searchQuery, limit, page, appliedFilters } = useFilterPagination();
  const { data, isLoading, totalData, totalPages } = useFetchData(
    useGetComQuery,
    {
      body: {
        limit,
        page,
        searchValue: searchQuery,
        searchIn: JSON.stringify(["name", "industry", "businessName", "whatBringYou", "marketingBudget"]),
        isPaginationRequired: true,
        ...(acknowledged !== "" && {
          filterBy: JSON.stringify([{ fieldName: "acknowledged", value: acknowledged }]),
        }),
      },
    }
  );

  const handleConfirm = (closeDialog: () => void, setIsLoading: (loading: boolean) => void) => {
    if (!selectedRowId) return;
    setIsLoading(true);
    // updateInquiry({ id: selectedRowId })
    //   .then(() => {
    //     setIsLoading(false);
    //     closeDialog();
    //   })
    //   .catch(() => setIsLoading(false));
  };

  const tableHeaders: TableHeader<ArticleListResponseType>[] = [
    {
      fieldName: "title",
      headerName: "Title",
      flex: "flex-[2_2_0%]",
    },
    // {
    //   fieldName: "head",
    //   headerName: "Head",
    //   flex: "flex-[1_1_0%]",
    // },
    {
      fieldName: "date",
      headerName: "Date",
      flex: "flex-[1_1_0%]",
    },
  ];

  return (
    <>
      <ArticleListing
        tableHeaders={tableHeaders}
        rowData={data as ArticleListResponseType[]}
        onAddNew={() => navigate('add')}
        // onView={(item) => {
        //   navigation(`/enquiry/${item?._id}`);
        // }}
        onEdit={(item) => {
          // console.log('item: ', item);
          navigate(`${item?._id}`)
        }}
        filterPaginationData={{
          totalCount: totalData,
          totalPages: totalPages,
        }}
        isLoading={isLoading}
        {...{ acknowledged, setAcknowleded }}
      />

    </>
  );
};

export default ArticleListingWrapper;
