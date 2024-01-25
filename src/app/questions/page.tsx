"use client";
import {useMaturaSubjectsResul} from "@/context/maturaSubjectsContext";
import React, {useState} from "react";
import withRole from "@/middleware/withRole";
import {AppUserRole} from "@/enums/role";
import {Button} from "react-bootstrap";
import {useRouter} from "next/navigation";
import {usePreferenceTestResult} from "@/context/preferenceTestResultContext";


const Questions = () => {

    const router = useRouter();

    const {firstSubject, secondSubject, thirdSubject} = useMaturaSubjectsResul()

    const subjectsTab = [firstSubject, secondSubject, thirdSubject]//["Matematyka", "Fizyka", "Informatyka", "Biologia"];

    let resultList: string[] = [];

    let finalResultList: string[] = [];

    const [answer1, setAnswer1] = useState({
        newValue1: 0,
    });
    const [answer2, setAnswer2] = useState({
        newValue2: 0,
    });
    const [answer3, setAnswer3] = useState({
        newValue3: 0,
    });
    const [answer4, setAnswer4] = useState({
        newValue4: 0,
    });
    const [answer5, setAnswer5] = useState({
        newValue5: 0,
    });
    const [answer6, setAnswer6] = useState({
        newValue6: 0,
    });
    const [answer7, setAnswer7] = useState({
        newValue7: 0,
    });
    const [answer8, setAnswer8] = useState({
        newValue8: 0,
    });

    const {setPreferenceTestResult} = usePreferenceTestResult()

    const addBonusPoints = () => {
        if (subjectsTab.includes("Matematyka")) {
            answer1.newValue1++
            answer2.newValue2++
        }
        if (subjectsTab.includes("Fizyka")) {
            answer3.newValue3++
            answer4.newValue4++
        }
        if (subjectsTab.includes("Informatyka")) {
            answer5.newValue5++
            answer6.newValue6++
        }
        if (subjectsTab.includes("Biologia")) {
            answer7.newValue7++
            answer8.newValue8++
        }
    }

    const findResult = () => {
        for (let i = 5; i >= 1; i--) {
            if (answer1.newValue1 === i) {
                resultList.push('Matematyka i analiza danych')
            }
            if (answer2.newValue2 === i) {
                resultList.push('Matematyka stosowana')
            }
            if (answer3.newValue3 === i) {
                resultList.push('Fizyka techniczna')
            }
            if (answer4.newValue4 === i) {
                resultList.push('Lotnictwo i kosmonautyka')
            }
            if (answer5.newValue5 === i) {
                resultList.push('Informatyka stosowana')
            }
            if (answer6.newValue6 === i) {
                resultList.push('Teleinformatyka')
            }
            if (answer7.newValue7 === i) {
                resultList.push('Lekarski')
            }
            if (answer8.newValue8 === i) {
                resultList.push('Inżynieria biomedyczna')
            }
            if (resultList.length + finalResultList.length >= 3) {
                break;
            }

            finalResultList.push(...resultList)
            resultList = [];
        }

        const missingNumberOfElements = 3 - finalResultList.length
        finalResultList.push(...resultList.slice(0, missingNumberOfElements))
    };

    const handleChange1 = (e: any) => {
        const {value} = e.target
        setAnswer1((prevData) => ({
            ...prevData,
            newValue1: parseInt(value),
        }));
        console.log(answer1);
    };

    const handleChange2 = (e: any) => {
        const {value} = e.target
        setAnswer2((prevData) => ({
            ...prevData,
            newValue2: parseInt(value),
        }));
        console.log(answer2);
    };

    const handleChange3 = (e: any) => {
        const {value} = e.target
        setAnswer3((prevData) => ({
            ...prevData,
            newValue3: parseInt(value),
        }));
        console.log(answer3);
    };

    const handleChange4 = (e: any) => {
        const {value} = e.target

        setAnswer4((prevData) => ({
            ...prevData,
            newValue4: parseInt(value),
        }));
        console.log(answer4);
    };

    const handleChange5 = (e: any) => {
        const {value} = e.target

        setAnswer5((prevData) => ({
            ...prevData,
            newValue5: parseInt(value),
        }));
        console.log(answer5);
    };

    const handleChange6 = (e: any) => {
        const {value} = e.target

        setAnswer6((prevData) => ({
            ...prevData,
            newValue6: parseInt(value),
        }));
        console.log(answer6);
    };

    const handleChange7 = (e: any) => {
        const {value} = e.target

        setAnswer7((prevData) => ({
            ...prevData,
            newValue7: parseInt(value),
        }));
        console.log(answer7);
    };

    const handleChange8 = (e: any) => {
        const {value} = e.target

        setAnswer8((prevData) => ({
            ...prevData,
            newValue8: parseInt(value),
        }));
        console.log(answer8);
    };


    const onButtonClick = () => {

        if (answer1.newValue1 == 0 || answer2.newValue2 == 0 || answer3.newValue3 == 0 || answer4.newValue4 == 0 ||
            answer5.newValue5 == 0 || answer6.newValue6 == 0 || answer7.newValue7 == 0 || answer8.newValue8 == 0) {
            alert("Zaznacz odpowiedzi na wszytskie pytania!");
            return;
        }
        addBonusPoints();
        findResult();
        console.log(finalResultList);
        setPreferenceTestResult(finalResultList)
        router.push("/testResult");
    };


    return (
        <div>
            <p></p>
            <form>
                <div className="row">
                    <div className="col-7">
                        <p>Czy lubisz rozwiązywać problemy matematyczne poza lekcjami?</p>
                    </div>
                    <div className="col-1">
                        <label>
                            <input
                                type="radio"
                                value={1}
                                checked={answer1.newValue1 == 1}
                                onChange={handleChange1}
                            />
                            Nie
                        </label>
                    </div>
                    <div className="col-1">
                        <label>
                            <input
                                type="radio"
                                value={2}
                                checked={answer1.newValue1 == 2}
                                onChange={handleChange1}
                            />
                            Chyba nie
                        </label>
                    </div>

                    <div className="col-1">
                        <label>
                            <input
                                type="radio"
                                value={3}
                                checked={answer1.newValue1 == 3}
                                onChange={handleChange1}
                            />
                            Chyba tak
                        </label>
                    </div>
                    <div className="col-1">
                        <label>
                            <input
                                type="radio"
                                value={4}
                                checked={answer1.newValue1 == 4}
                                onChange={handleChange1}
                            />
                            Tak
                        </label>
                    </div>
                </div>
            </form>
            <p></p>
            <form>
                <div className="row">
                    <div className="col-7">
                        <p>Czy interesujesz się możliwościami zastosowania matematyki w technice, przemyśle i
                            biznesie?</p>
                    </div>
                    <div className="col-1">
                        <label>
                            <input
                                type="radio"
                                value={1}
                                checked={answer2.newValue2 == 1}
                                onChange={handleChange2}
                            />
                            Nie
                        </label>
                    </div>
                    <div className="col-1">
                        <label>
                            <input
                                type="radio"
                                value={2}
                                checked={answer2.newValue2 == 2}
                                onChange={handleChange2}
                            />
                            Chyba nie
                        </label>
                    </div>

                    <div className="col-1">
                        <label>
                            <input
                                type="radio"
                                value={3}
                                checked={answer2.newValue2 == 3}
                                onChange={handleChange2}
                            />
                            Chyba tak
                        </label>
                    </div>
                    <div className="col-1">
                        <label>
                            <input
                                type="radio"
                                value={4}
                                checked={answer2.newValue2 == 4}
                                onChange={handleChange2}
                            />
                            Tak
                        </label>
                    </div>
                </div>
            </form>
            <p></p>
            <form>
                <div className="row">
                    <div className="col-7">
                        <p>Czy interesujesz się przemysłem zaawansowanych technologii, wspomaganych komputerowo
                            i rozwiązaniami z zakresu robotyki?</p>
                    </div>
                    <div className="col-1">
                        <label>
                            <input
                                type="radio"
                                value={1}
                                checked={answer3.newValue3 == 1}
                                onChange={handleChange3}
                            />
                            Nie
                        </label>
                    </div>
                    <div className="col-1">
                        <label>
                            <input
                                type="radio"
                                value={2}
                                checked={answer3.newValue3 == 2}
                                onChange={handleChange3}
                            />
                            Chyba nie
                        </label>
                    </div>

                    <div className="col-1">
                        <label>
                            <input
                                type="radio"
                                value={3}
                                checked={answer3.newValue3 == 3}
                                onChange={handleChange3}
                            />
                            Chyba tak
                        </label>
                    </div>
                    <div className="col-1">
                        <label>
                            <input
                                type="radio"
                                value={4}
                                checked={answer3.newValue3 == 4}
                                onChange={handleChange3}
                            />
                            Tak
                        </label>
                    </div>
                </div>
            </form>
            <p></p>
            <form>
                <div className="row">
                    <div className="col-7">
                        <p>Czy interesujesz się projektowaniem i eksploatacją napędów lotniczych i kosmicznych,
                            konstruowaniem płatowców, oraz projektowania systemów awioniki?
                        </p>
                    </div>
                    <div className="col-1">
                        <label>
                            <input
                                type="radio"
                                value={1}
                                checked={answer4.newValue4 == 1}
                                onChange={handleChange4}
                            />
                            Nie
                        </label>
                    </div>
                    <div className="col-1">
                        <label>
                            <input
                                type="radio"
                                value={2}
                                checked={answer4.newValue4 == 2}
                                onChange={handleChange4}
                            />
                            Chyba nie
                        </label>
                    </div>

                    <div className="col-1">
                        <label>
                            <input
                                type="radio"
                                value={3}
                                checked={answer4.newValue4 == 3}
                                onChange={handleChange4}
                            />
                            Chyba tak
                        </label>
                    </div>
                    <div className="col-1">
                        <label>
                            <input
                                type="radio"
                                value={4}
                                checked={answer4.newValue4 == 4}
                                onChange={handleChange4}
                            />
                            Tak
                        </label>
                    </div>
                </div>
            </form>
            <p></p>
            <form>
                <div className="row">
                    <div className="col-7">
                        <p>Czy pasjonujesz się programowaniem aplikacji, analizą danych czy sieciami komputerowymi?
                        </p>
                    </div>
                    <div className="col-1">
                        <label>
                            <input
                                type="radio"
                                value={1}
                                checked={answer5.newValue5 == 1}
                                onChange={handleChange5}
                            />
                            Nie
                        </label>
                    </div>
                    <div className="col-1">
                        <label>
                            <input
                                type="radio"
                                value={2}
                                checked={answer5.newValue5 == 2}
                                onChange={handleChange5}
                            />
                            Chyba nie
                        </label>
                    </div>

                    <div className="col-1">
                        <label>
                            <input
                                type="radio"
                                value={3}
                                checked={answer5.newValue5 == 3}
                                onChange={handleChange5}
                            />
                            Chyba tak
                        </label>
                    </div>
                    <div className="col-1">
                        <label>
                            <input
                                type="radio"
                                value={4}
                                checked={answer5.newValue5 == 4}
                                onChange={handleChange5}
                            />
                            Tak
                        </label>
                    </div>
                </div>
            </form>
            <p></p>
            <form>
                <div className="row">
                    <div className="col-7">
                        <p>Czy interesujesz się programowaniem, sieciami komputerowymi, telekomunikacją,
                            bezpieczeństwem informatycznym?</p>
                    </div>
                    <div className="col-1">
                        <label>
                            <input
                                type="radio"
                                value={1}
                                checked={answer6.newValue6 == 1}
                                onChange={handleChange6}
                            />
                            Nie
                        </label>
                    </div>
                    <div className="col-1">
                        <label>
                            <input
                                type="radio"
                                value={2}
                                checked={answer6.newValue6 == 2}
                                onChange={handleChange6}
                            />
                            Chyba nie
                        </label>
                    </div>

                    <div className="col-1">
                        <label>
                            <input
                                type="radio"
                                value={3}
                                checked={answer6.newValue6 == 3}
                                onChange={handleChange6}
                            />
                            Chyba tak
                        </label>
                    </div>
                    <div className="col-1">
                        <label>
                            <input
                                type="radio"
                                value={4}
                                checked={answer6.newValue6 == 4}
                                onChange={handleChange6}
                            />
                            Tak
                        </label>
                    </div>
                </div>
            </form>
            <p></p>
            <form>
                <div className="row">
                    <div className="col-7">
                        <p>Czy jesteś osobą odpowiedzialną, cierpliwą, potrafiącą łatwo nawiązywać kontakt?
                        </p>
                    </div>
                    <div className="col-1">
                        <label>
                            <input
                                type="radio"
                                value={1}
                                checked={answer7.newValue7 == 1}
                                onChange={handleChange7}
                            />
                            Nie
                        </label>
                    </div>
                    <div className="col-1">
                        <label>
                            <input
                                type="radio"
                                value={2}
                                checked={answer7.newValue7 == 2}
                                onChange={handleChange7}
                            />
                            Chyba nie
                        </label>
                    </div>

                    <div className="col-1">
                        <label>
                            <input
                                type="radio"
                                value={3}
                                checked={answer7.newValue7 == 3}
                                onChange={handleChange7}
                            />
                            Chyba tak
                        </label>
                    </div>
                    <div className="col-1">
                        <label>
                            <input
                                type="radio"
                                value={4}
                                checked={answer7.newValue7 == 4}
                                onChange={handleChange7}
                            />
                            Tak
                        </label>
                    </div>
                </div>
            </form>
            <p></p>
            <form>
                <div className="row">
                    <div className="col-7">
                        <p>Czy chcesz wykorzystać innowacyjną wiedzę w służbie ludziom,
                            interesujesz się zagadnieniami z zakresu medycyny, fizyki,
                            biologii oraz miasz dodatkowo zmysł techniczny.</p>
                    </div>
                    <div className="col-1">
                        <label>
                            <input
                                type="radio"
                                value={1}
                                checked={answer8.newValue8 == 1}
                                onChange={handleChange8}
                            />
                            Nie
                        </label>
                    </div>
                    <div className="col-1">
                        <label>
                            <input
                                type="radio"
                                value={2}
                                checked={answer8.newValue8 == 2}
                                onChange={handleChange8}
                            />
                            Chyba nie
                        </label>
                    </div>

                    <div className="col-1">
                        <label>
                            <input
                                type="radio"
                                value={3}
                                checked={answer8.newValue8 == 3}
                                onChange={handleChange8}
                            />
                            Chyba tak
                        </label>
                    </div>
                    <div className="col-1">
                        <label>
                            <input
                                type="radio"
                                value={4}
                                checked={answer8.newValue8 == 4}
                                onChange={handleChange8}
                            />
                            Tak
                        </label>
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

}


export default withRole(Questions, [AppUserRole.CANDIDATE]);


