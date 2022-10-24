import React, { useEffect, useState } from 'react';
import { BsCheckLg } from 'react-icons/bs';
import './App.css';

function App() {

  const [lists, setLists] = useState(JSON.parse(localStorage.getItem('lists')))
  const [task, setTask] = useState({ id: 0, task: '', done: false, })
  const [edit, setEdit] = useState('')
  const [btn, setBtn] = useState(true)

  const handleChange = (e) => {
    const text = e.target.value

    setTask({ ...task, task: text, })
  }

  const handleClickAdd = () => {
    task.id = task.id + 1

    setTask({ ...task, id: task.id, })

    const arrList = [...lists, { ...task }]
    setLists([...lists, { ...task }])

    document.querySelector('.textbox').value = ''

    setTask({ ...task, task: '', })

    localStorage.setItem('lists', JSON.stringify(arrList))
  }

  const handleClickDelete = (id) => {
    const arr = lists.filter((list) => {
      if (id != list.id) {
        return list
      }
    })

    setLists(arr)
    localStorage.setItem('lists', JSON.stringify(arr))
  }

  const handleClickEdit = (id) => {
    
    const arr = []
    lists.filter((list) => {
      if (list.id == id) {
        list.btnDone = true
        list.edit = true
      }

      arr.push(list)
    })

    setLists(arr)
    localStorage.setItem('lists', JSON.stringify(arr))
  }

  const handleChangeEdit = (e) => {

    const text = e.target.value

    if (text != '') {
      setBtn(false)
      setEdit(text)
    } else {
      setBtn(true)
    }

  }

  const handleClickConfirmEdit = (id) => {
    setBtn(true)

    const arr = []
    lists.filter((list) => {
      if (list.id == id) {
        list.edit = false
        list.task = edit
        list.btnDone = false
      }

      arr.push(list)
    })

    setLists(arr)
    localStorage.setItem('lists', JSON.stringify(arr))
  }

  const handleClickCancelEdit = (id) => {
    setBtn(true)

    const arr = []
    lists.filter((list) => {
      if (list.id == id) {
        list.edit = false
        list.btnDone = false
      }

      arr.push(list)
    })

    setLists(arr)
    localStorage.setItem('lists', JSON.stringify(arr))
  }

  const handleClickDone = (id) => {
    const arr = []
    lists.filter((list) => {
      if (list.id == id) {
        list.btnDone = true
        list.done = true
      }

      arr.push(list)
    })

    setLists(arr)
    localStorage.setItem('lists', JSON.stringify(arr))
  }

  console.log(lists)

  return (
    <div>
      {
        lists == null ? localStorage.setItem('lists', JSON.stringify([])) : <div className="App">
          <h1>Todolist</h1>

          <div>
            <input className='textbox' type='text' onChange={(e) => handleChange(e)} />
            <button onClick={() => handleClickAdd()}>เพิ่ม</button>
          </div>

          <div style={{ width: '50%', height: 'max-content', margin: 'auto', }}>
            {lists.map((list, id) => {
              return (
                <div key={id} style={{ boxSizing: 'border-box', border: '1px solid black', margin: '10px', padding: '10px', backgroundColor: 'powderblue', }}>
                  {!list.edit ? <div style={{ display: 'flex', justifyContent: 'center' }}><div><h2 style={{ margin: '0 auto 20px' }}>{list.task}</h2></div><div>{!list.btnDone ? '' : <h3 style={{ margin: '0 auto 20px', color: 'green' }}><BsCheckLg /></h3>}</div></div> : <div><input className='textbox-edit' type="text" onChange={e => handleChangeEdit(e)} /><button className='btn' disabled={btn} onClick={() => handleClickConfirmEdit(list.id)}>ยืนยัน</button><button onClick={() => handleClickCancelEdit(list.id)}>ยกเลิก</button></div>}
                  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <div><button onClick={() => handleClickDelete(list.id)}>ลบ</button>{list.done == false ? <button onClick={() => handleClickEdit(list.id)}>แก้ไข</button> : ''}</div>
                    {list.task != '' || list.done == true ? <div><button onClick={() => handleClickDone(list.id)} disabled={list.btnDone}>เรียบร้อย</button></div> : ''}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      }
    </div >

  );
}

export default App;
