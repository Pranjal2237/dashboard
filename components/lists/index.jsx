
import axios from "axios";
import React from "react";

const Lists = ({lists,setLists,setDomain,setSheetID,setIsEditing}) => {
  const handleDelete=async(id,index)=>{
    let list=await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/list/${id}`)
    list=list.data;
    let dummyList=lists
    dummyList?.splice(index,1);
    setLists([...dummyList]);
  }
  const handleEdit=(id,domain,sheet_id,index)=>{
    setDomain(domain);
    setSheetID(sheet_id);
    setIsEditing({check:true,id,index})
  }
  return (
    <div className="py-8 flex flex-col gap-[1rem]">
      {lists.map(({ domain, sheet_id,_id }, index) => {
        return (
          <li
            key={index}
            className="flex justify-between items-center py-[1rem] px-[1rem] border-[2px] border-solid "
          >
            <div className="flex gap-[1rem]">
              <div className="flex gap-[1rem] items-center">
                <p className="font-[600]">Domain:</p>
                <p className="border-[1px] border-solid p-[0.5rem] rounded-md bg-slate-100">
                  {domain}
                </p>
              </div>
              <div className="flex gap-[1rem] items-center">
                <p className="font-[600]">Sheet-ID:</p>
                <p className="border-[1px] border-solid p-[0.5rem] rounded-md bg-slate-100">
                  {sheet_id}
                </p>
              </div>
            </div>
            <div className="flex gap-[1rem]">
              <button className="px-[20px] py-[8px] bg-[red] text-[white] rounded-md" onClick={()=>{handleDelete(_id,index)}}>
                Delete
              </button>
              <button className="px-[20px] py-[8px] bg-[green] text-[white] rounded-md" onClick={()=>{handleEdit(_id,domain,sheet_id,index)}}>
                Edit
              </button>
            </div>
          </li>
        );
      })}
    </div>
  );
};

export default Lists;
