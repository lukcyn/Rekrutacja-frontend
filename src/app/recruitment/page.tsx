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
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";


const RecruitmentPage = () => {
  const SEARCH_PARAM = "search";
  const router = useRouter();
  const searchParams = useSearchParams()

  const [recruitments, setRecruitments] = useState<RecruitmentShortDTO[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const [recruitmentFetchParams, setRecruitmentFetchParams] = useState<RecruitmentPaginationParams>({
      pageNumber: 0,
      size: 6,
      search: searchParams.has(SEARCH_PARAM) ? searchParams.get(SEARCH_PARAM)! : "",
  })

  useEffect(() => {
    fetchRecruitmentPage();
  }, []);

  const fetchRecruitmentPage = () => {
    fetchRecruitment(recruitmentFetchParams)
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
    setRecruitmentFetchParams({...recruitmentFetchParams, pageNumber: pageNumber})
    fetchRecruitmentPage();
  };

  const onSubmit = (searchTerm: string) => {
    setRecruitmentFetchParams({...recruitmentFetchParams, pageNumber: 0, search: searchTerm});
    fetchRecruitmentPage();
  };

  const onCardViewClick = (data: RecruitmentShortDTO) => {
    router.push("/recruitment/" + data.recruitmentId);
  };

  const onCardModifyClick = (data: RecruitmentShortDTO) => {
    router.push("/recruitment/" + data.recruitmentId + "/edit");
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
          fetchRecruitmentPage();
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
       <div className="d-flex align-items-center w-50 p-3" style={{margin: 'auto'}}>
        <SearchBar onSubmit={onSubmit} initialText={searchParams.has(SEARCH_PARAM) ? searchParams.get(SEARCH_PARAM)! : ""} />
      </div>
      <div className="d-flex align-items-center justify-content-end pe-2 pb-2">
        <Link href={"/recruitment/new"}>
          <Button>
            Utwórz rekrutację
          </Button>
        </Link>
      </div>
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
