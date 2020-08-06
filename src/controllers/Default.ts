'use strict';

import { writeJson, respondWithCode } from "../utils/writer";

var AccountService = require('../service/AccountService');

module.exports.createAccount = function createAccount (req: any, res: any, next: any, email: any) {
  AccountService.createAccount(email)
    .then(function (response: any) {
      writeJson(res, response);
    })
    .catch(function (response: any) {
      writeJson(res, respondWithCode(403, response));
    });
};

module.exports.createNewNote = function createNewNote (req: any, res: any, next: any) {
  AccountService.createNewNote()
    .then(function (response: any) {
      writeJson(res, response);
    })
    .catch(function (response: any) {
      writeJson(res, response);
    });
};

module.exports.deleteNoteById = function deleteNoteById (req: any, res: any, next: any, noteUUID: any) {
  AccountService.deleteNoteById(noteUUID)
    .then(function (response: any) {
      writeJson(res, response);
    })
    .catch(function (response: any) {
      writeJson(res, response);
    });
};

module.exports.getAllNoteMetadata = function getAllNoteMetadata (req: any, res: any, next: any) {
  AccountService.getAllNoteMetadata()
    .then(function (response: any) {
      writeJson(res, response);
    })
    .catch(function (response: any) {
      writeJson(res, response);
    });
};

module.exports.getAllSharedNoteMetadata = function getAllSharedNoteMetadata (req: any, res: any, next: any) {
  AccountService.getAllSharedNoteMetadata()
    .then(function (response: any) {
      writeJson(res, response);
    })
    .catch(function (response: any) {
      writeJson(res, response);
    });
};

module.exports.getNoteContentById = function getNoteContentById (req: any, res: any, next: any, noteUUID: any) {
  AccountService.getNoteContentById(noteUUID)
    .then(function (response: any) {
      writeJson(res, response);
    })
    .catch(function (response: any) {
      writeJson(res, response);
    });
};

module.exports.getNoteMetadataById = function getNoteMetadataById (req: any, res: any, next: any, noteUUID: any) {
  AccountService.getNoteMetadataById(noteUUID)
    .then(function (response: any) {
      writeJson(res, response);
    })
    .catch(function (response: any) {
      writeJson(res, response);
    });
};

module.exports.getSharedNoteContentById = function getSharedNoteContentById (req: any, res: any, next: any, noteUUID: any) {
  AccountService.getSharedNoteContentById(noteUUID)
    .then(function (response: any) {
      writeJson(res, response);
    })
    .catch(function (response: any) {
      writeJson(res, response);
    });
};

module.exports.getSharedNoteMetadataById = function getSharedNoteMetadataById (req: any, res: any, next: any, noteUUID: any) {
  AccountService.getSharedNoteMetadataById(noteUUID)
    .then(function (response: any) {
      writeJson(res, response);
    })
    .catch(function (response: any) {
      writeJson(res, response);
    });
};

module.exports.updateNoteContentById = function updateNoteContentById (req: any, res: any, next: any, noteUUID: any) {
  AccountService.updateNoteContentById(noteUUID)
    .then(function (response: any) {
      writeJson(res, response);
    })
    .catch(function (response: any) {
      writeJson(res, response);
    });
};

module.exports.updateNoteMetadataById = function updateNoteMetadataById (req: any, res: any, next: any, body: any, noteUUID: any) {
  AccountService.updateNoteMetadataById(body, noteUUID)
    .then(function (response: any) {
      writeJson(res, response);
    })
    .catch(function (response: any) {
      writeJson(res, response);
    });
};

module.exports.updateSharedNoteContentById = function updateSharedNoteContentById (req: any, res: any, next: any, noteUUID: any) {
  AccountService.updateSharedNoteContentById(noteUUID)
    .then(function (response: any) {
      writeJson(res, response);
    })
    .catch(function (response: any) {
      writeJson(res, response);
    });
};
