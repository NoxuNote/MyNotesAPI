'use strict';

/**
 *
 * email String Your email
 * no response value expected for this operation
 **/
exports.createAccount = function(email: string) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Creates a new empty note
 *
 * no response value expected for this operation
 **/
exports.createNewNote = function() {
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
exports.deleteNoteById = function(noteUUID: string) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get all your notes metadata
 *
 * returns List
 **/
exports.getAllNoteMetadata = function() {
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
 * Get all notes other users shared with you
 *
 * returns List
 **/
exports.getAllSharedNoteMetadata = function() {
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
exports.getNoteContentById = function(noteUUID: string) {
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
exports.getNoteMetadataById = function(noteUUID: string) {
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
 * Get an already existing and shared with you note content
 *
 * noteUUID #/components/parameters/noteUUID 
 * no response value expected for this operation
 **/
exports.getSharedNoteContentById = function(noteUUID: string) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get an already existing and shared with you note metadata
 *
 * noteUUID #/components/parameters/noteUUID 
 * returns NoteMetadata
 **/
exports.getSharedNoteMetadataById = function(noteUUID: string) {
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
 * Update an already existing note content
 *
 * noteUUID #/components/parameters/noteUUID 
 * no response value expected for this operation
 **/
exports.updateNoteContentById = function(noteUUID: string) {
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
exports.updateNoteMetadataById = function(body: any, noteUUID: string) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Update an already existing and shared with you note content
 *
 * noteUUID #/components/parameters/noteUUID 
 * no response value expected for this operation
 **/
exports.updateSharedNoteContentById = function(noteUUID: string) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

