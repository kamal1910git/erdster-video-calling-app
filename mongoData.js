var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

module.exports = function(app) {

var mongo = require("mongoose");  
var db = mongo.connect("mongodb://localhost:27017/PRC_Videocalling", function(err, response){  
   if(err)
   { console.log('Failed to connect to ' + db); }  
   else
   { console.log('Connected to ' + db); }  
});  
  
  
module.exports =db;

    var RoomListModelSchema = new mongoose.Schema({
        RoomId: String, 
        RoomName: String,   
        RoomUrl: String, 
        DateOpened: { type: Date, default: Date.now },    
        Status: { type: String, default: "Active" },
        StorageURL: String,
        AssignedTo: String,
        CreatedBy: String,
        UpdatedBy: String,
        IsActive: { type: Boolean, default: true },
        IsDeleted: { type: Boolean, default: false }
      });

    var model = mongoose.model('RoomListModel', RoomListModelSchema, 'RoomListModel');  

    app.post('/api/SaveRoomList', function (req, res) {  
        var roomList = new model(req.body);  
        roomList.save(function(err,data){  
            if(err){  
                res.send(err);                
            }  
            else{        
                 res.send({data:"Roomlist has been created..!!"});  
            }  
        });  
    })

    app.post("/api/UpdateRoomlist",function(req,res) {   
        model.findByIdAndUpdate(req.body.RoomId, { RoomName: req.body.RoomName, RoomUrl: req.body.RoomUrl, StorageURL: req.body.StorageURL, AssignedTo: req.body.AssignedTo, UpdatedBy:req.body.UpdatedBy, IsActive:req.body.IsActive, IsDeleted:req.body.IsDeleted },   
        function(err) {  
            if (err) {  
                res.send(err);  
                return;  
            }  
                res.send({data:"Roomlist has been updated..!!"});  
            });  
    })

    app.post("/api/RemoveRoomlist",function(req,res){   
        model.remove({ RoomId: req.body.RoomId }, function(err) {  
            if(err){  
                res.send(err);  
            }  
            else{    
                    res.send({data:"Roomlist has been deleted..!!"});             
                }  
            });  
       })

       app.get("/api/GetRoomlist",function(req,res){   
        model.find({},function(err,data){  
            if(err){  
                res.send(err);  
            }  
            else{             
                res.send(data);  
                }  
            });  
       }) 

       app.get("/api/GetRoomlistByName/:RoomId",function(req,res){  
        model.find({RoomId: req.params.RoomId},function(err,data){  
            if(err){  
                res.send(err);  
            }  
            else{        
                res.send(data);  
                }  
            });  
       }) 
}