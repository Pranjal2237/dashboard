"use client";

import { AddDomain, Lists } from "@/components";
import axios from "axios";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const [lists, setLists] = useState([]);
  const [domain, setDomain] = useState("");
  const [sheetID, setSheetID] = useState("");
  const [isEditing, setIsEditing] = useState({ check: false, id: "" });
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      redirect("/");
    } else {
      async function getList() {
        let allDomains = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/list`
        );
        allDomains = allDomains.data;
        console.log(allDomains);
        setLists(allDomains);
      }
      getList();
    }
  }, []);
  return (
    <div className="padding-inline py-[4rem]">
      <AddDomain
        lists={lists}
        setLists={setLists}
        domain={domain}
        setDomain={setDomain}
        sheetID={sheetID}
        setSheetID={setSheetID}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
      <Lists
        lists={lists}
        setLists={setLists}
        setDomain={setDomain}
        setSheetID={setSheetID}
        setIsEditing={setIsEditing}
      />
    </div>
  );
};

export default page;
