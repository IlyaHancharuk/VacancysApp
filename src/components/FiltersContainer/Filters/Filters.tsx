import React, { FC } from "react";
import './filters.scss'
import TextButton from "../../Buttons/TextButton/TextButton";
import { SelectComponent } from "../../Select/SelectComponent";
import { SalaryInput } from "../../SalaryInput/SalaryInput";
import Button from "../../Buttons/Button/Button";
import { useForm } from '@mantine/form';
import { FiltersFormValuesType } from "../../../types";
import { SelectItem } from "@mantine/core";
import { useAppDispatch } from "../../../App/store";
import { setFormParamsAC } from "../../../App/reducers/filterParamsReducer";

type FiltersPropsType = {
    disabled: boolean
    selectItems: SelectItem[]
    onSubmitCallback(filterValues: FiltersFormValuesType): void
    onDrawerClose?(): void
}

const Filters: FC<FiltersPropsType> = ({
    disabled,
    selectItems,
    onSubmitCallback,
    onDrawerClose,
}) => {
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

    const dispatch = useAppDispatch()

    const resetButtonDisabled = 
        !form.isDirty()
        || JSON.stringify(form.values) === JSON.stringify(initialValues)

    return (
        <div className='filters'>
            <form onSubmit={form.onSubmit((values) => {
                        dispatch(setFormParamsAC(values))
                        onSubmitCallback(values)
                        onDrawerClose && onDrawerClose() 
                    })}
                  onReset={form.onReset}
            >
                <div className='filters__top-block'>
                    <h3 className='filters__title'>Фильтры</h3>
                    <TextButton disabled={resetButtonDisabled}
                                type="reset"
                                innerText='Сбросить все'
                    />
                </div>
                <h5 className='filters__subtitle'>Отрасль</h5>
                <div className='filters__category-select'>
                    <SelectComponent disabled={disabled}
                                     form={form}
                                     formValue="category"
                                     items={selectItems}
                    />
                </div>
                <h5 className='filters__subtitle'>Оклад</h5>
                <div className='filters__salary-inputs'>
                    <SalaryInput dataElem="salary-from-input"
                                 disabled={disabled}
                                 placeholder='От'
                                 form={form}
                                 formValue="payment_from"
                    />
                    <SalaryInput dataElem="salary-to-input"
                                 disabled={disabled}
                                 placeholder='До'
                                 form={form}
                                 formValue="payment_to"
                    />
                </div>
                <div className='filters__submit-button'>
                    <Button data-elem="search-button"
                            disabled={disabled}
                            type="submit">
                        Применить
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default Filters;
