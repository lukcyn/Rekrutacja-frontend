"use client";
import {AppUserRole} from "@/enums/role";
import withRole from "@/middleware/withRole";
import {useRouter} from "next/navigation";
import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import Select from "react-select";


type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Prop {
    params: {
        id: string;
    };
}

const RecruitmentEditPage = ({params}: Prop) => {
    const router = useRouter();
    //const [recruitment, setRecruitment] = useState<RecruitmentDTO | undefined>();
    //const [cycle, setCycle] = useState<string>("");
    //const [startDate, setStartDate] = useState<Value>();
    //const [endDate, setEndDate] = useState<Value>();
    //const [capacity, setCapacity] = useState<number | undefined>(0);
    //const [selectedFieldOfStudy, setSelectedFieldOfStudy] = useState<FieldOfStudyDTO>();
    //const [selectedSpecialization, setSelectedSpecialization] = useState<SpecializationDTO | undefined>();
    //const [specializations, setSpecializations] = useState<SpecializationDTO[]>([]);
    //const [fieldOfStudies, setFieldOfStudies] = useState<FieldOfStudyDTO[]>([]);

    // useEffect(() => {
    //     const id = verifyAndGetIdFromParams();
    //     fetchRecruitment(id);
    // }, []);

    // const createRecruitmentDTO = (): RecruitmentRequest => {
    //     const formatDate = (date: Date | undefined): string => {
    //         return date ? date.toISOString().split('T')[0] : "";
    //     };
    //
    //     return {
    //         cycle: cycle,
    //         startDate: formatDate(startDate as Date),
    //         endDate: formatDate(endDate as Date),
    //         capacity: capacity || 0,
    //         fieldOfStudyId: selectedFieldOfStudy!.id,
    //         specializationId: selectedSpecialization?.id || undefined,
    //     };
    // };

    const onButtonClick = () => {
        //const recruitmentRequest = createRecruitmentDTO();

        // updateRecruitment(recruitment!.id, recruitmentRequest)
        //     .then(() => {
        //         router.push("/recruitment");
        //     }).catch((error) => {
        //     console.log(error);
        // });
        console.log("jol")
    };

    const verifyAndGetIdFromParams = () => {
        if (params.id === undefined) router.push("/notFound");

        const id = parseInt(params.id);

        if (isNaN(id)) router.push("/notFound");

        return id;
    };

    const handleSubmit = async (e: any) => {
        console.log("Submit");
    }

    const [selectedMaturaSubject1, setSelectedMaturaSubject1] = React.useState(null);
    const [selectedMaturaSubject2, setSelectedMaturaSubject2] = React.useState(null);
    const [selectedMaturaSubject3, setSelectedMaturaSubject3] = React.useState(null);

    // const handleChange = (selectedOption: {value: any}) => {
    //     // Aktualizuj stan po wybraniu przedmiotu
    //     setSelectedMaturaSubject(selectedOption.value);
    // };
    const handleChange = (selectedOption) => {
        // selectedOption zawiera pełny obiekt przedmiotu, więc możesz uzyskać dostęp do wszystkich jego właściwości
        console.log('Selected Option:', selectedOption);

        // Tutaj możesz zaktualizować stan wybranego przedmiotu
        setSelectedMaturaSubject1(selectedOption.value);
    };

    const maturaSubjects = [
        {id: 1, name: 'Matematyka'},
        {id: 2, name: 'Fizyka'},
        {id: 3, name: 'Chemia'},
        // Dodaj inne przedmioty według potrzeb
    ];

    // const fetchRecruitment = (id: number) => {
    //     fetchRecruitmentById(id)
    //         .then((response) => {
    //             setRecruitment(response);
    //             setCycle(response.cycle || "");
    //             setStartDate(new Date(response.startDate));
    //             setEndDate(new Date(response.endDate));
    //             setCapacity(response.capacity || 0);
    //             setSelectedFieldOfStudy(response.fieldOfStudy);
    //             setSelectedSpecialization(response.specialization);
    //         })
    //         .catch((error) => {
    //             if (error.response.status === 404) router.push("/notFound");
    //         });
    // };

    // @ts-ignore
    return (
        // <CreateEditBasePage
        //     cycle={cycle}
        //     setCycle={setCycle}
        //     startDate={startDate}
        //     setStartDate={setStartDate}
        //     endDate={endDate}
        //     setEndDate={setEndDate}
        //     capacity={capacity}
        //     setCapacity={setCapacity}
        //     selectedFieldOfStudy={selectedFieldOfStudy}
        //     setSelectedFieldOfStudy={setSelectedFieldOfStudy}
        //     selectedSpecialization={selectedSpecialization}
        //     setSelectedSpecialization={setSelectedSpecialization}
        //     specializations={specializations}
        //     setSpecializations={setSpecializations}
        //     fieldOfStudies={fieldOfStudies}
        //     setFieldOfStudies={setFieldOfStudies}
        //     onButtonClick={onButtonClick}
        // />
        <div className="container xl">
            <h2>Podaj dane potrzebne do wypełnienia testu preferencji</h2>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-2">
                        <p>Pierwszy przedmiot rozszerzony zdawany na maturze:</p>
                    </div>
                    <div className="col-3">
                        <Select
                            options={maturaSubjects.map((subject) => ({
                                label: subject.name,
                                value: subject,
                            }))}
                            value={{
                                label: selectedMaturaSubject1?.name,
                                value: selectedMaturaSubject1,
                            }}
                            onChange={(selectedOption) =>
                                //onFieldOfStudyChange(selectedOption?.value)
                                setSelectedMaturaSubject1(selectedOption?.value)
                            }
                            //onChange={(selectedOption) =>
                            //onFieldOfStudyChange(selectedOption?.value)

                            isClearable
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <p>Drugi przedmiot rozszerzony zdawany na maturze:</p>
                    </div>
                    <div className="col-3">
                        <Select
                            options={maturaSubjects.map((subject) => ({
                                label: subject.name,
                                value: subject,
                            }))}
                            value={{
                                label: selectedMaturaSubject2?.name,
                                value: selectedMaturaSubject2,
                            }}
                            onChange={(selectedOption) =>
                                //onFieldOfStudyChange(selectedOption?.value)
                                setSelectedMaturaSubject2(selectedOption?.value)
                            }
                            //onChange={(selectedOption) =>
                            //onFieldOfStudyChange(selectedOption?.value)

                            isClearable
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <p>Trzeci przedmiot rozszerzony zdawany na maturze:</p>
                    </div>
                    <div className="col-3">
                        <Select
                            options={maturaSubjects.map((subject) => ({
                                label: subject.name,
                                value: subject,
                            }))}
                            value={{
                                label: selectedMaturaSubject3?.name,
                                value: selectedMaturaSubject3,
                            }}
                            onChange={(selectedOption) =>
                                //onFieldOfStudyChange(selectedOption?.value)
                                setSelectedMaturaSubject3(selectedOption?.value)
                            }
                            //onChange={(selectedOption) =>
                            //onFieldOfStudyChange(selectedOption?.value)

                            isClearable
                        />
                    </div>
                </div>
                <button
                    //disabled={checkPreferencesNumber}
                    type="submit"
                    className="btn btn-primary"
                >
                    Zatwierdź
                </button>
            </form>
        </div>
    );
};

export default withRole(RecruitmentEditPage, [AppUserRole.CANDIDATE]);
