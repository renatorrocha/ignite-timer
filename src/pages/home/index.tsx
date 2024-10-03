import { Play } from "phosphor-react";
import {
    HomeContainer,
    FormContainer,
    CountdownContainer,
    Separator,
    StartCountdownButton,
    TaskInput,
    MinutesAmountInput,
} from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const newCycleFormValidationSchema = z.object({
    task: z.string().min(1, "Informe a tarefa"),
    minutesAmount: z.coerce
        .number()
        .min(5, "O intervalo precisa ser de no mínimo 5 minutos.")
        .max(60, "O intervalo precisa ser de no máximo 60 minutos."),
});

type NewCycleFormData = z.infer<typeof newCycleFormValidationSchema>;

export default function Home() {
    const { register, handleSubmit, watch } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: "",
            minutesAmount: 0,
        },
    });

    function handleCreateNewSCycle(data: NewCycleFormData) {
        console.log(data);
    }
    const task = watch("task");
    const isSubmitDisabled = !task;

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewSCycle)}>
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput
                        id="task"
                        placeholder="De um nome para o seu projeto"
                        list="task-suggestions"
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
                        {...register("minutesAmount", { valueAsNumber: true })}
                    />

                    <span>minutos.</span>
                </FormContainer>

                <CountdownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>

                <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                    <Play size={24} /> Começar
                </StartCountdownButton>
            </form>
        </HomeContainer>
    );
}
