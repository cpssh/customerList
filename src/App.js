import React, { useState, useEffect } from "react";
import './App.css'
import { useDispatch } from 'react-redux'
import {
  getCustomerList
} from "./redux/actions/customer.actions"
import { connect } from "react-redux"


function App (props) {
  const dispatch = useDispatch();
  const [sId, setSId] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");

  const [allCustomerList, setAllCustomerList] = useState([]);


  useEffect(() => {
    getCustomersList()
  }, [])

  const getCustomersList = async () => {
    let response = await dispatch(getCustomerList());
    if(response != null) {
    setAllCustomerList(response.data ? response.data : []);
    }
  }

  const onSave = () => {
    if(sId != null){
      let objects = allCustomerList.map((item, index)=> {
        if(item.id == sId){
          return {...item,
            name: name,
            email: email,
            phone: phone,
            address: {
              city: city,
              zipcode: zipCode
            }
          }
        }
        return item;
      });

      setAllCustomerList(objects);
      setSId(null);
      setName('');
      setEmail('');
      setPhone('');
      setCity('');
      setZipCode('');

    } else {
      let objects = [
        ...allCustomerList, {
          id: allCustomerList.length + 1,
          name: name,
          email: email,
          phone: phone,
          address: {
            city: city,
            zipcode: zipCode
          }
        }
      ]
      setAllCustomerList(objects);
      setSId(null);
      setName('');
      setEmail('');
      setPhone('');
      setCity('');
      setZipCode('');
    }
  }

  const onEdit = (obj) => {
      setSId(obj.id);
      setName(obj.name);
      setEmail(obj.email);
      setPhone(obj.phone);
      setCity(obj.address.city);
      setZipCode(obj.address.zipcode);
  }

  const onDelete = (obj) => {
    let filter = allCustomerList.filter(x=> x.id != obj.id);
    setAllCustomerList(filter);
  }

  return (
    <div className='App'>
      <div style={{ textAlign: 'left' }}>
        <h1>Customers</h1>
      </div>
      <div style={{ margin: '20px 0px', textAlign: 'left' }}>
        <input type="text" id="name" name="name" placeholder="Name" value={name} onChange={(event)=> setName(event.target.value)} /> &nbsp;&nbsp;
        <input type="text" id="email" name="email" placeholder="Email" value={email} onChange={(event)=> setEmail(event.target.value)} />&nbsp;&nbsp;
        <input type="text" id="phone" name="phone" placeholder="Phone" value={phone} onChange={(event)=> setPhone(event.target.value)} />&nbsp;&nbsp;
        <input type="text" id="city" name="city" placeholder="City" value={city} onChange={(event)=> setCity(event.target.value)} />&nbsp;&nbsp;
        <input type="text" id="zipcode" name="zipcode" placeholder="Zip Code" value={zipCode} onChange={(event)=> setZipCode(event.target.value)} />&nbsp;&nbsp;
        <button type="button" onClick={onSave}>Save</button>
      </div>
      <table style={{width: '100%'}}>
        <thead>
          <tr>
            <th>
              Id
            </th>
            <th>
              Name
            </th>
            <th>
              Email
            </th>
            <th>
              Phone
            </th>
            <th>
              City
            </th>
            <th>
              Zip code
            </th>
            <th>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
        {allCustomerList.map((item, index)=><tr>
            <td>
              {item.id}
            </td>
            <td>
            {item.name}
            </td>
            <td>
            {item.email}
            </td>
            <td>
            {item.phone}
            </td>
            <td>
            {item.address.city}
            </td>
            <td>
            {item.address.zipcode}
            </td>
            <td>
              <button type="button" onClick={() => onEdit(item)}>Edit</button>&nbsp;&nbsp;
              <button type="button" onClick={()=> onDelete(item)}>Remove</button>
            </td>
          </tr> )} 
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    customersList: state.customer.customersList ? state.customer.customersList : []
  }
}

export default connect(mapStateToProps)(App)
