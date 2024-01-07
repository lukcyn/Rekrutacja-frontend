"use client";
import { fetchRecruitmentById, updateRecruitment } from "@/api/recruitmentFetch";
import { AppUserRole } from "@/enums/role";
import withRole from "@/middleware/withRole";
import { RecruitmentDTO, RecruitmentRequest } from "@/types/Recruitment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import Select from "react-select";
import { SpecializationDTO } from "@/types/Specialization";
import { FieldOfStudyDTO } from "@/types/FieldOfStudy";
import { fetchFieldOfStudy } from "@/api/fieldOfStudyFetch";
import { fetchSpecializations } from "@/api/specializationFetch";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
    fetchFieldOfStudies();
  }, []);

  useEffect(() => {
    if (selectedFieldOfStudy === undefined) return;
    fetchSpecializationsOfFieldOfStudy(selectedFieldOfStudy.id);
  }, [selectedFieldOfStudy]);

  const createRecruitmentDTO = (): RecruitmentRequest => {
    const formatDate = (date: Date | undefined): string => {
      return date ? date.toISOString().split('T')[0] : "";
    };
  
    return {
      cycle: cycle,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      capacity: capacity || 0,
      fieldOfStudyId: selectedFieldOfStudy?.id,
      specializationId: selectedSpecialization?.id || undefined,
    };
  };

  const validateData = (recruitmentDTO: RecruitmentRequest): boolean => {
    if(cycle === "") {
      toast.error("Cykl rekrutacji nie może być pusty!");
      return false;
    }

    if(startDate === null) {
      toast.error("Data początku rekrutacji nie może być pusta!");
      return false;
    }

    if(endDate === null){
      toast.error("Data końcowa nie może być pusta!");
      return false;
    }

    if(startDate! > endDate!) {
      toast.error("Data początkowa musi być przed datą końcową");
      return false;
    }

    if(capacity === undefined || isNaN(capacity) || capacity < 1) {
      toast.error("Limit osób musi być liczbą większą od 0!");
      return false;
    }

    if(selectedFieldOfStudy === undefined) {
      toast.error("Wybierz kierunek!");
      return false;
    }

    console.log(selectedSpecialization)
    console.log(specializations)

    if(selectedSpecialization === null && specializations.length > 0) {
      toast.error("Wybierz specjalizację!");
      return false;
    }

    return true;
  };

  const onButtonClick = () => {
    const recruitmentRequest = createRecruitmentDTO();
    
    if(!validateData(recruitmentRequest)) 
      return;

    updateRecruitment(recruitment!.id, recruitmentRequest)
    .then(() => {
      console.log("Success update");
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

  const fetchFieldOfStudies = () => {
    fetchFieldOfStudy({ pageNumber: 0, size: 1000 })
      .then((response) => {
        setFieldOfStudies(response.content);
      })
      .catch((error) => {
        if (error.response.status === 404) router.push("/notFound");
      });
  };

  const onFieldOfStudyChange = (fieldOfStudy: FieldOfStudyDTO | undefined) => {
    if (fieldOfStudy === undefined) {
      setSelectedFieldOfStudy(undefined);
      setSpecializations([]);
      return;
    }
    setSelectedFieldOfStudy(fieldOfStudy);
    setSelectedSpecialization(undefined);

    fetchSpecializations({ pageNumber: 0, size: 1000 }, fieldOfStudy.id)
      .then((response) => {
        setSpecializations(response.content);
      })
      .catch((error) => {
        if (error.response.status === 404) router.push("/notFound");
      });
  };

  const fetchSpecializationsOfFieldOfStudy = (fieldOfStudyId: number) => {
    fetchSpecializations({ pageNumber: 0, size: 1000 }, fieldOfStudyId)
      .then((response) => {
        setSpecializations(response.content);
      })
      .catch((error) => {
        if (error.response.status === 404) router.push("/notFound");
      });
  };

  return (
    <div>
      {recruitment ? (
        <>
          <ToastContainer/>
          <h1>{recruitment.fieldOfStudy.name + " " + recruitment.cycle}</h1>

          <div className="row">
            <div className="col-2">
              <p>Cykl rekrutacji:</p>
            </div>
            <div className="col-3">
              <input
                className="form-control"
                placeholder="Enter value"
                value={cycle}
                onChange={(e) => setCycle(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-2">
              <p>Początek rekrutacji:</p>
            </div>
            <div className="col-3">
              <DatePicker onChange={setStartDate} value={startDate} />
            </div>
          </div>

          <div className="row">
            <div className="col-2">
              <p>Koniec rekrutacji: </p>
            </div>
            <div className="col-3">
              <DatePicker onChange={setEndDate} value={endDate} />
            </div>
          </div>

          <div className="row">
            <div className="col-2">
              <p>Limit osób:</p>
            </div>
            <div className="col-3">
              <input
                className="form-control"
                placeholder="Enter value"
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-2">
              <p>Kierunek:</p>
            </div>
            <div className="col-3">
              <Select
                options={fieldOfStudies.map((fieldOfStudy) => ({
                  label: fieldOfStudy.name,
                  value: fieldOfStudy,
                }))}
                value={{
                  label: selectedFieldOfStudy?.name,
                  value: selectedFieldOfStudy,
                }}
                onChange={(selectedOption) =>
                  onFieldOfStudyChange(selectedOption?.value)
                }
                isClearable
              />
            </div>
          </div>

          {specializations.length > 0 && (
            <div className="row">
              <div className="col-2">
                <p>Specjalizacja</p>
              </div>
              <div className="col-3">
                <Select
                  options={specializations.map((spec) => ({
                    label: spec.name,
                    value: spec,
                  }))}
                  value={{
                    label: selectedSpecialization?.name,
                    value: selectedSpecialization,
                  }}
                  onChange={(selectedOption) =>
                    setSelectedSpecialization(selectedOption?.value)
                  }
                  isClearable
                />
              </div>
              <div className="row">
              <div className="col-2">
                <Button variant="primary" onClick={onButtonClick}>
                  Potwierdź
                </Button>
              </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default withRole(RecruitmentEditPage, [
  AppUserRole.ADMINISTRATION_EMPLOYEE,
]);
