import axios from "axios";
import React from "react";

const AddDomain = ({ lists, setLists,domain,setDomain,sheetID,setSheetID,isEditing,setIsEditing }) => {
  
  const addDomain = async (e) => {
    e.preventDefault();
    let data = {
      domain: domain,
      sheet_id: sheetID,
    };
    try {
      let adddomain = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/list`,
        data
      );
      adddomain = adddomain.data;
      setLists([adddomain, ...lists]);
      setDomain("");
      setSheetID("");
      setIsEditing({check:false,id:""});
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit=async()=>{
    try {
      let list=await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/list/${isEditing.id}`,{domain,sheet_id:sheetID})
      list=list.data;
      let dummyList=lists;
      dummyList?.splice(isEditing?.index,1,list);
      setLists([...dummyList]);
      setDomain("");
      setSheetID("");
      setIsEditing({check:false,id:""});
    } catch (error) {
      console.log(error);
    }
  }

  console.log(isEditing);

  return (
    <div className="flex justify-between gap-[1rem] py-[1rem] px-[1rem] border-[2px] border-solid">
      <div className="flex justify-between items-center w-[100%]">
        <div className="flex gap-[1rem] items-center w-[40%]">
          <p className="font-[600]">Domain:</p>
          <input
            type="text"
            value={domain}
            placeholder="enter domain...."
            className="p-[8px] border-[1px] border-solid outline-none rounded-md w-[100%]"
            onChange={(e) => {
              setDomain(e.target.value);
            }}
          />
        </div>
        <div className="flex gap-[1rem] items-center w-[55%]">
          <p className="font-[600] min-w-max">Sheet-ID:</p>
          <input
            type="text"
            value={sheetID}
            placeholder="enter sheet id....."
            className="p-[8px] border-[1px] border-solid outline-none rounded-md w-[100%]"
            onChange={(e) => {
              setSheetID(e.target.value);
            }}
          />
        </div>
      </div>
      <button
        className="px-[20px] py-[8px] bg-[green] text-[white] rounded-md"
        onClick={(e) => {
          if(isEditing?.check){
            handleEdit()
          }
          else{
          addDomain(e);
          }
        }}
      >
        {isEditing?.check?"Edit":"Add"}
      </button>
    </div>
  );
};

export default AddDomain;
