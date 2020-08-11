'use strict';

import { NoteMetadata } from "../orm/models/NoteMetadata";
import { NoteContent } from "../orm/models/NoteContent";

/**
 * Creates a new empty note
 *
 * no response value expected for this operation
 **/
export async function createNewNote(accountUuid: string): Promise<NoteMetadata> {
  try {
    const meta = await NoteMetadata.create({ accountUuid: accountUuid })
    await NoteContent.create({ uuid: meta.uuid })
    return meta
	} catch (e) {
    if (e.name === 'SequelizeForeignKeyConstraintError') {
      return Promise.reject("There is no account with this accountUuid, check your headers");
    } else {
      return Promise.reject("Internal error")
    }
	}
}


/**
 * Delete an already existing note
 *
 * noteUUID #/components/parameters/noteUUID 
 * no response value expected for this operation
 **/
export async function deleteNoteById(noteUUID: string, accountUuid: string): Promise<void> {
  const noteMetadata = await NoteMetadata.findOne({ 
    where: { 
      uuid: noteUUID,
      accountUuid: accountUuid
    } 
  })
  if (noteMetadata) {
    return noteMetadata.destroy()
  }
  return Promise.reject("There is no note with this note uuid")
}


/**
 * Get all your notes metadata
 *
 * returns List
 **/
export async function getAllNoteMetadata(accountUuid: string): Promise<NoteMetadata[]> {
  return NoteMetadata.findAll({
    where: {
      accountUuid: accountUuid
    }
  })
}




/**
 * Get raw content of a note
 *
 * noteUUID #/components/parameters/noteUUID 
 * no response value expected for this operation
 **/
export async function getNoteContentById(noteUUID: string, accountUuid: string): Promise<NoteContent> {
  const note = await NoteMetadata.findOne({
    where: { 
      uuid: noteUUID,
      accountUuid: accountUuid
    },
    include: [ NoteContent ]
  })
  if (note) return note.noteContent
  return Promise.reject("There is no note with this note uuid")
}


/**
 * Get an already existing note metadata
 *
 * noteUUID UUID UUID of note to return
 * returns NoteMetadata
 **/
export async function getNoteMetadataById(noteUUID: string, accountUuid: string): Promise<NoteMetadata> {
  const meta = await NoteMetadata.findOne({ 
    where: {
      uuid: noteUUID,
      accountUuid: accountUuid 
    }
  })
  if (meta) return meta
  return Promise.reject("There is no note with this UUID")
}


/**
 * Update an already existing note content
 *
 * noteUUID #/components/parameters/noteUUID 
 * no response value expected for this operation
 **/
export async function updateNoteContentById(noteUUID: string, accountUuid: string, content: string): Promise<void> {
  const noteContent = await getNoteContentById(noteUUID, accountUuid)
  if (noteContent) {
    try {
      noteContent.content = content
      await noteContent.save()
      return
    } catch(e) {
      return Promise.reject('Could not save content, probably it is incorrect')
    }
  } else {
    return Promise.reject('Cannot find note with this uuid')
  }

}


/**
 * Update already existing note
 *
 * body NoteMetadata  (optional)
 * noteUUID #/components/parameters/noteUUID 
 * no response value expected for this operation
 **/
export async function updateNoteMetadataById(body: any, noteUUID: string) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}
