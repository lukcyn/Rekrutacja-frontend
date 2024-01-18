"use client";
import { fetchRecruitmentById, updateRecruitment } from "@/api/recruitmentFetch";
import { AppUserRole } from "@/enums/role";
import withRole from "@/middleware/withRole";
import { RecruitmentDTO, RecruitmentRequest } from "@/types/Recruitment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SpecializationDTO } from "@/types/Specialization";
import { FieldOfStudyDTO } from "@/types/FieldOfStudy";
import 'react-toastify/dist/ReactToastify.css';
import CreateEditBasePage from "../../CreateEditBasePage";


type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Prop {
  params: {
    id: string;
  };
}

const RecruitmentEditPage = ({ params }: Prop) => {
  const router = useRouter();
  const [recruitment, setRecruitment] = useState<RecruitmentDTO | undefined>();
  const [cycle, setCycle] = useState<string>("");
  const [startDate, setStartDate] = useState<Value>();
  const [endDate, setEndDate] = useState<Value>();
  const [capacity, setCapacity] = useState<number | undefined>(0);
  const [selectedFieldOfStudy, setSelectedFieldOfStudy] = useState<FieldOfStudyDTO>();
  const [selectedSpecialization, setSelectedSpecialization] = useState<SpecializationDTO | undefined>();
  const [specializations, setSpecializations] = useState<SpecializationDTO[]>([]);
  const [fieldOfStudies, setFieldOfStudies] = useState<FieldOfStudyDTO[]>([]);

  useEffect(() => {
    const id = verifyAndGetIdFromParams();
    fetchRecruitment(id);
  }, []);

  const createRecruitmentDTO = (): RecruitmentRequest => {
    const formatDate = (date: Date | undefined): string => {
      return date ? date.toISOString().split('T')[0] : "";
    };
  
    return {
      cycle: cycle,
      startDate: formatDate(startDate as Date),
      endDate: formatDate(endDate as Date),
      capacity: capacity || 0,
      fieldOfStudyId: selectedFieldOfStudy!.id,
      specializationId: selectedSpecialization?.id || undefined,
    };
  };

  const onButtonClick = () => {
    const recruitmentRequest = createRecruitmentDTO();
    
    updateRecruitment(recruitment!.id, recruitmentRequest)
    .then(() => {
      router.push("/recruitment");
    }).catch((error) => {
      console.log(error);
    });
  };

  const verifyAndGetIdFromParams = () => {
    if (params.id === undefined) router.push("/notFound");

    const id = parseInt(params.id);

    if (isNaN(id)) router.push("/notFound");

    return id;
  };

  const fetchRecruitment = (id: number) => {
    fetchRecruitmentById(id)
      .then((response) => {
        setRecruitment(response);
        setCycle(response.cycle || "");
        setStartDate(new Date(response.startDate));
        setEndDate(new Date(response.endDate));
        setCapacity(response.capacity || 0);
        setSelectedFieldOfStudy(response.fieldOfStudy);
        setSelectedSpecialization(response.specialization);
      })
      .catch((error) => {
        if (error.response.status === 404) router.push("/notFound");
      });
  };

  return (
    <CreateEditBasePage
        title={"Edytuj rekrutację"}
        cycle={cycle}
        setCycle={setCycle}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        capacity={capacity}
        setCapacity={setCapacity}
        selectedFieldOfStudy={selectedFieldOfStudy}
        setSelectedFieldOfStudy={setSelectedFieldOfStudy}
        selectedSpecialization={selectedSpecialization}
        setSelectedSpecialization={setSelectedSpecialization}
        specializations={specializations}
        setSpecializations={setSpecializations}
        fieldOfStudies={fieldOfStudies}
        setFieldOfStudies={setFieldOfStudies}
        onButtonClick={onButtonClick}
    />
  );
};

export default withRole(RecruitmentEditPage, [
  AppUserRole.ADMINISTRATION_EMPLOYEE,
]);
