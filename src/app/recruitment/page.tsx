"use client";
import { fetchRecruitment } from "@/api/recruitmentFetch";
import ResourceCard from "@/components/crudCard/ResourceCard";
import PaginationBar from "@/components/paginationBar/PaginationBar";
import SearchBar from "@/components/searchbar/Searchbar";
import { AppUserRole } from "@/enums/role";
import withRole from "@/middleware/withRole";
import { RecruitmentPaginationParams, RecruitmentShortDTO } from "@/types/Recruitment";
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

  const onCardViewClick = (recruitmentId: number) => {
    console.log("View");
  };

  const onCardModifyClick = () => {
    console.log("Modify");
  };

  const onCardDeleteClick = () => {
    console.log("Delete");
  };


  const renderCard = (data: RecruitmentShortDTO) => {
    return(
            <ResourceCard title={data.title} onView={() => onCardViewClick(data.recruitmentId)} onModify={onCardModifyClick} onDelete={onCardDeleteClick} />
    );
  };
    
  return (
    <div>
      <SearchBar onSubmit={onSubmit} />
      <div>
            {recruitments.map((recruitment) => renderCard(recruitment))}
      </div>
      <PaginationBar total={total} current={currentPage} onClick={onPaginationBarClick} />
    </div>
  )
}

export default withRole(RecruitmentPage, [AppUserRole.ADMINISTRATION_EMPLOYEE]);