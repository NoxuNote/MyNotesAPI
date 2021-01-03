/**
 * Get all notes other users shared with you
 *
 * returns List
 **/
export async function getAllSharedNoteMetadata() {
    return new Promise(function (resolve, reject) {
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
export async function getSharedNoteContentById(noteUUID: string) {
    return new Promise(function (resolve, reject) {
        resolve();
    });
}


/**
 * Get an already existing and shared with you note metadata
 *
 * noteUUID #/components/parameters/noteUUID 
 * returns NoteMetadata
 **/
export async function getSharedNoteMetadataById(noteUUID: string) {
    return new Promise(function (resolve, reject) {
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
 * Update an already existing and shared with you note content
 *
 * noteUUID #/components/parameters/noteUUID 
 * no response value expected for this operation
 **/
export async function updateSharedNoteContentById(noteUUID: string) {
    return new Promise(function (resolve, reject) {
        resolve();
    });
}