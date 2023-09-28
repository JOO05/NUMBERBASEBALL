import React, { useState } from 'react';
import Try from './Try';

function getNumbers(){ 
const candidate=[1,2,3,4,5,6,7,8,9];
const array=[];
for (let i=0;i<4;i+=1){
  const chosen=candidate.splice(Math.floor(Math.random()*(9-i)),1)[0];
  array.push(chosen);
  }
  return array;
};

const NumberBaseball=()=>{
const [result,setResult]=useState('');
const [value,setValue]=useState('');
const [answer,setAnswer]=useState(getNumbers);
const [tries,setTries]=useState([]);
//함수 컴포넌트 특성상 매번 리렌더링 될 때마다 전체 부분이 실행되는데
//getNumbers가 매번 리렌더링 되므로 괄호를 제외 시 한 번만 실행됨
//첫번째 호출의 리턴값만 저장하면 효율성 상승, lazy init 늦은 초기화 기법
const onSubmitForm=(e)=>{
  e.preventDefault();
  if (value===answer.join('')){
    setResult('');
    setTries((prevTries)=>{
      return [...prevTries,{try:value,result:'홈런!'}]
    }); //예전 것으로 현재를 만드므로 prevState처럼 설정 필요
    alert('게임을 다시 시작합니다!');
    setValue('');
    setAnswer(getNumbers());
    setTries([]);
  }else{
    const answerArray=value.split('').map((v)=>parseInt(v));
    let strike=0;
    let ball=0;
    if (tries.length>=9){
      setResult(`10번넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`);
      alert('게임을 다시 시작합니다!');
      setValue('');
      setAnswer(getNumbers());
      setTries([]);
    } else {
      for (let i=0;i<4;i+=1){
        if (answerArray[i]===answer[i]){
          strike+=1;
        } else if (answer.includes(answerArray[i])){
          ball+=1;
        }
      }
      setTries((prevTries)=>{
        return [...prevTries,{try:value,result:`${strike} 스트라이크, ${ball} 볼입니다`}]
      });
      setValue('');
    }
  }
};

const onChangeInput=(e)=>{
  setValue(e.target.value);
};

return (
  <>
    <h1>{result}</h1>
    <form onSubmit={onSubmitForm}>
      <input maxLength={4} value={value} onChange={onChangeInput}/>
    </form>
    <div>시도: {tries.length}</div>
    <ul>     
      {tries.map((v,i)=>{
          return (
          <Try key={`${i+1}차 시도 :`} tryInfo={v}/>
          );
      })}
    </ul>
  </>)
}


export default NumberBaseball;