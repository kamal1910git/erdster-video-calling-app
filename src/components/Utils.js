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
