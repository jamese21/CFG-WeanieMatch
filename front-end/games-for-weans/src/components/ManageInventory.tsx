import React from "react";
import {useForm} from "react-hook-form";
import { useState } from "react";
import '../css/InventoryForm.css';
import Inventory from './Inventory'

export default function ManageInventory() {
    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(errors);
  const [equipmentType, setEquipmentType] = useState(); 

  const handleEquipmentChange = (e: any) => {
    setEquipmentType(e.target.value);
  };

  const onSubmit = (data: any) => {
    console.log(data); 
  };
    return(
    <div>
    <h2>Add New Equipment</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="equipmentType" className="equipmentType">Equipment Type: </label>
          <select
            id="equipmentType"
            name="equipmentType"
            value={equipmentType}
            onChange={handleEquipmentChange}
          >
            <option value="">Select Equipment Type</option>
            <option value="iPad">iPad</option>
            <option value="PS4">PS4</option>
            <option value="PS5">PS5</option>
            <option value="Xbox">Xbox</option>
          </select>
                  <button type="submit" className="purpleButton">Submit</button>
          <Inventory></Inventory>
        </div>

      </form>

    </div>
    )
}