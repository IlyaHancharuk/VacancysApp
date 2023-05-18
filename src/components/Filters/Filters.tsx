import React, { FC } from "react";
import './filters.scss'
import TextButton from "../Buttons/TextButton/TextButton";
import { SelectComponent } from "../Select/SelectComponent";
import { SalaryInput } from "../SalaryInput/SalaryInput";
import Button from "../Buttons/Button/Button";

type FiltersPropsType = {
    selectItems: string[]
}

const Filters: FC<FiltersPropsType> = ({ selectItems }) => {
    return (
        <div className='filters'>
                <div className='filters__top-block'>
                    <h3 className='filters__title'>Фильтры</h3>
                    <TextButton innerText='Сбросить все' />
                </div>
                <h5 className='filters__subtitle'>Отрасль</h5>
                <div className='filters__category-select'>
                    <SelectComponent items={selectItems}/>
                </div>
                <h5 className='filters__subtitle'>Оклад</h5>
                <div className='filters__salary-inputs'>
                    <SalaryInput placeholder='От'/>
                    <SalaryInput placeholder='До'/>
                </div>
                <div className='filters__submit-button'>
                    <Button>Применить</Button>
                </div>
            </div>
    )
}

export default Filters;
