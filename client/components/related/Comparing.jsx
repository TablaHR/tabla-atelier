/* eslint-disable react/prop-types */
import React from 'react'
import { GrCheckmark } from "react-icons/gr";


export default function Comparing(props) {
  const {item, cur } = props;
  let Comparing_table = {};
  for (let i=0; i<item.features.length; i++) {
    let key = item.features[i].feature
    let value = item.features[i].value
    if (value === undefined) value = ' '
    if (value === null) value = <GrCheckmark  />
    Comparing_table[key]=Comparing_table[key] || {'left':' ','right':' '};
    Comparing_table[key]['left']=value

  }
  for (let i=0; i<cur.features.length; i++) {
    let key = cur.features[i].feature
    let value = cur.features[i].value
    if (value === undefined) value = ' '
    if (value === null) value = <GrCheckmark />

    Comparing_table[key]=Comparing_table[key] || {'left':' ','right':' '};
    Comparing_table[key]['right']=value
  }


  return (
    <div>
    {Object.keys(Comparing_table).map(key=>{
        return (
          <div key={key} style={{display: 'grid',
            gridTemplateColumns: '30% 40% 30%'}}>
          <div>{Comparing_table[key]['left']|| 'Null'} </div>
            <div style={{textAlign:'center'}}> {key} </div>
            <div style={{textAlign:'right'}}>{Comparing_table[key]['right']||'Null'}</div>
          </div>
        )
    })}
    </div>
    )


}
