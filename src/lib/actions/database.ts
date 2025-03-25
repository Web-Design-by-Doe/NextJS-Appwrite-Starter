'use server';

import { ID, Models } from 'node-appwrite';

import { database } from '@/lib/services/databaseService';

const createDocument = async <T extends Partial<Models.Document>>(
  collectionName: string,
  data: T,
  id = ID.unique(),
  admin?: boolean,
): Promise<Models.Document> => {
  return database.createDocument(collectionName, id, data, admin);
};

const listDocuments = async (
  collectionName: string,
  queries: [] = [],
  admin?: boolean,
): Promise<Models.DocumentList<Models.Document>> => {
  return database.listDocuments(collectionName, queries, admin);
};

const getDocument = async (
  collectionName: string,
  id: string,
  query: [] = [],
  admin?: boolean,
): Promise<Models.Document> => {
  return database.getDocument(collectionName, id, query, admin);
};

const updateDocument = async <T extends Partial<Models.Document>>(
  collectionName: string,
  id: string,
  data: T,
  admin?: boolean,
): Promise<Models.Document> => {
  return database.updateDocument(collectionName, id, data, admin);
};

async function deleteDocument(
  collectionName: string,
  id: string,
  admin?: boolean,
) {
  return database.deleteDocument(collectionName, id, admin);
}

export {
  createDocument,
  listDocuments,
  getDocument,
  updateDocument,
  deleteDocument,
};
