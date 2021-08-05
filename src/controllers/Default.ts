'use strict';

import { writeJson, sendStatus, writeMessage } from "../utils/writer";

import * as AccountService from "../service/AccountService";
import * as NoteService from "../service/NoteService"
import * as SharedNotesService from "../service/SharedNotesService"
import { getAccountUuid } from "../utils/authentication";
import { ServerResponse } from "http";
import { Account } from "../orm/models/Account"

interface SwaggerRequest extends Request {
	swagger: {
		params: any
	}
	body: any
}

export function healthCheck(req: SwaggerRequest, res: ServerResponse, next: Function) {
	writeJson(res, { "status": "ok" })
}

export function createAccount(req: SwaggerRequest, res: ServerResponse, next: Function) {
	let account: Partial<Account> = req.swagger.params.account.value
	AccountService.createAccount(account)
		.then(newAccount => writeJson(res, newAccount.toJSON()))
		.catch(message => writeMessage(res, message, 403));
};

export function createNewNote(req: SwaggerRequest, res: ServerResponse, next: Function) {
	const accountUuid = getAccountUuid(req, res)
	if (accountUuid) {
		NoteService.createNewNote(accountUuid)
		.then(newNote => writeJson(res, newNote.toJSON()))
		.catch(message => writeMessage(res, message, 403));
	}
};
export function importNoteMetadata(req: SwaggerRequest, res: ServerResponse, next: Function) {
	const accountUuid = getAccountUuid(req, res)
	const noteUUID: string = req.swagger.params.note_uuid.value	
	if (req.body.uuid != noteUUID) writeMessage(res, "Invalid request : parameter uuid and body uuid mismatch.", 400)
	if (accountUuid) {
		NoteService.importNoteMetadata(req.body, accountUuid)
		.then(newNote => writeJson(res, newNote.toJSON()))
		.catch(message => writeMessage(res, message, 403));
	}
}
export function deleteNoteById(req: SwaggerRequest, res: ServerResponse, next: Function) {
	const noteUUID: string = req.swagger.params.note_uuid.value	
	const accountUuid = getAccountUuid(req, res)
	if (accountUuid) {
		NoteService.deleteNoteById(noteUUID, accountUuid)
		.then(() => sendStatus(res, 200))
		.catch(message => writeMessage(res, message, 404));
	}
};

export function getAllNoteMetadata(req: SwaggerRequest, res: ServerResponse, next: Function) {
	const accountUuid = getAccountUuid(req, res)
	if (accountUuid) {
		NoteService.getAllNoteMetadata(accountUuid)
		.then(notes => writeJson(res, notes.map(n => n.toJSON())))
		.catch(message => writeMessage(res, message, 403));
	}
};

module.exports.getAllSharedNoteMetadata = function getAllSharedNoteMetadata(req: SwaggerRequest, res: ServerResponse, next: Function) {
	SharedNotesService.getAllSharedNoteMetadata()
		.then(function (response: any) {
			writeJson(res, response);
		})
		.catch(function (response: any) {
			writeJson(res, response);
		});
};

export function getNoteContentById(req: SwaggerRequest, res: ServerResponse, next: Function) {
	const noteUUID: string = req.swagger.params.note_uuid.value	
	const accountUuid = getAccountUuid(req, res)
	if (accountUuid) {
		NoteService.getNoteContentById(noteUUID, accountUuid)
		.then(noteContent => writeJson(res, noteContent.content))
		.catch(message => writeJson(res, message, 404));
	}
};

export function getNoteMetadataById(req: SwaggerRequest, res: ServerResponse, next: Function) {
	const noteUUID: string = req.swagger.params.note_uuid.value	
	const accountUuid = getAccountUuid(req, res)
	if (accountUuid) {
		NoteService.getNoteMetadataById(noteUUID, accountUuid)
		.then(meta => writeJson(res, meta.toJSON()))
		.catch(message => writeJson(res, message, 404));
	}
};

module.exports.getSharedNoteContentById = function getSharedNoteContentById(req: SwaggerRequest, res: ServerResponse, next: Function) {
	const noteUUID: string = req.swagger.params.note_uuid.value	
	SharedNotesService.getSharedNoteContentById(noteUUID)
		.then(function (response: any) {
			writeJson(res, response);
		})
		.catch(function (response: any) {
			writeJson(res, response);
		});
};

module.exports.getSharedNoteMetadataById = function getSharedNoteMetadataById(req: SwaggerRequest, res: ServerResponse, next: Function) {
	const noteUUID: string = req.swagger.params.note_uuid.value	
	SharedNotesService.getSharedNoteMetadataById(noteUUID)
		.then(function (response: any) {
			writeJson(res, response);
		})
		.catch(function (response: any) {
			writeJson(res, response);
		});
};

export function updateNoteContentById(req: SwaggerRequest, res: ServerResponse, next: Function) {
	const noteUUID: string = req.swagger.params.note_uuid.value	
	// const body: string = req.swagger.operation.requestBody
	const accountUuid = getAccountUuid(req, res)
	if (accountUuid) {
		NoteService.updateNoteContentById(noteUUID, accountUuid, req.body)
		.then(() => sendStatus(res, 200))
		.catch(message => writeJson(res, message, 404));
	}
};

export function updateNoteMetadataById(req: SwaggerRequest, res: ServerResponse, next: Function) {
	const noteUUID: string = req.swagger.params.note_uuid.value	
	const accountUuid = getAccountUuid(req, res)
	if (accountUuid) {
		NoteService.updateNoteMetadataById(req.body, noteUUID, accountUuid)
		.then(newMeta => writeJson(res, newMeta))
		.catch(message => writeJson(res, message, 401));
	}
};

module.exports.updateSharedNoteContentById = function updateSharedNoteContentById(req: SwaggerRequest, res: ServerResponse, next: Function) {
	const noteUUID: string = req.swagger.params.note_uuid.value	
	SharedNotesService.updateSharedNoteContentById(noteUUID)
		.then(function (response: any) {
			writeJson(res, response);
		})
		.catch(function (response: any) {
			writeJson(res, response);
		});
};
