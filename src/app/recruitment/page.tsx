"use client";
import { fetchRecruitment } from "@/api/recruitmentFetch";
import ResourceCard from "@/components/crudCard/ResourceCard";
import SearchBar from "@/components/searchbar/Searchbar";
import { AppUserRole } from "@/enums/role";
import withRole from "@/middleware/withRole";
import { RecruitmentPaginationParams, RecruitmentShortDTO } from "@/types/Recruitment";
import { useState } from "react";

const RecruitmentPage = () => {
  const [recruitments, setRecruitments] = useState<RecruitmentShortDTO[]>([]);

  var recruitmentPaginationParams: RecruitmentPaginationParams = {
    pageNumber: 0,
    size: 10,
    search: "",
  };
  
  const onSubmit = (searchTerm: string) => {
    recruitmentPaginationParams.search = searchTerm;
    
    fetchRecruitment(recruitmentPaginationParams)
        .then((response) => {
            setRecruitments(response.content);
        })
        .catch((error) => {
            console.log(error);
        });
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
    </div>
  )
}

export default withRole(RecruitmentPage, [AppUserRole.ADMINISTRATION_EMPLOYEE]);