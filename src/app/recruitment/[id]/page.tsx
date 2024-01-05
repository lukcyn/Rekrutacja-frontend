"use client";
import { fetchRecruitmentById } from "@/api/recruitmentFetch";
import { AppUserRole } from "@/enums/role";
import withRole from "@/middleware/withRole";
import { RecruitmentDTO } from "@/types/Recruitment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Prop {
  params: {
    id: string;
  };
}

const RecruitmentViewPage = ({ params }: Prop) => {
  const router = useRouter();
  const [recruitment, setRecruitment] = useState<RecruitmentDTO>();

  useEffect(() => {
    const id = verifyAndGetIdFromParams();
    fetchRecruitment(id);
  }, []);


  const verifyAndGetIdFromParams = () => {
    if (params.id === undefined) 
        router.push("/notFound");
  
      const id = parseInt(params.id);
  
      if (isNaN(id)) 
        router.push("/notFound");

      return id;
  };

  const fetchRecruitment = (id: number) => {
    fetchRecruitmentById(id)
      .then((response) => {
        setRecruitment(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {recruitment ? (
        <>
          <h1>{recruitment.fieldOfStudy.name + " " + recruitment.cycle}</h1>
          <p>Cykl rekrutacji: {recruitment.cycle}</p>
          <p>Początek rekrutacji: {recruitment.startDate}</p>
          <p>Koniec rekrutacji: {recruitment.endDate}</p>
          <p>Limit osób: {recruitment.capacity}</p>
          <p>Próg punktowy: {recruitment.recruitmentThreshold || 'N/A'}</p>
          <p>Kierunek: {recruitment.fieldOfStudy.name }</p>
          <p>Specjalizacja {recruitment.specialization?.name || 'N/A'}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default withRole(RecruitmentViewPage, [
  AppUserRole.ADMINISTRATION_EMPLOYEE,
]);
