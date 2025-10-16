import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface DocumentFile {
  id: string;
  name: string;
  type: string;
  size: number;
  department: string;
  uploadedAt: string;
  data: Blob;
}

interface MyDB extends DBSchema {
  files: {
    key: string;
    value: DocumentFile;
    indexes: { 'by-department': string };
  };
  auth: {
    key: string;
    value: {
      ashaId: string;
      role: 'administration' | 'user';
      keepSignedIn: boolean;
      timestamp: string;
    };
  };
}

let dbInstance: IDBPDatabase<MyDB> | null = null;

export async function getDB() {
  if (dbInstance) return dbInstance;

  dbInstance = await openDB<MyDB>('document-portal-db', 1, {
    upgrade(db) {
      // Create files store
      const fileStore = db.createObjectStore('files', { keyPath: 'id' });
      fileStore.createIndex('by-department', 'department');

      // Create auth store
      db.createObjectStore('auth', { keyPath: 'ashaId' });
    },
  });

  return dbInstance;
}

// File operations
export async function addFile(file: File, department: string) {
  const db = await getDB();
  const id = `${Date.now()}-${file.name}`;
  
  await db.add('files', {
    id,
    name: file.name,
    type: file.type,
    size: file.size,
    department,
    uploadedAt: new Date().toISOString(),
    data: file,
  });

  return id;
}

export async function getFilesByDepartment(department: string) {
  const db = await getDB();
  return db.getAllFromIndex('files', 'by-department', department);
}

export async function getAllFiles() {
  const db = await getDB();
  return db.getAll('files');
}

export async function deleteFile(id: string) {
  const db = await getDB();
  await db.delete('files', id);
}

export async function getFile(id: string) {
  const db = await getDB();
  return db.get('files', id);
}

// Auth operations
export async function saveAuth(ashaId: string, role: 'administration' | 'user', keepSignedIn: boolean) {
  const db = await getDB();
  await db.put('auth', {
    ashaId,
    role,
    keepSignedIn,
    timestamp: new Date().toISOString(),
  });
}

export async function getAuth() {
  const db = await getDB();
  const allAuth = await db.getAll('auth');
  return allAuth[0] || null;
}

export async function clearAuth() {
  const db = await getDB();
  await db.clear('auth');
}
