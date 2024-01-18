"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import Select from "react-select";
import { SpecializationDTO } from "@/types/Specialization";
import { FieldOfStudyDTO } from "@/types/FieldOfStudy";
import { fetchFieldOfStudy } from "@/api/fieldOfStudyFetch";
import { fetchSpecializations } from "@/api/specializationFetch";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Prop {
  title: string;
  cycle: string;
  setCycle: React.Dispatch<React.SetStateAction<string>>;
  startDate: Value | undefined;
  setStartDate: React.Dispatch<React.SetStateAction<Value | undefined>>;
  endDate: Value | undefined;
  setEndDate: React.Dispatch<React.SetStateAction<Value | undefined>>;
  capacity: number | undefined;
  setCapacity: React.Dispatch<React.SetStateAction<number | undefined>>;
  selectedFieldOfStudy: FieldOfStudyDTO | undefined;
  setSelectedFieldOfStudy: React.Dispatch<React.SetStateAction<FieldOfStudyDTO | undefined>>;
  selectedSpecialization: SpecializationDTO | undefined;
  setSelectedSpecialization: React.Dispatch<React.SetStateAction<SpecializationDTO | undefined>>;
  specializations: SpecializationDTO[];
  setSpecializations: React.Dispatch<React.SetStateAction<SpecializationDTO[]>>;
  fieldOfStudies: FieldOfStudyDTO[];
  setFieldOfStudies: React.Dispatch<React.SetStateAction<FieldOfStudyDTO[]>>;
  onButtonClick: () => void;
}

const CreateEditBasePage = ({ 
    title,
    cycle,
    setCycle,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    capacity,
    setCapacity,
    selectedFieldOfStudy,
    setSelectedFieldOfStudy,
    selectedSpecialization,
    setSelectedSpecialization,
    specializations,
    setSpecializations,
    fieldOfStudies,
    setFieldOfStudies,
    onButtonClick: afterButtonClick
}: Prop) => {
  const router = useRouter();

  useEffect(() => {
    fetchFieldOfStudies();
  }, []);

  useEffect(() => {
    if (selectedFieldOfStudy === undefined) return;
    fetchSpecializationsOfFieldOfStudy(selectedFieldOfStudy.id);

    selectedSpecialization = undefined;
  }, [selectedFieldOfStudy]);


  const validateData = (): boolean => {
    if (cycle === "") {
      toast.error("Cykl rekrutacji nie może być pusty!");
      return false;
    }

    if (startDate === null) {
      toast.error("Data początku rekrutacji nie może być pusta!");
      return false;
    }

    if (endDate === null) {
      toast.error("Data końcowa nie może być pusta!");
      return false;
    }

    if (startDate! > endDate!) {
      toast.error("Data początkowa musi być przed datą końcową");
      return false;
    }

    if (capacity === undefined || isNaN(capacity) || capacity < 1) {
      toast.error("Limit osób musi być liczbą większą od 0!");
      return false;
    }

    if (selectedFieldOfStudy === undefined) {
      toast.error("Wybierz kierunek!");
      return false;
    }

    console.log(selectedSpecialization);
    console.log(specializations);

    if (selectedSpecialization === null || selectedSpecialization === undefined && specializations.length > 0) {
      toast.error("Wybierz specjalizację!");
      return false;
    }

    return true;
  };

  const onButtonClick = () => {
    if (!validateData()) return;
    afterButtonClick();
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
          <ToastContainer />
          <h1>{title}</h1>

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
            </div>
          )}
        <div className="row">
            <div className="col-2">
                <Button variant="primary" onClick={onButtonClick}>
                    Potwierdź
                </Button>
            </div>
        </div>
    </div>
  );
};

export default CreateEditBasePage;
