import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {monthNames, years} from "../utils";
import Select from "./Select";

const InputWrapper = styled.div`
  border-radius:10px;
  background-color:${props => props.theme.color.dark4};
  padding:15px;
`;

const Title = styled.h5`
  padding:0;
  margin: 0 0 10px 0;
  font-weight: normal;
  font-size: 12px;
  color:#fff;
`;

const InputsBox = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: center;
`;

const DaySelect = styled(Select)`
  width:20%;
  text-align: center;
`;

const YearSelect = styled(Select)`
  width:30%;
  text-align: center;
`;

const MonthSelect = styled(Select)`
  width:48%;
  text-align: center;
  &>div:nth-child(2)>div:first-child{
    display: none;
  }
`;

const months = monthNames.map(e => ({title: e}));

function daysInCurrMonth() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
}

const DateInput = ({changeHandle, title, initialValue}) => {
    const date = new Date();
    const [state, setState] = useState({
        day: initialValue?initialValue.getDate():date.getDate(),
        month: initialValue?initialValue.getMonth():date.getMonth() + 1,
        year: initialValue?initialValue.getFullYear():date.getFullYear(),
        daysInMonth: Array.from(
            {length: daysInCurrMonth()},
            (e, i) => ({title: i + 1})
        )
    });
    const [openSelect,setOpenSelect] = useState('');

    useEffect(e=>{
        changeHandle({
            day:state.day,
            month:state.month,
            year:state.year,
        })
    },[state]);

    return <InputWrapper>
        <Title>{title}</Title>
        <InputsBox>
            <DaySelect
                initialOpen={openSelect==='day'}
                options={state.daysInMonth}
                defaultValue={state.day}
                onClick={()=>setOpenSelect('day')}
                changeHandle={(day) => {
                    setState({...state, day: day})
                }}/>
            <MonthSelect
                initialOpen={openSelect==='month'}
                options={months}
                defaultValue={monthNames[state.month]}
                onClick={()=>setOpenSelect('month')}
                changeHandle={(month) => {
                    setState({
                        ...state,
                        month: monthNames.findIndex(e => e === month),
                        daysInMonth: Array.from(
                            {length: new Date(state.year, monthNames.findIndex(e => e === month), 0).getDate()},
                            (e, i) => ({title: i + 1}))
                    });
                }}/>
            <YearSelect
                initialOpen={openSelect==='year'}
                options={years}
                defaultValue={state.year}
                onClick={()=>setOpenSelect('year')}
                changeHandle={(year) => {
                    setState({
                        ...state,
                        year: year,
                        daysInMonth: Array.from(
                            {length: new Date(year, state.month, 0).getDate()},
                            (e, i) => ({title: i + 1}))
                    })
                }}/>
        </InputsBox>
    </InputWrapper>
};

export default DateInput;