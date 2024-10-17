import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig'; 
import { getDoc, doc, getDocs, collection, addDoc, deleteDoc, updateDoc } from 'firebase/firestore'; 
import "./Daseboard.css"

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [record, setRecord] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log(currentUser);
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); 
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        console.log(userDoc.data());
      }
    };

    fetchUser();
  }, [user]);

  const fetchData = async () => {
    const data = await getDocs(collection(db, "Users"));
    const newData = data.docs.map((item) => ({ docId: item.id, ...item.data() }));
    setRecord(newData);
  };

  useEffect(() => {
    fetchData(); 
  }, []);

  const addData = async () => {
    if (editIndex === null) {
      await addDoc(collection(db, "Users"), { name, city, mobileNumber, email });
    } else {
      await updateDoc(doc(db, "Users", editIndex), { name, city, mobileNumber, email });
      setEditIndex(null); 
    }
    setName("");
    setCity("");
    setMobileNumber("");
    setEmail("");
    fetchData(); 
  };

  const deleteData = async (docId) => {
    await deleteDoc(doc(db, "Users", docId));
    fetchData();
  };

  const editData = (docId) => {
    const singleData = record.find((item) => item.docId === docId);
    setName(singleData.name);
    setCity(singleData.city);
    setMobileNumber(singleData.mobileNumber);
    setEmail(singleData.email);
    setEditIndex(docId);
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-greeting">Dashboard</h1>

      <input type="text" className="input-field" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" className="input-field" placeholder='City' value={city} onChange={(e) => setCity(e.target.value)} />
      <input type="text" className="input-field" placeholder='Mobile Number' value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
      <input type="text" className="input-field" placeholder='Email-id' value={email} onChange={(e) => setEmail(e.target.value)} />
      <button className="submit-button" onClick={addData}>{editIndex === null ? "Add" : "Update"}</button>

      <table className="record-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>Mobile Number</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {record.map((e) => (
            <tr key={e.docId} className="record-item">
              <td>{e.name}</td>
              <td>{e.city}</td>
              <td>{e.mobileNumber}</td>
              <td>{e.email}</td>
              <td>
                <button className="edit-button" onClick={() => editData(e.docId)}>Edit</button>
                <button className="delete-button" onClick={() => deleteData(e.docId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
