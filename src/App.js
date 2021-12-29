import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const dataList = [
    {
      key: 'flow-1',
      status: '00-未派車',
      disabled: true,
    },
    {
      key: 'flow-2',
      status: '00-未派車',
      disabled: false,
    },
    {
      key: 'flow-3',
      status: '00-未派車',
      disabled: true,
    },
    {
      key: 'flow-4',
      status: '00-未派車',
      disabled: false,
    },
    {
      key: 'flow-5',
      status: '00-未派車',
      disabled: false,
    },
    {
      key: 'flow-6',
      status: '00-未派車',
      disabled: true,
    },
  ]

  const [isShiftHeld, setIsShiftHeld] = useState(false)
  const [checkedItems, setCheckedItems] = useState([]);

  const handleSelected = (event) => {
    let temp = [...checkedItems];
    const isSelected = checkedItems.includes(event.target.value)

    if (isShiftHeld) {  // press shift btn
      if (isSelected) {
        temp = temp.filter(item => item !== event.target.value)
      } else {
        temp = [...temp, event.target.value]
      }
    } else { // no press shift btn
      if (isSelected) {
        temp = []
      } else {
        temp = [event.target.value]
      }
    }
    
    setCheckedItems(temp)
  }

  const handleSelectedAll = () => {
    const list = dataList.filter(item => !item.disabled)
    if (checkedItems.length > 0) {
      // remove all
      setCheckedItems([])
    } else {
      // selected all
      setCheckedItems(list.map(item => item.key))
    }
  }

  // shift handler
  const downHandler = ({ key }) => {
    if (key === 'Shift') {
      setIsShiftHeld(true);
    }
  }

  const upHandler = ({ key }) => {
    if (key === 'Shift') {
      setIsShiftHeld(false);
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []);

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <td>
              <input
                type="checkbox"
                checked={checkedItems.length > 0}
                onChange={handleSelectedAll}
              />
            </td>
            <td>狀態</td>
          </tr>
        </thead>
        <tbody>
          {
            dataList.map(item => (
              <tr key={item.key}>
                <td>
                  <input
                    type="checkbox"
                    value={item.key}
                    checked={checkedItems.includes(item.key)}
                    onChange={handleSelected}
                    disabled={item.disabled}
                  />
                </td>
                <td>
                  {item.status}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
