import { pgTable, vector, index } from 'drizzle-orm/pg-core'
import { PostTable } from './post'
import { ulid, primaryId, createTime } from '../custom'

export const PostEmbeddingTable = pgTable(
  'post_embedding',
  {
    id: primaryId(),
    createTime: createTime(),
    embedding: vector({ dimensions: 1536 }),
    postId: ulid()
      .notNull()
      .references(() => PostTable.id, { onDelete: 'cascade' })
  },
  table => [index('embeddingIndex').using('hnsw', table.embedding.op('vector_cosine_ops'))]
)
