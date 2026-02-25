import { z } from 'zod';
import { 
  insertProfileSchema, 
  insertSessionSchema, 
  insertResourceSchema, 
  insertJobSchema, 
  insertForumPostSchema, 
  insertForumReplySchema, 
  insertGoalSchema,
  insertAssessmentSchema
} from './schema.js';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
  unauthorized: z.object({
    message: z.string(),
  })
};

export const api = {
  profiles: {
    get: {
      method: 'GET',
      path: '/api/profiles/me',
      responses: {
        200: z.any(),
        404: errorSchemas.notFound,
        401: errorSchemas.unauthorized,
      },
    },
    getByUserId: {
      method: 'GET',
      path: '/api/profiles/user/:userId',
      responses: {
        200: z.any(),
        404: errorSchemas.notFound,
        500: errorSchemas.internal,
      },
    },
    counselors: {
      method: 'GET',
      path: '/api/counselors',
      responses: {
        200: z.array(z.any()),
      },
    },
    upsert: {
      method: 'POST',
      path: '/api/profiles',
      input: insertProfileSchema.omit({ userId: true }),
      responses: {
        200: z.any(),
        201: z.any(),
        400: errorSchemas.validation,
        401: errorSchemas.unauthorized,
      },
    },
  },
  sessions: {
    list: {
      method: 'GET',
      path: '/api/sessions',
      responses: {
        200: z.array(z.any()),
        401: errorSchemas.unauthorized,
      },
    },
    create: {
      method: 'POST',
      path: '/api/sessions',
      input: insertSessionSchema.omit({ userId: true, status: true }),
      responses: {
        201: z.any(),
        400: errorSchemas.validation,
        401: errorSchemas.unauthorized,
      },
    },
    updateStatus: {
      method: 'PATCH',
      path: '/api/sessions/:id/status',
      input: z.object({ status: z.string() }),
      responses: {
        200: z.any(),
        400: errorSchemas.validation,
        404: errorSchemas.notFound,
        401: errorSchemas.unauthorized,
      },
    }
  },
  resources: {
    list: {
      method: 'GET',
      path: '/api/resources',
      input: z.object({ type: z.string().optional() }).optional(),
      responses: {
        200: z.array(z.any()),
      },
    },
    create: {
      method: 'POST',
      path: '/api/resources',
      input: insertResourceSchema.omit({ authorId: true }),
      responses: {
        201: z.any(),
        400: errorSchemas.validation,
        401: errorSchemas.unauthorized,
      },
    }
  },
  jobs: {
    list: {
      method: 'GET',
      path: '/api/jobs',
      input: z.object({ search: z.string().optional() }).optional(),
      responses: {
        200: z.array(z.any()),
      },
    },
    create: {
      method: 'POST',
      path: '/api/jobs',
      input: insertJobSchema.omit({ postedBy: true }),
      responses: {
        201: z.any(),
        400: errorSchemas.validation,
        401: errorSchemas.unauthorized,
      },
    }
  },
  forum: {
    listPosts: {
      method: 'GET',
      path: '/api/forum/posts',
      input: z.object({ category: z.string().optional() }).optional(),
      responses: {
        200: z.array(z.any()),
      },
    },
    getPost: {
      method: 'GET',
      path: '/api/forum/posts/:id',
      responses: {
        200: z.any(),
        404: errorSchemas.notFound,
      },
    },
    createPost: {
      method: 'POST',
      path: '/api/forum/posts',
      input: insertForumPostSchema.omit({ authorId: true }),
      responses: {
        201: z.any(),
        400: errorSchemas.validation,
        401: errorSchemas.unauthorized,
      },
    },
    createReply: {
      method: 'POST',
      path: '/api/forum/posts/:id/replies',
      input: z.object({ content: z.string() }),
      responses: {
        201: z.any(),
        400: errorSchemas.validation,
        401: errorSchemas.unauthorized,
        404: errorSchemas.notFound,
      },
    }
  },
  goals: {
    list: {
      method: 'GET',
      path: '/api/goals',
      responses: {
        200: z.array(z.any()),
        401: errorSchemas.unauthorized,
      },
    },
    create: {
      method: 'POST',
      path: '/api/goals',
      input: insertGoalSchema.omit({ userId: true }),
      responses: {
        201: z.any(),
        400: errorSchemas.validation,
        401: errorSchemas.unauthorized,
      },
    },
    update: {
      method: 'PATCH',
      path: '/api/goals/:id',
      input: z.object({ status: z.string() }),
      responses: {
        200: z.any(),
        400: errorSchemas.validation,
        404: errorSchemas.notFound,
        401: errorSchemas.unauthorized,
      },
    }
  },
  ai: {
    careerRecommendations: {
      method: 'GET',
      path: '/api/ai/recommendations',
      responses: {
        200: z.object({ recommendations: z.string() }),
        401: errorSchemas.unauthorized,
        500: errorSchemas.internal,
      },
    }
  }
};

export function buildUrl(path, params) {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
