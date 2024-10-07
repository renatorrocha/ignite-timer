import { HandPalm, Play } from "phosphor-react";
import {
    HomeContainer,
    StartCountdownButton,
    StopCountdownButton,
} from "./styles";
import { createContext, useEffect, useState } from "react";
import Countdown from "./_components/countdown";
import NewCycleForm from "./_components/new-cycle-form";

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}

interface CyclesContextType {
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    markCurrentCycleAsFinished: () => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

export default function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

    function markCurrentCycleAsFinished() {
        setCycles((prev) =>
            prev.map((cycle) => {
                if (cycle.id === activeCycleId) {
                    return {
                        ...cycle,
                        finishedDate: new Date(),
                    };
                } else {
                    return cycle;
                }
            })
        );
    }

    // function handleCreateNewSCycle(data: NewCycleFormData) {
    //     const id = String(new Date().getTime());

    //     const newCycle: Cycle = {
    //         id,
    //         task: data.task,
    //         minutesAmount: data.minutesAmount,
    //         startDate: new Date(),
    //     };

    //     setCycles((prev) => [...prev, newCycle]);
    //     setActiveCycleId(id);
    //     setAmountSecondsPassed(0);

    //     reset();
    // }

    function handleInterruptCycle() {
        setCycles((prev) =>
            prev.map((cycle) => {
                if (cycle.id === activeCycleId) {
                    return { ...cycle, interruptedDate: new Date() };
                } else {
                    return cycle;
                }
            })
        );

        setActiveCycleId(null);
    }

    // const task = watch("task");
    // const isSubmitDisabled = !task;

    return (
        <HomeContainer>
            {/* <form onSubmit={handleSubmit(handleCreateNewSCycle)}> */}
            <CyclesContext.Provider
                value={{
                    activeCycle,
                    activeCycleId,
                    markCurrentCycleAsFinished,
                }}
            >
                {/* <NewCycleForm /> */}

                <Countdown />
            </CyclesContext.Provider>

            {activeCycle ? (
                <StopCountdownButton
                    type="button"
                    onClick={handleInterruptCycle}
                >
                    <HandPalm size={24} /> Interromper
                </StopCountdownButton>
            ) : (
                <StartCountdownButton
                    /* disabled={isSubmitDisabled} */ type="submit"
                >
                    <Play size={24} /> Começar
                </StartCountdownButton>
            )}
            {/* </form> */}
        </HomeContainer>
    );
}
