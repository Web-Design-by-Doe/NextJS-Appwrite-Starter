import { Models } from 'node-appwrite';

import { createAdminClient, createSessionClient } from '@/lib';

const collections = [
  {
    databaseId: '67e0364d002f9f78b186',
    collectionId: '67e0365700241c03885f',
    name: 'test',
  },
];

class DatabaseService {
  private async getClient(admin: boolean) {
    const { databases } = admin
      ? await createAdminClient()
      : await createSessionClient();
    return databases;
  }

  private getCollection(name: string) {
    const collection = collections.find(col => col.name === name);

    if (!collection) {
      throw new Error('Collection not found');
    }

    return collection;
  }

  async createDocument<T extends Partial<Models.Document>>(
    collectionName: string,
    id: string,
    data: T,
    admin = false,
  ): Promise<Models.Document> {
    const databases = await this.getClient(admin);
    const { collectionId, databaseId } = this.getCollection(collectionName);
    return databases.createDocument(databaseId, collectionId, id, data);
  }

  async listDocuments(
    collectionName: string,
    queries: [] = [],
    admin = false,
  ): Promise<Models.DocumentList<Models.Document>> {
    const databases = await this.getClient(admin);
    const { collectionId, databaseId } = this.getCollection(collectionName);

    return databases.listDocuments(databaseId, collectionId, queries);
  }

  async getDocument(
    collectionName: string,
    id: string,
    query: [] = [],
    admin = false,
  ): Promise<Models.Document> {
    const databases = await this.getClient(admin);
    const { collectionId, databaseId } = this.getCollection(collectionName);
    return databases.getDocument(databaseId, collectionId, id, query);
  }

  async updateDocument<T extends Partial<Models.Document>>(
    collectionName: string,
    id: string,
    data: T,
    admin = false,
  ): Promise<Models.Document> {
    const databases = await this.getClient(admin);
    const { collectionId, databaseId } = this.getCollection(collectionName);
    return databases.updateDocument(databaseId, collectionId, id, data);
  }

  async deleteDocument(collectionName: string, id: string, admin = false) {
    const databases = await this.getClient(admin);
    const { collectionId, databaseId } = this.getCollection(collectionName);
    return databases.deleteDocument(databaseId, collectionId, id);
  }
}

export const database = new DatabaseService();
