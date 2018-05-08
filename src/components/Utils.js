import React from "react";

const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newRoom = () => {
  const statusChance = Math.random();
  return {
    RoomId: "12345",
    RoomName: "dummy room",
    RoomUrl: "dummy room url",
    Status: "Active",
    StorageURL: "",
    AssignedTo: "",
    CreatedBy: ""
  };
};

export function makeData(len = 5553) {
  return range(len).map(d => {
    return {
      ...newRoom(),
      children: range(10).map(newRoom)
    };
  });
}

export const Tips = () =>
  <div style={{ textAlign: "center" }}>
    <em>Tip: Hold shift when sorting to multi-sort!</em>
  </div>;

export function getRoomList(){
  $.ajax({  
    url: API_CONSTANT_MAP.getroomlist,  
    type: "GET",  
    dataType: 'json',  
    ContentType: 'application/json',  
    success: function(data) {
      return {data};           
    }.bind(this),  
    error: function(jqXHR) {  
      console.log(jqXHR); 
      return{jqXHR};
    }.bind(this)  
  });
}