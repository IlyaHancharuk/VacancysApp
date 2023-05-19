import React, { FC } from "react";
import './filters.scss'
import TextButton from "../Buttons/TextButton/TextButton";
import { SelectComponent } from "../Select/SelectComponent";
import { SalaryInput } from "../SalaryInput/SalaryInput";
import Button from "../Buttons/Button/Button";
import { useForm } from '@mantine/form';
import { FiltersFormValuesType } from "../../types";
import { SelectItem } from "@mantine/core";

type FiltersPropsType = {
    selectItems: SelectItem[]
}

const Filters: FC<FiltersPropsType> = ({ selectItems }) => {
    const initialValues: FiltersFormValuesType = {
        category: '',
        payment_from: '',
        payment_to: '',
    }

    const form = useForm<FiltersFormValuesType>({
        initialValues: initialValues,
        initialDirty: {
            category: true,
            payment_from: true,
            payment_to: true,
        }
    });

    const resetButtonDisabled = 
        !form.isDirty()
        || JSON.stringify(form.values) === JSON.stringify(initialValues)

    return (
        <div className='filters'>
            <form onSubmit={form.onSubmit((values) => console.log(values))}
                  onReset={form.onReset}
            >
                <div className='filters__top-block'>
                    <h3 className='filters__title'>Фильтры</h3>
                    <TextButton disabled={resetButtonDisabled} type="reset" innerText='Сбросить все' />
                </div>
                <h5 className='filters__subtitle'>Отрасль</h5>
                <div className='filters__category-select'>
                    <SelectComponent form={form} formValue="category" items={selectItems} />
                </div>
                <h5 className='filters__subtitle'>Оклад</h5>
                <div className='filters__salary-inputs'>
                    <SalaryInput placeholder='От' form={form} formValue="payment_from" />
                    <SalaryInput placeholder='До' form={form} formValue="payment_to" />
                </div>
                <div className='filters__submit-button'>
                    <Button type="submit">Применить</Button>
                </div>
            </form>
        </div>
    )
}

export default Filters;
