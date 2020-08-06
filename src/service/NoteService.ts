'use strict';

/**
 * Creates a new empty note
 *
 * no response value expected for this operation
 **/
export async function createNewNote() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Delete an already existing note
 *
 * noteUUID #/components/parameters/noteUUID 
 * no response value expected for this operation
 **/
export async function deleteNoteById(noteUUID: string) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get all your notes metadata
 *
 * returns List
 **/
export async function getAllNoteMetadata() {
  return new Promise(function(resolve, reject) {
    var examples: any = {};
    examples['application/json'] = "";
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}




/**
 * Get raw content of a note
 *
 * noteUUID #/components/parameters/noteUUID 
 * no response value expected for this operation
 **/
export async function getNoteContentById(noteUUID: string) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get an already existing note metadata
 *
 * noteUUID UUID UUID of note to return
 * returns NoteMetadata
 **/
export async function getNoteMetadataById(noteUUID: string) {
  return new Promise(function(resolve, reject) {
    var examples: any = {};
    examples['application/json'] = "";
    if (Object.keys(examples).length > 0) {
      Promise.resolve(examples[Object.keys(examples)[0]]);
    } else {
        Promise.resolve();
    }
  });
}


/**
 * Update an already existing note content
 *
 * noteUUID #/components/parameters/noteUUID 
 * no response value expected for this operation
 **/
export async function updateNoteContentById(noteUUID: string) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
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
