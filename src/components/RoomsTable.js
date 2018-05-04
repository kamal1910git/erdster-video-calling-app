import React from "react";
import _ from "lodash";
import { makeData, Tips } from "./Utils";
import $ from 'jquery'

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

var roomListData= null;
$.ajax({  
  url: "api/GetRoomlist",  
  type: "GET",  
  dataType: 'json',  
  ContentType: 'application/json',  
  success: function(data) {
    roomListData = data;           
  }.bind(this),  
  error: function(jqXHR) {  
    console.log(jqXHR);               
  }.bind(this)  
}); 

const requestData = (pageSize, page, sorted, filtered) => {
  return new Promise((resolve, reject) => {
    // You can retrieve your data however you want, in this case, we will just use some local data.
    let filteredData = roomListData;
    console.log("data length:" + roomListData.length);
    // You can use the filters in your request, but you are responsible for applying them.
    if (filtered.length) {
      filteredData = filtered.reduce((filteredSoFar, nextFilter) => {
        return filteredSoFar.filter(row => {
          return (row[nextFilter.id] + "").includes(nextFilter.value);
        });
      }, filteredData);
    }
    // You can also use the sorting in your request, but again, you are responsible for applying it.
    const sortedData = _.orderBy(
      filteredData,
      sorted.map(sort => {
        return row => {
          if (row[sort.id] === null || row[sort.id] === undefined) {
            return -Infinity;
          }
          return typeof row[sort.id] === "string"
            ? row[sort.id].toLowerCase()
            : row[sort.id];
        };
      }),
      sorted.map(d => (d.desc ? "desc" : "asc"))
    );

    // You must return an object containing the rows of the current page, and optionally the total pages number.
    const res = {
      rows: sortedData.slice(pageSize * page, pageSize * page + pageSize),
      pages: Math.ceil(filteredData.length / pageSize)
    };

    // Here we'll simulate a server response with 500ms of delay.
    setTimeout(() => resolve(res), 500);
  });
};

export default class RoomsTable extends React.Component {
  constructor() {
    super();
    this.state = {
      roomListData: [],
      pages: null,
      loading: true
    };
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData(state, instance) {
    this.setState({ loading: true });
    
   console.log("data length:" + roomListData.length);

    requestData(
      state.pageSize,
      state.page,
      state.sorted,
      state.filtered
    ).then(res => {
      this.setState({
        data: res.rows,
        pages: res.pages,
        loading: false
      });
    });
  }
  render() {
    const { data, pages, loading } = this.state;
    return (
      <div>
        <ReactTable
          columns={[
            {
              Header: "Room Id",
              accessor: "RoomId"
            },
            {
              Header: "Room Name",
              accessor: "RoomName"
            },
            {
              Header: "Room URL",
              accessor: "RoomUrl"
            },
            {
              Header: "Status",
              accessor: "Status"
            },            
            {
              Header: "S3 URL",
              accessor: "StorageURL"
            },
            {
              Header: "Assigned To",
              accessor: "AssignedTo"
            },
            {
              Header: "Created By",
              accessor: "CreatedBy"
            }
          ]}
          manual 
          data={data}
          pages={pages} 
          loading={loading} 
          onFetchData={this.fetchData} 
          filterable
          defaultPageSize={5}
          className="-striped -highlight"
        />
        <br />
        <Tips />
      </div>
    );
  }
}
