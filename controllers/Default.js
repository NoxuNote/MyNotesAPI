'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.createNewNote = function createNewNote (req, res, next) {
  Default.createNewNote()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteNoteById = function deleteNoteById (req, res, next, noteUUID) {
  Default.deleteNoteById(noteUUID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAllNoteMetadata = function getAllNoteMetadata (req, res, next) {
  Default.getAllNoteMetadata()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAllSharedNoteMetadata = function getAllSharedNoteMetadata (req, res, next) {
  Default.getAllSharedNoteMetadata()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getNoteContentById = function getNoteContentById (req, res, next, noteUUID) {
  Default.getNoteContentById(noteUUID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getNoteMetadataById = function getNoteMetadataById (req, res, next, noteUUID) {
  Default.getNoteMetadataById(noteUUID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getSharedNoteContentById = function getSharedNoteContentById (req, res, next, noteUUID) {
  Default.getSharedNoteContentById(noteUUID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getSharedNoteMetadataById = function getSharedNoteMetadataById (req, res, next, noteUUID) {
  Default.getSharedNoteMetadataById(noteUUID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateNoteContentById = function updateNoteContentById (req, res, next, noteUUID) {
  Default.updateNoteContentById(noteUUID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateNoteMetadataById = function updateNoteMetadataById (req, res, next, body, noteUUID) {
  Default.updateNoteMetadataById(body, noteUUID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateSharedNoteContentById = function updateSharedNoteContentById (req, res, next, noteUUID) {
  Default.updateSharedNoteContentById(noteUUID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
