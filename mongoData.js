var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

module.exports = function(app) {

var mongo = require("mongoose");  
var db = mongo.connect(process.env.MONGODB_SERVER, function(err, response){   
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
        Status: { type: String, default: "InActive" },
        StorageURL: String,
        AssignedTo: String,
        CreatedBy: String,
        UpdatedBy: String,
        IsActive: { type: Boolean, default: true },
        IsDeleted: { type: Boolean, default: false }
      });

    var model = mongoose.model('RoomListModel', RoomListModelSchema, 'RoomListModel');  

    app.post('/api/v0/SaveRoomList', function (req, res) {  
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

    app.post("/api/v0/UpdateRoomlist",function(req,res) {   
        model.updateOne({RoomId: req.body.RoomId}, { $set: { RoomName: req.body.RoomName, RoomUrl: req.body.RoomUrl, Status: req.body.Status, StorageURL: req.body.StorageURL, AssignedTo: req.body.AssignedTo, UpdatedBy:req.body.UpdatedBy, IsActive:req.body.IsActive, IsDeleted:req.body.IsDeleted }},   
        function(err) {  
            if (err) {  
                res.send(err);  
                return;  
            }  
                res.send({data:"Roomlist has been updated..!!"});  
            });  
    })

    app.post("/api/v0/UpdateS3Url",function(req,res) {   
        model.updateOne({RoomId: req.body.RoomId}, { $set: { StorageURL: req.body.StorageURL }},   
        function(err) {  
            if (err) {  
                res.send(err);  
                return;  
            }  
                res.send({data:"S3 URL has been updated..!!"});  
            });  
    })

    app.post("/api/v0/RemoveRoomlist",function(req,res){   
        model.remove({ RoomId: req.body.RoomId }, function(err) {  
            if(err){  
                res.send(err);  
            }  
            else{    
                    res.send({data:"Roomlist has been deleted..!!"});             
                }  
            });  
       })

       app.get("/api/v0/GetRoomlist",function(req,res){   
        model.find({},function(err,data){  
            if(err){  
                res.send(err);  
            }  
            else{             
                res.send(data);  
                }  
            }).sort({"DateOpened":-1});  
       }) 

       app.get("/api/v0/GetRoomlistByName/:RoomId",function(req,res){  
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