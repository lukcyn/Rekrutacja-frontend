"use client";
import { fetchRecruitment, deleteRecruitment } from "@/api/recruitmentFetch";
import ResourceCard from "@/components/crudCard/ResourceCard";
import PaginationBar from "@/components/paginationBar/PaginationBar";
import SearchBar from "@/components/searchbar/Searchbar";
import { AppUserRole } from "@/enums/role";
import withRole from "@/middleware/withRole";
import {
  RecruitmentPaginationParams,
  RecruitmentShortDTO,
} from "@/types/Recruitment";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const RecruitmentPage = () => {
  const SEARCH_PARAM = "search";
  const router = useRouter();
  const searchParams = useSearchParams()

  const [recruitments, setRecruitments] = useState<RecruitmentShortDTO[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  var recruitmentPaginationParams: RecruitmentPaginationParams = {
    pageNumber: 0,
    size: 6,
    search: searchParams.has(SEARCH_PARAM) ? searchParams.get(SEARCH_PARAM)! : "",
  };


  useEffect(() => {
    fetchRecruitmentPage(recruitmentPaginationParams);
  }, []);

  const fetchRecruitmentPage = (params: RecruitmentPaginationParams) => {
    fetchRecruitment(recruitmentPaginationParams)
      .then((response) => {
        setRecruitments(response.content);
        setTotal(response.totalPages);
        setCurrentPage(response.number);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onPaginationBarClick = (pageNumber: number) => {
    recruitmentPaginationParams.pageNumber = pageNumber;
    fetchRecruitmentPage(recruitmentPaginationParams);
  };

  const onSubmit = (searchTerm: string) => {
    recruitmentPaginationParams.search = searchTerm;
    fetchRecruitmentPage(recruitmentPaginationParams);
  };

  const onCardViewClick = (data: RecruitmentShortDTO) => {
    router.push("/recruitment/" + data.recruitmentId);
  };

  const onCardModifyClick = (data: RecruitmentShortDTO) => {
    console.log("Modify");
  };

  const onCardDeleteClick = (data: RecruitmentShortDTO) => {
    const isConfirmed = window.confirm(
      "Czy na pewno chcesz usunąć " + data.title + "?"
    );

    if (isConfirmed) {
      deleteRecruitment(data.recruitmentId)
        .then((_) => {
          const updatedRecruitments = recruitments.filter(
            (recruitment) => recruitment.recruitmentId !== data.recruitmentId
          );
          setRecruitments(updatedRecruitments);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const renderCard = (data: RecruitmentShortDTO) => {
    return (
      <div key={data.recruitmentId}>
        <ResourceCard
          title={data.title}
          onView={() => onCardViewClick(data)}
          onModify={() => onCardModifyClick(data)}
          onDelete={() => onCardDeleteClick(data)}
        />
      </div>
    );
  };

  return (
    <div>
      <SearchBar onSubmit={onSubmit} initialText={searchParams.has(SEARCH_PARAM) ? searchParams.get(SEARCH_PARAM)! : ""} />
      <div>{recruitments.map((recruitment) => renderCard(recruitment))}</div>
      <PaginationBar
        total={total}
        current={currentPage}
        onClick={onPaginationBarClick}
      />
    </div>
  );
};

export default withRole(RecruitmentPage, [AppUserRole.ADMINISTRATION_EMPLOYEE]);
