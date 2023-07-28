import React, { useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import { OutlinedInput ,Button,CircularProgress} from '@mui/material';
import DataTable from 'react-data-table-component';
import Logo from './Logo.png'


const columns = [
  
  {
      name: 'Open',
      selector: row => row.open,
      sortable: true,
  },
  {
      name: 'High',
      selector: row => row.high,
      sortable: true,
  },
  {
    name: 'Low',
    selector: row => row.low,
    sortable: true,
},
{
  name: 'Close',
  selector: row => row.close,
  sortable: true,
},
{
  name: 'Volume',
  selector: row => row.volume,
  sortable: true,
},
];
const defaultValues = {
  symbol: '',
  date: '',
};

function App() {
  const [value, setValue] = useState(defaultValues);
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(false);
  const[error,setError]=useState(false);

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if(value.symbol===''||value.date===''){
    setError(true)
  }else{
    setError(false)
    setLoading(true);
    const newValues={
      symbol:value.symbol.toLocaleUpperCase(),
      date:value.date
    }
    try {
      const response = await axios.post('http://localhost:5000/api/fetchStockData', newValues);
      setStockData(response.data);
    } catch (error) {
        console.error(error.message);
    }finally{
      setLoading(false);
    }
  }
};

  return (
  <div>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <div style={{display:'flex',alignItems:'center',fontFamily:'Roboto',color:'#2e83bf'}}>
        <img src={Logo} height={'50px'} alt='stock'/>
        <h2>Trade Statistics</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <OutlinedInput style={inputStyle} type="text" value={value.symbol} onChange={handleChange} name="symbol"  placeholder='Symbol'/>
        <OutlinedInput style={inputStyle} type="date" value={value.date} onChange={handleChange} name="date"  />
        <Button type="submit" variant='contained' disabled={loading}> {loading?<CircularProgress  size={28}/>:'Submit'}</Button>
        {error&&(<p style={{fontSize:'13px',color:'red',fontFamily:'sans-serif'}}>*Please enter the stock symbol and Date </p>)}
      </form>
    </div>
        <Card>
           <DataTable
            columns={columns}
            data={stockData}
            pagination
            striped
            highlightOnHover
            pointerOnHover
            noDataComponent="There are no records to display"
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 20, 50, 75, 100]}
            customStyles={customStyles}
          />
        </Card>
  </div>
  );
}
const customStyles = {
  subHeader: {
      style: {
          backgroundColor: 'blue',
      },
  },
  head: {
      style: {
          color: 'black',
          fontSize: '11px',
          fontWeight: 500,
          minHeight: '2px',
      },
  },
  headRow: {
      style: {
          backgroundColor: '#ADC8E3',
          minHeight: '30px',
          borderBottomWidth: '1px',
          borderBottomColor: '#ffffff',
          borderBottomStyle: 'solid',
      },
  },

  rows: {
      style: {
          fontSize: '11px',
          minHeight: '30px',
      },
  },
}
const inputStyle={
  height:'36px',
  width:'150px',
  marginRight:'20px'

}

export default App;
