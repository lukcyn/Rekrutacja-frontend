"use client";
import { fetchRecruitmentById } from "@/api/recruitmentFetch";
import { AppUserRole } from "@/enums/role";
import withRole from "@/middleware/withRole";
import { RecruitmentDTO } from "@/types/Recruitment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

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
    const [cycle, setCycle] = useState<string>('');
    const [startDate, setStartDate] = useState<Value>();
    const [endDate, setEndDate] = useState<Value>();
    const [capacity, setCapacity] = useState<number | undefined>(0);
    const [fieldOfStudy, setFieldOfStudy] = useState<string>('');
    const [specialization, setSpecialization] = useState<string | undefined>('');
  
    useEffect(() => {
      const id = verifyAndGetIdFromParams();
      fetchRecruitment(id);
    }, []);
  
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
  
          setCycle(response.cycle || '');
          setStartDate(new Date(response.startDate));
          setEndDate(new Date(response.endDate));
          setCapacity(response.capacity || 0);
          setFieldOfStudy(response.fieldOfStudy.name || '');
          setSpecialization(response.specialization?.name || '');
        })
        .catch((error) => {
          if (error.response.status === 404) router.push("/notFound");
        });
    };
  
    return (
      <div>
        {recruitment ? (
          <>

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
                <p>Limit osób: {recruitment.capacity}</p>
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
                <p>Kierunek: {recruitment.fieldOfStudy.name}</p>
              </div>
              <div className="col-3">
                <input
                  className="form-control"
                  placeholder="Enter value"
                  value={fieldOfStudy}
                  onChange={(e) => setFieldOfStudy(e.target.value)}
                />
              </div>
            </div>
  
            <div className="row">
              <div className="col-2">
                <p>Specjalizacja {recruitment.specialization?.name || 'N/A'}</p>
              </div>
              <div className="col-3">
                <input
                  className="form-control"
                  placeholder="Enter value"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                />
              </div>
            </div>
  
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
  