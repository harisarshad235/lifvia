import * as authApi from '../functions/api/auth.js';
import * as stateApi from '../functions/api/state.js';
import * as dbStatsApi from '../functions/api/db-stats.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const context = { request, env, waitUntil: ctx.waitUntil.bind(ctx) };

    if (url.pathname === '/api/auth') {
      if (request.method === 'OPTIONS' && authApi.onRequestOptions) return authApi.onRequestOptions(context);
      if (request.method === 'GET' && authApi.onRequestGet) return authApi.onRequestGet(context);
      if (request.method === 'POST' && authApi.onRequestPost) return authApi.onRequestPost(context);
      return new Response('Method Not Allowed', { status: 405 });
    }

    if (url.pathname === '/api/state') {
      if (request.method === 'OPTIONS' && stateApi.onRequestOptions) return stateApi.onRequestOptions(context);
      if (request.method === 'GET' && stateApi.onRequestGet) return stateApi.onRequestGet(context);
      if (request.method === 'POST' && stateApi.onRequestPost) return stateApi.onRequestPost(context);
      return new Response('Method Not Allowed', { status: 405 });
    }

    if (url.pathname === '/api/db-stats') {
      if (request.method === 'GET' && dbStatsApi.onRequestGet) return dbStatsApi.onRequestGet(context);
      return new Response('Method Not Allowed', { status: 405 });
    }

    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response('Not Found', { status: 404 });
  }
};
