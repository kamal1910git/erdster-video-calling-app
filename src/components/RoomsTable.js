import React from "react";
import _ from "lodash";
import $ from 'jquery'
import { Link } from 'react-router';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

import { makeData, Tips, getRoomList } from "./Utils";
import API_CONSTANT_MAP from './apiMap'
import SmartAlert from 'react-bootstrap-sweetalert';

const requestData = (pageSize, page, sorted, filtered, roomListData) => {

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
      loading: true,
      popup: false,
      popupMessage: null
    };
    this.fetchData = this.fetchData.bind(this);
  }

  handleButtonClick= (e,row,action) => { 
    var updatedRoomList = {  
      'RoomId': row.RoomId,
      'RoomName': row.RoomName,
      'RoomUrl': row.RoomUrl,
      'Status': action === 'DeActivate' ? 'InActive' : 'Active',  
      'StorageURL':row.StorageURL,  
      'AssignedTo':row.AssignedTo,  
      'CreatedBy':row.CreatedBy,   
      'UpdatedBy':JSON.parse(localStorage.getItem('PRCUser_User')),
      'IsActive': row.IsActive,
      'IsDeleted': row.IsDeleted
    }
    var msg = action === 'DeActivate' ? "Room has been de-activated" : "Room has been activated";
    $.ajax({  
      url: API_CONSTANT_MAP.updateroomlist,  
      dataType: 'json',  
      type: 'POST',  
      data: updatedRoomList,  
      success: function(data) {
          console.log("room updated..");
          this.setState({ popup: true });
          this.setState({ popupMessage: msg });            
      }.bind(this),  
      error: function(xhr, status, err) {  
        console.log(err);
      }.bind(this)  
    });    
  }

  handleDeleteButtonClick= (e,row) => {

    var x = confirm("Are you sure you want to remove the room?");
    if (x)
        {
          var removeRoom = {  
            'RoomId': row.RoomId
          }
          var msg = "Room has been removed...";
          $.ajax({  
            url: API_CONSTANT_MAP.removeroomlist,  
            dataType: 'json',  
            type: 'POST',  
            data: removeRoom,  
            success: function(data) {
                console.log("room removed..");
                this.setState({ popup: true });
                this.setState({ popupMessage: msg });   
            }.bind(this),  
            error: function(xhr, status, err) {  
              console.log(err);
            }.bind(this)  
          });    
        }
    else
      return false;       
  }

  onPopConfirm = () =>{
    this.setState({ popup: false });
    this.setState({ popupMessage: null });
    window.location.reload();      
  }

  fetchData(state, instance) {
   this.setState({ loading: true });
   var roomListData = null;
    $.ajax({  
      url: API_CONSTANT_MAP.getroomlist,  
      type: "GET",  
      dataType: 'json',  
      ContentType: 'application/json',  
      success: function(data) {
        roomListData = data;   
        console.log("data length:" + roomListData.length);
        requestData(
          state.pageSize,
          state.page,
          state.sorted,
          state.filtered,
          roomListData
        ).then(res => {
          this.setState({
            data: res.rows,
            pages: res.pages,
            loading: false
          });
        });   

      }.bind(this),  
      error: function(jqXHR) {  
        console.log(jqXHR);               
      }.bind(this)  
    });    
  }
  render() {
    const { data, pages, loading } = this.state;
    return (
      <div>
        <SmartAlert show={this.state.popup} success title={this.state.popupMessage} onConfirm={this.onPopConfirm} />
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
              accessor: "RoomUrl",
              Cell: ({ row }) => (row.Status ==='InActive' ?
                        <span>{row.RoomUrl}</span>
                        :
                        <Link target="_blank" to={{ pathname: row.RoomUrl }}>{row.RoomUrl}</Link>
                       )
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
            },
            {
              Header: "Created On",
              accessor: "DateOpened"              
            },            
            {
              Header: "Activate Room",              
              Cell: ({ row }) => (row.Status ==='InActive' ?
                                 <button onClick={(e) => this.handleButtonClick(e, row, 'Activate')}>Activate</button>
                                 :
                                 <button onClick={(e) => this.handleButtonClick(e, row, 'DeActivate')}>Deactivate</button>
                               )
            },
            {
              Header: "Remove Room",
              Cell: ({ row }) => (<button onClick={(e) => this.handleDeleteButtonClick(e, row)}>Remove</button>)              
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
