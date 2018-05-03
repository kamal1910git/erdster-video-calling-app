var mongoose = require('mongoose');

var RoomListModelSchema = new mongoose.Schema({
    RoomId: String, 
    RoomName: String,    
    DateOpened: { type: Date, default: Date.now },    
    Status: { type: String, default: "Active" },
    StorageURL: String,
    AssignedTo: String,
    CreatedBy: String,
    UpdatedBy: String,
    IsActive: { type: Boolean, default: true },
    IsDeleted: { type: Boolean, default: false }
  });

  module.exports = mongoose.model('RoomListModel', RoomListModelSchema);