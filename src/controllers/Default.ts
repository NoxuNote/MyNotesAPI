'use strict';

import { writeJson, sendStatus } from "../utils/writer";

import * as AccountService from "../service/AccountService";
import * as NoteService from "../service/NoteService"
import * as SharedNotesService from "../service/SharedNotesService"
import { getAccountUuid } from "../utils/authentication";
import { ServerResponse } from "http";

export function createAccount(req: Request, res: ServerResponse, next: any, account: Partial<Account>) {
	AccountService.createAccount(account)
		.then(newAccount => writeJson(res, newAccount.toJSON()))
		.catch(message => writeJson(res, message, 403));
};

export function createNewNote(req: Request, res: ServerResponse, next: any) {
	const accountUuid = getAccountUuid(req, res)
	if (accountUuid) {
		NoteService.createNewNote(accountUuid)
		.then(newNote => writeJson(res, newNote.toJSON()))
		.catch(message => writeJson(res, message, 403));
	}
};

export function deleteNoteById(req: Request, res: ServerResponse, next: any, noteUUID: string) {	
	console.log("coucou")
	const accountUuid = getAccountUuid(req, res)
	if (accountUuid) {
		NoteService.deleteNoteById(noteUUID, accountUuid)
		.then(() => sendStatus(res, 200))
		.catch(message => writeJson(res, message, 404));
	}
};

export function getAllNoteMetadata(req: Request, res: ServerResponse, next: any) {
	const accountUuid = getAccountUuid(req, res)
	if (accountUuid) {
		NoteService.getAllNoteMetadata(accountUuid)
		.then(notes => writeJson(res, notes.map(n => n.toJSON())))
		.catch(message => writeJson(res, message, 403));
	}
};

module.exports.getAllSharedNoteMetadata = function getAllSharedNoteMetadata(req: Request, res: ServerResponse, next: any) {
	SharedNotesService.getAllSharedNoteMetadata()
		.then(function (response: any) {
			writeJson(res, response);
		})
		.catch(function (response: any) {
			writeJson(res, response);
		});
};

module.exports.getNoteContentById = function getNoteContentById(req: Request, res: ServerResponse, next: any, noteUUID: any) {
	NoteService.getNoteContentById(noteUUID)
		.then(function (response: any) {
			writeJson(res, response);
		})
		.catch(function (response: any) {
			writeJson(res, response);
		});
};

export function getNoteMetadataById(req: Request, res: ServerResponse, next: any, noteUUID: any) {
	const accountUuid = getAccountUuid(req, res)
	if (accountUuid) {
		NoteService.getNoteMetadataById(noteUUID, accountUuid)
		.then(meta => writeJson(res, meta.toJSON()))
		.catch(message => writeJson(res, message, 404));
	}
};

module.exports.getSharedNoteContentById = function getSharedNoteContentById(req: Request, res: ServerResponse, next: any, noteUUID: any) {
	SharedNotesService.getSharedNoteContentById(noteUUID)
		.then(function (response: any) {
			writeJson(res, response);
		})
		.catch(function (response: any) {
			writeJson(res, response);
		});
};

module.exports.getSharedNoteMetadataById = function getSharedNoteMetadataById(req: Request, res: ServerResponse, next: any, noteUUID: any) {
	SharedNotesService.getSharedNoteMetadataById(noteUUID)
		.then(function (response: any) {
			writeJson(res, response);
		})
		.catch(function (response: any) {
			writeJson(res, response);
		});
};

module.exports.updateNoteContentById = function updateNoteContentById(req: Request, res: ServerResponse, next: any, noteUUID: any) {
	NoteService.updateNoteContentById(noteUUID)
		.then(function (response: any) {
			writeJson(res, response);
		})
		.catch(function (response: any) {
			writeJson(res, response);
		});
};

module.exports.updateNoteMetadataById = function updateNoteMetadataById(req: Request, res: ServerResponse, next: any, body: any, noteUUID: any) {
	NoteService.updateNoteMetadataById(body, noteUUID)
		.then(function (response: any) {
			writeJson(res, response);
		})
		.catch(function (response: any) {
			writeJson(res, response);
		});
};

module.exports.updateSharedNoteContentById = function updateSharedNoteContentById(req: Request, res: ServerResponse, next: any, noteUUID: any) {
	SharedNotesService.updateSharedNoteContentById(noteUUID)
		.then(function (response: any) {
			writeJson(res, response);
		})
		.catch(function (response: any) {
			writeJson(res, response);
		});
};
