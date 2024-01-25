"use client";

import {useRouter} from "next/navigation";
import {useMaturaSubjectsResul} from "@/context/maturaSubjectsContext";
import React, {useState} from "react";
import Select from "react-select";
import {Button} from "react-bootstrap";
import withRole from "@/middleware/withRole";
import {AppUserRole} from "@/enums/role";
import {MaturaSubjectDTO} from "@/types/MaturaSubject";


interface Prop {
    params: {
        id: string;
    };
}

const Preferences = ({params}: Prop) => {
    const router = useRouter();


    const {setMaturaSubjectsResult} = useMaturaSubjectsResul()

    const onButtonClick = () => {

        if (selectedMaturaSubject1 === undefined || selectedMaturaSubject2 === undefined) {
            alert("Pierwszy oraz drugi przedmiot rozszerzony zdawany na maturze musi być uzupełniony!");
            return;
        }
        const flag = selectedMaturaSubject1.name === selectedMaturaSubject2.name || selectedMaturaSubject2.name === selectedMaturaSubject3?.name
            || selectedMaturaSubject1.name === selectedMaturaSubject3?.name
        if (flag) {
            alert("Nie możesz uzupełnic tych samych przedmiotów!");
            return;
        }
        console.log(flag)

        setMaturaSubjectsResult(selectedMaturaSubject1, selectedMaturaSubject2, selectedMaturaSubject3)
        router.push("/questions");
    };


    const [selectedMaturaSubject1, setSelectedMaturaSubject1] = useState<MaturaSubjectDTO>();
    const [selectedMaturaSubject2, setSelectedMaturaSubject2] = useState<MaturaSubjectDTO>();
    const [selectedMaturaSubject3, setSelectedMaturaSubject3] = useState<MaturaSubjectDTO>();


    const maturaSubjects: MaturaSubjectDTO[] = [
        {id: 1, name: 'Matematyka'},
        {id: 2, name: 'Fizyka'},
        {id: 3, name: 'Informatyka'},
        {id: 4, name: 'Biologia'},
    ];


    return (
        <div className="container xl">
            <h2>Podaj dane potrzebne do wypełnienia testu preferencji</h2>
            <div className="row">
                <p></p>
            </div>
            <form>
                <div className="row">
                    <div className="col-4">
                        <p>Pierwszy przedmiot rozszerzony zdawany na maturze:</p>
                    </div>
                    <div className="col-3">
                        <Select
                            options={maturaSubjects.map((maturaSubject) => ({
                                label: maturaSubject.name,
                                value: maturaSubject,
                            }))}
                            value={{
                                label: selectedMaturaSubject1?.name,
                                value: selectedMaturaSubject1,
                            }}
                            onChange={(selectedOption) =>
                                setSelectedMaturaSubject1(selectedOption?.value)
                            }
                            isClearable
                        />
                    </div>
                </div>
                <div className="row">
                    <p></p>
                </div>
                <div className="row">
                    <div className="col-4">
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
                                setSelectedMaturaSubject2(selectedOption?.value)
                            }
                            isClearable
                        />
                    </div>
                </div>
                <div className="row">
                    <p></p>
                </div>
                <div className="row">
                    <div className="col-4">
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
                                setSelectedMaturaSubject3(selectedOption?.value)
                            }
                            isClearable
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <Button variant="primary" onClick={onButtonClick}>
                            Zatwierdź
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default withRole(Preferences, [AppUserRole.CANDIDATE]);
