import { SvelteGoogleAuthHook } from 'svelte-google-auth/server';
import type { Handle } from '@sveltejs/kit';
import { auth_provider_x509_cert_url, auth_uri, client_id, client_secret, project_id, redirect_uris, token_uri } from '$env/static/private';

const auth = new SvelteGoogleAuthHook({
	client_id: client_id,
	client_secret: client_secret,
	project_id: project_id,
	auth_uri: auth_uri,
  token_uri: token_uri,
	auth_provider_x509_cert_url: auth_provider_x509_cert_url,
	redirect_uris: redirect_uris
});

export const handle: Handle = async ({ event, resolve }) => {
	return await auth.handleAuth({ event, resolve });
};