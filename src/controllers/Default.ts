'use strict';

import { writeJson } from "../utils/writer";

import * as AccountService from "../service/AccountService";
import * as NoteService from "../service/NoteService"
import * as SharedNotesService from "../service/SharedNotesService"

export function createAccount(req: any, res: any, next: any, email: any) {
	AccountService.createAccount(email)
		.then(newAccount => writeJson(res, newAccount.toJSON()))
		.catch(message => writeJson(res, message, 403));
};

module.exports.createNewNote = function createNewNote(req: any, res: any, next: any) {
	NoteService.createNewNote()
		.then(function (response: any) {
			writeJson(res, response);
		})
		.catch(function (response: any) {
			writeJson(res, response);
		});
};

module.exports.deleteNoteById = function deleteNoteById(req: any, res: any, next: any, noteUUID: any) {
	NoteService.deleteNoteById(noteUUID)
		.then(function (response: any) {
			writeJson(res, response);
		})
		.catch(function (response: any) {
			writeJson(res, response);
		});
};

module.exports.getAllNoteMetadata = function getAllNoteMetadata(req: any, res: any, next: any) {
	NoteService.getAllNoteMetadata()
		.then(function (response: any) {
			writeJson(res, response);
		})
		.catch(function (response: any) {
			writeJson(res, response);
		});
};

module.exports.getAllSharedNoteMetadata = function getAllSharedNoteMetadata(req: any, res: any, next: any) {
	SharedNotesService.getAllSharedNoteMetadata()
		.then(function (response: any) {
			writeJson(res, response);
		})
		.catch(function (response: any) {
			writeJson(res, response);
		});
};

module.exports.getNoteContentById = function getNoteContentById(req: any, res: any, next: any, noteUUID: any) {
	NoteService.getNoteContentById(noteUUID)
		.then(function (response: any) {
			writeJson(res, response);
		})
		.catch(function (response: any) {
			writeJson(res, response);
		});
};

module.exports.getNoteMetadataById = function getNoteMetadataById(req: any, res: any, next: any, noteUUID: any) {
	NoteService.getNoteMetadataById(noteUUID)
		.then(function (response: any) {
			writeJson(res, response);
		})
		.catch(function (response: any) {
			writeJson(res, response);
		});
};

module.exports.getSharedNoteContentById = function getSharedNoteContentById(req: any, res: any, next: any, noteUUID: any) {
	SharedNotesService.getSharedNoteContentById(noteUUID)
		.then(function (response: any) {
			writeJson(res, response);
		})
		.catch(function (response: any) {
			writeJson(res, response);
		});
};

module.exports.getSharedNoteMetadataById = function getSharedNoteMetadataById(req: any, res: any, next: any, noteUUID: any) {
	SharedNotesService.getSharedNoteMetadataById(noteUUID)
		.then(function (response: any) {
			writeJson(res, response);
		})
		.catch(function (response: any) {
			writeJson(res, response);
		});
};

module.exports.updateNoteContentById = function updateNoteContentById(req: any, res: any, next: any, noteUUID: any) {
	NoteService.updateNoteContentById(noteUUID)
		.then(function (response: any) {
			writeJson(res, response);
		})
		.catch(function (response: any) {
			writeJson(res, response);
		});
};

module.exports.updateNoteMetadataById = function updateNoteMetadataById(req: any, res: any, next: any, body: any, noteUUID: any) {
	NoteService.updateNoteMetadataById(body, noteUUID)
		.then(function (response: any) {
			writeJson(res, response);
		})
		.catch(function (response: any) {
			writeJson(res, response);
		});
};

module.exports.updateSharedNoteContentById = function updateSharedNoteContentById(req: any, res: any, next: any, noteUUID: any) {
	SharedNotesService.updateSharedNoteContentById(noteUUID)
		.then(function (response: any) {
			writeJson(res, response);
		})
		.catch(function (response: any) {
			writeJson(res, response);
		});
};
