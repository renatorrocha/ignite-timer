import { FormContainer, TaskInput, MinutesAmountInput } from "./styles";
import { useContext } from "react";
import { CyclesContext } from "../..";
import { useFormContext } from "react-hook-form";

export default function NewCycleForm() {
    const { activeCycle } = useContext(CyclesContext);
    const { register } = useFormContext();

    return (
        <FormContainer>
            <label htmlFor="task">Vou trabalhar em</label>
            <TaskInput
                id="task"
                placeholder="De um nome para o seu projeto"
                list="task-suggestions"
                disabled={!!activeCycle}
                {...register("task")}
            />

            <datalist id="task-suggestions">
                <option value="Projeto 1"></option>
                <option value="Projeto 2"></option>
                <option value="Projeto 3"></option>
                <option value="Projeto 4"></option>
            </datalist>

            <label htmlFor="minutesAmount">durante</label>
            <MinutesAmountInput
                type="number"
                id="minutesAmount"
                step={5}
                min={5}
                max={60}
                placeholder="00"
                disabled={!!activeCycle}
                {...register("minutesAmount", { valueAsNumber: true })}
            />

            <span>minutos.</span>
        </FormContainer>
    );
}
