'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.createAccount = function createAccount (req: any, res: any, next: any, email: any) {
  Default.createAccount(email)
    .then(function (response: any) {
      utils.writeJson(res, response);
    })
    .catch(function (response: any) {
      utils.writeJson(res, response);
    });
};

module.exports.createNewNote = function createNewNote (req: any, res: any, next: any) {
  Default.createNewNote()
    .then(function (response: any) {
      utils.writeJson(res, response);
    })
    .catch(function (response: any) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteNoteById = function deleteNoteById (req: any, res: any, next: any, noteUUID: any) {
  Default.deleteNoteById(noteUUID)
    .then(function (response: any) {
      utils.writeJson(res, response);
    })
    .catch(function (response: any) {
      utils.writeJson(res, response);
    });
};

module.exports.getAllNoteMetadata = function getAllNoteMetadata (req: any, res: any, next: any) {
  Default.getAllNoteMetadata()
    .then(function (response: any) {
      utils.writeJson(res, response);
    })
    .catch(function (response: any) {
      utils.writeJson(res, response);
    });
};

module.exports.getAllSharedNoteMetadata = function getAllSharedNoteMetadata (req: any, res: any, next: any) {
  Default.getAllSharedNoteMetadata()
    .then(function (response: any) {
      utils.writeJson(res, response);
    })
    .catch(function (response: any) {
      utils.writeJson(res, response);
    });
};

module.exports.getNoteContentById = function getNoteContentById (req: any, res: any, next: any, noteUUID: any) {
  Default.getNoteContentById(noteUUID)
    .then(function (response: any) {
      utils.writeJson(res, response);
    })
    .catch(function (response: any) {
      utils.writeJson(res, response);
    });
};

module.exports.getNoteMetadataById = function getNoteMetadataById (req: any, res: any, next: any, noteUUID: any) {
  Default.getNoteMetadataById(noteUUID)
    .then(function (response: any) {
      utils.writeJson(res, response);
    })
    .catch(function (response: any) {
      utils.writeJson(res, response);
    });
};

module.exports.getSharedNoteContentById = function getSharedNoteContentById (req: any, res: any, next: any, noteUUID: any) {
  Default.getSharedNoteContentById(noteUUID)
    .then(function (response: any) {
      utils.writeJson(res, response);
    })
    .catch(function (response: any) {
      utils.writeJson(res, response);
    });
};

module.exports.getSharedNoteMetadataById = function getSharedNoteMetadataById (req: any, res: any, next: any, noteUUID: any) {
  Default.getSharedNoteMetadataById(noteUUID)
    .then(function (response: any) {
      utils.writeJson(res, response);
    })
    .catch(function (response: any) {
      utils.writeJson(res, response);
    });
};

module.exports.updateNoteContentById = function updateNoteContentById (req: any, res: any, next: any, noteUUID: any) {
  Default.updateNoteContentById(noteUUID)
    .then(function (response: any) {
      utils.writeJson(res, response);
    })
    .catch(function (response: any) {
      utils.writeJson(res, response);
    });
};

module.exports.updateNoteMetadataById = function updateNoteMetadataById (req: any, res: any, next: any, body: any, noteUUID: any) {
  Default.updateNoteMetadataById(body, noteUUID)
    .then(function (response: any) {
      utils.writeJson(res, response);
    })
    .catch(function (response: any) {
      utils.writeJson(res, response);
    });
};

module.exports.updateSharedNoteContentById = function updateSharedNoteContentById (req: any, res: any, next: any, noteUUID: any) {
  Default.updateSharedNoteContentById(noteUUID)
    .then(function (response: any) {
      utils.writeJson(res, response);
    })
    .catch(function (response: any) {
      utils.writeJson(res, response);
    });
};
