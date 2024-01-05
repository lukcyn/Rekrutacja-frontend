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
import { useState } from "react";

const RecruitmentPage = () => {
  const [recruitments, setRecruitments] = useState<RecruitmentShortDTO[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  var recruitmentPaginationParams: RecruitmentPaginationParams = {
    pageNumber: 0,
    size: 6,
    search: "",
  };

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
    console.log("View");
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
        .then((response) => {
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
      <li key={data.recruitmentId}>
        <ResourceCard
          title={data.title}
          onView={() => onCardViewClick(data)}
          onModify={() => onCardModifyClick(data)}
          onDelete={() => onCardDeleteClick(data)}
        />
      </li>
    );
  };

  return (
    <div>
      <SearchBar onSubmit={onSubmit} />
      <ul>{recruitments.map((recruitment) => renderCard(recruitment))}</ul>
      <PaginationBar
        total={total}
        current={currentPage}
        onClick={onPaginationBarClick}
      />
    </div>
  );
};

export default withRole(RecruitmentPage, [AppUserRole.ADMINISTRATION_EMPLOYEE]);
